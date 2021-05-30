import React from 'react';
import {observer} from 'mobx-react-lite';
import {
    Button,
    Navbar,
    Alignment,
    AnchorButton,
    Divider,
    Dialog,
    Classes,
    InputGroup,
} from '@blueprintjs/core';
import FaGithub from '@meronex/icons/fa/FaGithub';
import FaQuestion from '@meronex/icons/fa/FaQuestion';
import DownloadButton from 'polotno/toolbar/download-button';

import {downloadFile} from 'polotno/utils/download';

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        //const inputRef = React.useRef();
        this.store = props.store;

    }

    render() {
        return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <AnchorButton
                        icon="new-object"
                        minimal
                        href={"/create/design/"}
                    >
                        New
                    </AnchorButton>
                    <InputGroup
                        leftIcon={"tag"}
                        id={"name_input"}
                        placeholder={"Design Name"}

                    >

                    </InputGroup>


                    <Button
                        icon="floppy-disk"
                        minimal
                        onClick={() => {
                            //const json = store.toJSON();
                            this.props.clickSave();
                        }}
                    >
                        Save
                    </Button>
                    {/*<Button
                        icon="floppy-disk"
                        minimal
                        onClick={() => {
                            //const json = store.toJSON();
                            this.props.clickSaveAIO();
                        }}
                    >
                        Adafruit.IO
                    </Button>*/}
                    <span
                        className={"feedback-tag bp3-tag bp3-intent-" + this.props.feedbackIntent + (this.props.feedbackHidden ? " hidden" : "")}>{this.props.feedback}</span>


                </Navbar.Group>

                <Navbar.Group align={Alignment.RIGHT}>
                    <span
                        className={"feedback-tag bp3-tag bp3-intent-" + this.props.webhookFeedbackIntent + (this.props.webhookFeedbackHidden ? " hidden" : "")}>{this.props.webhookFeedback}</span>

                    {/*<AnchorButton
                        icon="code"
                        minimal
                        href={"/codepy/design/u/" + this.props.uuid + "/"}
                        className={this.props.codepyHidden ? "hidden": ""}
                    >
                        Download code.py
                    </AnchorButton>*/}

                    {this.props.showAIOButton &&
                    <Button
                        minimal
                        icon={"cloud-upload"}
                        onClick={this.props.showWebhookDialogClick}
                    >
                        Setup Adafruit.io Webhooks
                    </Button>}

                    {this.props.showMyDesigns &&
                    <AnchorButton
                        minimal
                        href="/list/designs/"
                        icon={"layout-grid"}
                    >
                        My Designs
                    </AnchorButton>
                    }

                    <AnchorButton
                        icon="download"
                        minimal
                        href={"/media/content/" + this.props.image_file + "?t=" + new Date().getTime()}
                    >
                        Download BMP
                    </AnchorButton>


                    <AnchorButton
                        minimal
                        href="/docs/"
                        target="_blank"
                        icon={<FaQuestion className="bp3-icon" style={{fontSize: '20px'}}/>}
                    >
                        Help
                    </AnchorButton>

                    <Divider/>
                </Navbar.Group>
            </Navbar>
        );
    }
}

export default TopBar;