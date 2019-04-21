import React from "react";
import classnames from "classnames";
import { Portal } from "react-portal";

interface Props {
    children: React.ReactNode;
    className?: string;
    footer?: React.ReactNode;
    header?: React.ReactNode;
    isOpen: boolean;
}

const Modal = (props: Props) => {
    const { isOpen, className, header, footer, children } = props;

    const modalClasses = classnames("modal", {
        "is-active": isOpen,
    });
    const bodyClasses = classnames("modal-card-body", className);

    const isCard = header || footer;

    return (
        <Portal>
            <div className={modalClasses}>
                <div className="modal-background" />
                {isCard && (
                    <div className="modal-card">
                        {header && <header className="modal-card-head">{header}</header>}
                        <div className={bodyClasses}>{children}</div>
                        {footer && <footer className="modal-card-foot">{footer}</footer>}
                    </div>
                )}
            </div>
        </Portal>
    );
};

export default Modal;
