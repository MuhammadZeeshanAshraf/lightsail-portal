export const Messages = {
    isNecessary: (filename, preffix) => {
        return `${filename} is necessary for ${preffix}.`;
    },
    inCorrectExtension: (filename, extension) => {
        return `${filename} file extension is not correct. It must have ${extension} as its extension.`;
    },
    inNotSupport: (value, supportedValues) => {
        return `The provided value '${value}' is not correct. The supported value are ${supportedValues.join(', ')}.`;
    }
};
