import './App.css';
import Toolbar from 'polotno/toolbar/toolbar';
import ZoomButtons from 'polotno/toolbar/zoom-buttons';
import Workspace from 'polotno/canvas/workspace';
import {createStore} from 'polotno/model/store';
import {polotno_key} from './Polotno_Key'
import Topbar from './components/TopBar';

import PhotosPanel from "./components/ImagePanel"
import WebhooksDialog from "./components/WebhooksDialog";
import NoUserWarningDialog from "./components/NoUserWarningDialog";
import {PhotosSection} from 'polotno/side-panel/side-panel';
import $ from 'jquery';
import {SidePanel, DEFAULT_SECTIONS} from 'polotno/side-panel/side-panel';
import {SectionTab} from "polotno/side-panel/tab-button";
import React from "react";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";
import {Icon, Position, Toaster, Intent} from '@blueprintjs/core';
import _ from "lodash";


class App extends React.Component {
    refHandlers = {
        toaster: (ref) => this.toaster = ref,
    };

    constructor(props) {
        super(props);
        console.log('starting the app...');

        this.store = createStore({
            key: polotno_key, // you can create it here: https://polotno.dev/cabinet/
        });
        this.store.setSize(240, 240);

        this.state = {
            feedback: "Design Saved",
            feedbackIntent: "success",
            feedbackHidden: true,
            webhookFeedback: "Design Saved",
            webhookFeedbackIntent: "success",
            webhookFeedbackHidden: true,
            webhookDialogOpen: false,
            savedDesignJson: {},
            noUserWarningDialogOpen: false
        }
        this.creating = true;

        //console.log("loading input data in constructor")
        this.input_data = $("#root").data("props");
        //console.dir(this.input_data);

    }

    componentDidMount() {

        //console.log(input_data.data.hello);
        //console.dir(JSON.parse(input_data.data));
        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        //console.log("ajax setup");
        $.ajaxSetup({
            beforeSend: (xhr, settings) => {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    // Only send the token to relative URLs i.e. locally.
                    //console.log("ajax setup");
                    xhr.setRequestHeader("X-CSRFToken", this.getCookie('csrftoken'));
                }
            }
        });


        //console.log(this.input_data);
        if (this.input_data !== undefined &&
            this.input_data.data.hasOwnProperty("design_json")) {
            this.creating = false;

            //console.log(input_data.data.design_json);

            console.log(this.store.activePage);

            // load page from context
            this.store.loadJSON(JSON.parse(this.input_data.data.design_json));
            console.dir(this.store.pages);
            console.log(this.store.activePage.id);
            $("#name_input").val(this.input_data.data.name);
            this.setState({savedDesignJson: this.store.toJSON()});


        } else {
            this.creating = true;
            // empty page if nothing to load
            this.store.addPage();
            this.setState({savedDesignJson: this.store.toJSON()});
        }


        console.log(`username: ${this.input_data.data.username}`);


        if (this.input_data !== undefined &&
            this.input_data.data.hasOwnProperty("username") &&
            this.input_data.data.username === ""
        ) {
            console.log("user was blank")
            this.setState({noUserWarningDialogOpen: true});
        }


        //this.store.setScale(3);
        //console.log('zoom is', this.store.scale);


        setTimeout(() => {
            this.store.setScale(1.5);
        }, 300);


        setTimeout(function () {
            $(".credit span a").attr("target", "_blank");
        }, 2000);

        this.sections = DEFAULT_SECTIONS;
        console.log("sections: ");
        console.log(DEFAULT_SECTIONS);

        // define the new custom section

        const CustomPhotos = {
            name: 'adafruit',
            Tab: (props) => (
                <SectionTab name="Adafruit" {...props}>
                    <MdPhotoLibrary/>
                </SectionTab>
            ),
            Panel: PhotosPanel,
        };
        this.sections.splice(1, 0, CustomPhotos);

        PhotosSection.Tab = (props) => (
            <SectionTab name="Unsplash" {...props}>
                <Icon icon="media"/>
            </SectionTab>
        );

        $(window).on("beforeunload", () => {
            console.log("state in beforeunload");
            console.dir(this.state.savedDesignJson);
            console.log("----")
            console.dir(this.store.toJSON());
            console.log("json has changed ? " + !_.isEqual(this.state.savedDesignJson, this.store.toJSON()));
            console.log("history");
            console.log(this.store.history.canUndo);
            if (!_.isEqual(this.state.savedDesignJson, this.store.toJSON())) {
                return "Are you sure to leave? There is unsaved worked.";
            }
        });


        //removeSection(sections, "size");
        //addSection(sections, ResizePanel, 5);

        this.forceUpdate();
    }

    render = () => {
        console.log("input data inside render");
        console.log(this.input_data)
        const username = this.input_data ? this.input_data.data.username : "";
        // only show if username is not blank
        const showMyDesigns = username !== "";
        return (
            <React.Fragment>
                <Toaster
                    position={Position.TOP}
                    ref={this.refHandlers.toaster}
                    intent={Intent.DANGER}
                />
                <WebhooksDialog
                    isOpen={this.state.webhookDialogOpen}
                    saveWebhooksClick={this.saveWebhooksClick}
                    handleClose={this.handleWebhooksDialogClose}
                    preview_webhook_url={this.input_data ? this.input_data.data.preview_webhook_url : ""}
                    signature_webhook_url={this.input_data ? this.input_data.data.signature_webhook_url : ""}
                />
                <NoUserWarningDialog
                    isOpen={this.state.noUserWarningDialogOpen}
                    handleClose={this.handleNoUserWarningDialogClose}
                />
                <Topbar store={this.store}
                        clickSave={this.clickSave}
                        clickSaveAIO={this.clickSaveAIO}
                        feedbackHidden={this.state.feedbackHidden}
                        feedbackIntent={this.state.feedbackIntent}
                        feedback={this.state.feedback}
                        webhookFeedbackHidden={this.state.webhookFeedbackHidden}
                        webhookFeedbackIntent={this.state.webhookFeedbackIntent}
                        webhookFeedback={this.state.webhookFeedback}
                        codepyHidden={this.creating}
                        showMyDesigns={showMyDesigns}
                        showWebhookDialogClick={this.showWebhookDialog}
                        uuid={!this.creating ? this.input_data.data.uuid : ""}
                        image_file={this.input_data ? this.input_data.data.image_file : ""}
                        showAIOButton={!this.creating}
                />
                <div
                    style={{
                        display: 'flex',
                        height: '92vh',
                        width: '100vw',
                    }}
                >
                    <div style={{width: '400px', height: '100%', display: 'flex'}}>
                        <SidePanel store={this.store} sections={this.sections} defaultSection="adafruit"/>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            height: '100%',
                            margin: 'auto',
                            flex: 1,
                            flexDirection: 'column',
                            position: 'relative',
                        }}
                    >
                        <Toolbar store={this.store} downloadButtonEnabled={false}/>
                        <Workspace store={this.store} pageControlsEnabled={false}/>
                        <ZoomButtons store={this.store}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    saveWebhooksClick = () => {
        console.log("click save webhooks");
        console.log($("#preview_webhook_input").val());
        console.log($("#signature_webhook_input").val());
        $.ajax({
            method: "POST",
            url: "/update/design/u/" + this.input_data.data.uuid + "/webhooks/",
            data: {
                "preview_webhook": $("#preview_webhook_input").val(),
                "signature_webhook": $("#signature_webhook_input").val()
            }
        }).done((resp) => {
            this.input_data.data["preview_webhook_url"] = $("#preview_webhook_input").val();
            this.input_data.data["signature_webhook_url"] = $("#signature_webhook_input").val();
            console.log(resp);
            this.setState({
                webhookFeedbackHidden: false,
                webhookFeedbackIntent: "success",
                webhookFeedback: "Webhooks saved successfully"
            });
            setTimeout(() => {
                this.setState({webhookFeedbackHidden: true});
            }, 3000);

        }).error((error) => {
            this.setState({
                webhookFeedbackHidden: false,
                webhookFeedbackIntent: "danger",
                webhookFeedback: error.responseJSON.error
            });

        });
    }

    handleWebhooksDialogClose = () => {
        this.setState({
            webhookDialogOpen: false
        })
    }

    handleNoUserWarningDialogClose = () => {
        this.setState({
            noUserWarningDialogOpen: false
        })
    }

    showWebhookDialog = () => {
        console.log("showing webhook dialog");
        this.setState({webhookDialogOpen: true}, () => {
            console.log(this.state.webhookDialogOpen);
        });

    }

    clickSave = () => {
        //console.log(props.hello);
        //console.dir(store);
        console.log("clicked save");
        //console.log(store.toJSON());
        //console.log(store.toDataURL());

        if ($("#name_input").val() !== "") {
            // create new design
            if (this.input_data === undefined || !this.input_data.data.hasOwnProperty("id")) {
                //this.topBar.current.setState({"hidden": false, "feedback": "Hello World", "feedbackIntent": "danger"});
                //this.setState({hidden: false})
                $.ajax({
                    method: "POST",
                    url: "/create_design/",
                    data: {
                        "image_base64": this.store.toDataURL(),
                        "json": JSON.stringify(this.store.toJSON()),
                        "name": $("#name_input").val()
                    }
                }).done((resp) => {

                    this.setState({
                        feedbackHidden: false,
                        feedbackIntent: "success",
                        feedback: "Design created successfully",
                        savedDesignJson: this.store.toJSON()
                    });
                    setTimeout(() => {
                        this.setState({feedbackHidden: true});
                        window.location = resp['view_design_url']
                    }, 3000);
                    console.log(resp);
                }).fail((error) => {
                    this.setState({
                        feedbackHidden: false,
                        feedbackIntent: "danger",
                        feedback: error.responseJSON.error
                    });
                });
            } else {
                // update existing design
                $.ajax({
                    method: "POST",
                    url: "/update/design/u/" + this.input_data.data.uuid + "/",
                    data: {
                        "image_base64": this.store.toDataURL(),
                        "json": JSON.stringify(this.store.toJSON()),
                        "name": $("#name_input").val()
                    }
                }).done((resp) => {
                    this.setState({
                        feedbackHidden: false,
                        feedbackIntent: "success",
                        feedback: "Design saved successfully",
                        savedDesignJson: this.store.toJSON()
                    });
                    console.log(resp);
                    setTimeout(() => {
                        this.setState({feedbackHidden: true});
                    }, 3000);
                });
            }
        } else {
            this.setState({
                feedbackHidden: false,
                feedbackIntent: "danger",
                feedback: "Design Name cannot be blank"
            });
            setTimeout(() => {
                this.setState({feedbackHidden: true});
            }, 3000);

        }

    }

    clickSaveAIO = () => {
        //console.log(props.hello);
        //console.dir(store);
        console.log("clicked save");
        //console.log(store.toJSON());
        //console.log(store.toDataURL());

        // create new design
        if (this.input_data === undefined || !this.input_data.data.hasOwnProperty("id")) {

        } else {
            console.log(this.store.toDataURL());
            // update existing design
            $.ajax({
                method: "POST",
                url: "/upload_aio/design/" + this.input_data.data.id + "/",
                data: {
                    "image_base64": this.store.toDataURL(),
                    "json": JSON.stringify(this.store.toJSON()),
                    "name": $("#name_input").val()
                }
            }).done((resp) => {
                this.setState({
                    feedbackHidden: false,
                    feedbackIntent: "success",
                    feedback: "Design saved successfully"
                });
                console.log(resp);
                setTimeout(() => {
                    this.setState({feedbackHidden: true});
                }, 3000);
            });
        }
    }
}

export default App;


