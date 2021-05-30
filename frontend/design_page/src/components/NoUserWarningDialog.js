import React from 'react';
import {InputGroup, Button, Classes, Dialog, Intent} from "@blueprintjs/core";
import $ from "jquery";

class NoUserWarningDialog extends React.Component {
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

        //
        return (
            <Dialog
                className={""}
                icon="warning-sign"
                onClose={this.handleClose}
                title="Guest User Warning"
                {...this.state}
            >
                <div className={Classes.DIALOG_BODY}>
                    <p>
                        You are currently working on this design as a guest user. Once the design is saved, anyone who gets the design URL will be
                        able to see and modify the design.
                    </p>
                    <p>
                        To further secure your designs you can create user account. Designs created by signed in users
                        will be inaccessible to anyone not signed in as the user who created it.
                    </p>
                    <p>
                        Users can create and save unlimited different designs and easily access them.
                    </p>
                    <p>
                        Would you like to <a href={"/accounts/login/"}>Login</a> or <a href={"/accounts/register/"}>Create an account</a>?
                    </p>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>

                        <Button onClick={this.handleClose}>Close</Button>

                    </div>
                </div>
            </Dialog>
        );
    }
}

export default NoUserWarningDialog;