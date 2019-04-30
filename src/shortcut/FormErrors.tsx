import React from "react";

import { isFilled, isValidKeyStroke } from "shortcut/validators";

const buildBothFilledError = () => <div className="shortcut-error">Both field must be filled</div>;
const buildInvalidKeyStrokeError = () => <div className="shortcut-error">Invalid key stroke</div>;

interface Props {
    description: string;
    keyStrokesString: string;
    shortcuts: Shortcut[];
}

const FormErrors = (props: Props) => {
    const { description, keyStrokesString, shortcuts } = props;

    if (!isFilled(description, keyStrokesString, shortcuts)) {
        return buildBothFilledError();
    }

    if (!isValidKeyStroke(description, keyStrokesString, shortcuts)) {
        return buildInvalidKeyStrokeError();
    }

    return null;
};

export default FormErrors;
