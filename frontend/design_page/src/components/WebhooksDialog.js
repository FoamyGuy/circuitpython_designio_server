import React from 'react';
import {InputGroup, Button, Classes, Dialog, Intent} from "@blueprintjs/core";
import $ from "jquery";

class WebhooksDialog extends React.Component {
    constructor(props) {
        super(props);

        console.log("props in constructor");
        console.dir(this.props);

        this.state = {
            isOpen: this.props.isOpen,
            autoFocus: true,
            canEscapeKeyClose: true,
            canOutsideClickClose: true,
            enforceFocus: true,
            usePortal: true,
            imageWebhook: this.props.preview_webhook_url,
            signatureWebhook: this.props.signature_webhook_url
        }
        console.log("signature webhook in constructor:");
        console.log(this.state.signature_webhook_url)

        this.handleChangeSignatureWebhook = this.handleChangeSignatureWebhook.bind(this);
        this.handleChangeImageWebhook = this.handleChangeImageWebhook.bind(this);

    }


    static getDerivedStateFromProps = (props, state) => {
         return {
                isOpen: props.isOpen,
            }
    }

    handleChangeSignatureWebhook(event) {
        this.setState({
                signatureWebhook: event.target.value
            }
        )
    };

    handleChangeImageWebhook(event) {
        console.log("setting image webhook");
        console.log(event.target.value);
        this.setState({
                imageWebhook: event.target.value
            }
        )
    };

    handleOpen = () => this.setState({isOpen: true});

    handleClose = () => {
        this.setState({
            isOpen: false,
        });
        this.props.handleClose();
    }

    componentDidMount() {

    }

    render() {
        console.log("url : " + this.state.imageWebhook);

        return (
            <Dialog
                className={""}
                icon="cloud-upload"
                onClose={this.handleClose}
                title="Adafruit.io Webhook URLs"
                {...this.state}
            >
                <div className={Classes.DIALOG_BODY}>
                    <p>
                        Image Preview Feed
                    </p>
                    <InputGroup
                        id={"preview_webhook_input"}
                        value={this.state.imageWebhook}
                        onChange={this.handleChangeImageWebhook}
                    />
                    <br/>
                    <p>
                        Image Signature Feed
                    </p>
                    <InputGroup
                        id={"signature_webhook_input"}
                        value={this.state.signatureWebhook}
                        onChange={this.handleChangeSignatureWebhook}
                    />
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>

                        <Button onClick={this.handleClose}>Close</Button>

                        <Button
                            intent={Intent.SUCCESS}
                            onClick={() => {
                                this.handleClose();
                                this.props.saveWebhooksClick();

                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default WebhooksDialog;