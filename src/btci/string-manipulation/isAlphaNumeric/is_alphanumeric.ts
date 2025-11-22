
function isNumber(char: string): boolean {
    return char.charCodeAt(0) >= "0".charCodeAt(0) && char.charCodeAt(0) <= "9".charCodeAt(0);
}


function isLowerCase(char: string): boolean {
    return char.charCodeAt(0) >= "a".charCodeAt(0) && char.charCodeAt(0) <= "z".charCodeAt(0);
}


function isUpperCase(char: string): boolean {
    return char.charCodeAt(0) >= "A".charCodeAt(0) && char.charCodeAt(0) <= "Z".charCodeAt(0);
}

export function isAlphaNumeric(char: string): boolean {
    return isUpperCase(char) || isLowerCase(char) || isNumber(char);    
}

export function isAlphaNumericV2(char: string): boolean {
    return /^[0-9a-zA-Z]$/.test(char);
}