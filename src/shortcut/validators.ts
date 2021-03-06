export const isFilled = (description: string, keyStrokesString: string, _shortcuts: Shortcut[]) =>
    description.length > 0 && keyStrokesString.length > 0;

const validKeyStrokeRegex = /[\w\W]+(\+?[\w\W]*\+?)+/;
export const isValidKeyStroke = (_description: string, keyStrokesString: string, _shortcuts: Shortcut[]) =>
    validKeyStrokeRegex.test(keyStrokesString);
