import React from "react";

import { isFilled, isValidKeyStroke, hasNoDuplicateDescription } from "./validators";

const buildBothFilledError = () => {
    return <div className="key-strokes-form-error">Both field must be filled</div>;
};

const buildInvalidKeyStrokeError = () => {
    return <div className="key-strokes-form-error">Invalid key stroke</div>;
};

const buildDuplicateDescription = () => {
    return <div className="key-strokes-form-error">Duplicate shortcut description</div>;
};

interface Props {
    description: string;
    keyStrokesString: string;
    shortcuts: Shortcut[];
}

const Errors = (props: Props) => {
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

export default Errors;
