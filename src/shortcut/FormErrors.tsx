import React from "react";

import { isFilled, isValidKeyStroke, hasNoDuplicateDescription } from "./validators";

const buildBothFilledError = () => <div className="key-stroke-error">Both field must be filled</div>;
const buildInvalidKeyStrokeError = () => <div className="key-stroke-error">Invalid key stroke</div>;
const buildDuplicateDescription = () => <div className="key-stroke-error">Duplicate shortcut description</div>;

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

    if (!hasNoDuplicateDescription(description, keyStrokesString, shortcuts)) {
        return buildDuplicateDescription();
    }

    return null;
};

export default FormErrors;
