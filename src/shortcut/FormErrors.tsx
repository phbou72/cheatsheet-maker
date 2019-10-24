import React from "react";
import styled from "styled-components";

import { isFilled, isValidKeyStroke } from "shortcut/validators";

const Error = styled.div`
    margin-top: 16px;
    color: #e16f6f;
`;

const buildBothFilledError = () => <Error className="shortcut-error">Both field must be filled</Error>;
const buildInvalidKeyStrokeError = () => <Error className="shortcut-error">Invalid key stroke</Error>;

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
