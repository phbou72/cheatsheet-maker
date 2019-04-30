import React from "react";
import classnames from "classnames";
import { Portal } from "react-portal";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
}

const Modal = (props: Props) => {
    const { isOpen, children } = props;

    const modalClasses = classnames("modal", {
        "is-active": isOpen,
    });

    return (
        <Portal>
            <div className={modalClasses}>
                <div className="modal-background" />
                <div className="modal-card">{children}</div>
            </div>
        </Portal>
    );
};

export default Modal;
