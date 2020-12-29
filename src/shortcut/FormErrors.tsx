import { useTranslation } from "react-i18next";

// styling
import styled from "styled-components";

import { isFilled, isValidKeyStroke } from "shortcut/validators";

const Error = styled.div`
    margin-top: 16px;
    color: #e16f6f;
`;

interface Props {
    description: string;
    keyStrokesString: string;
    shortcuts: Shortcut[];
}

const FormErrors = (props: Props) => {
    const { description, keyStrokesString, shortcuts } = props;

    const { t } = useTranslation();

    if (!isFilled(description, keyStrokesString, shortcuts)) {
        return <Error>{t("shortcut.formErrors.bothFieldFilled")}</Error>;
    }

    if (!isValidKeyStroke(description, keyStrokesString, shortcuts)) {
        return <Error>{t("shortcut.formErrors.invalidKeyStroke")}</Error>;
    }

    return null;
};

export default FormErrors;
