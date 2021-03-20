const colors = ["red", "blue", "green", "yellow", "purple", "black"];

export const getColors = (length: number): Array<string> => {
    if(length > colors.length) length = colors.length;
    return colors.slice(0, length);
}