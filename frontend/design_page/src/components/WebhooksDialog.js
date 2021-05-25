import React from 'react';
import {InputGroup, Button, Classes, Dialog, Intent} from "@blueprintjs/core";
import $ from "jquery";

class WebhooksDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
            autoFocus: true,
            canEscapeKeyClose: true,
            canOutsideClickClose: true,
            enforceFocus: true,
            usePortal: true,
        }


    }


    static getDerivedStateFromProps = (props, state) => {
        console.log("updating state from props");
        return {isOpen: props.isOpen};
    }

    handleOpen = () => this.setState({isOpen: true});

    handleClose = () => {
        this.setState({
            isOpen: false,
        });
        this.props.handleClose();
    }

    render() {
        console.log("url : " + this.props.preview_webhook_url);
        setTimeout(() => {
            $("#preview_webhook_input").val(this.props.preview_webhook_url);
            $("#signature_webhook_input").val(this.props.signature_webhook_url);
        }, 200);
        //
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
                    />
                    <br/>
                    <p>
                        Image Signature Feed
                    </p>
                    <InputGroup
                        id={"signature_webhook_input"}
                    />
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>

                        <Button onClick={this.handleClose}>Close</Button>

                        <Button
                            intent={Intent.SUCCESS}
                            onClick={() => {
                                this.props.saveWebhooksClick();
                                this.handleClose()
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