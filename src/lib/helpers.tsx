/**
 * Returns capitalized string at 0 index
 * @param {string} string string to capitalize
 */
export const capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
};

/**
 * Returns array of strings [parsed number split on '.']
 * 
 * @param {number} amount number to be parsed
 * @param {number} locale precision to parse decimal number
 */
export const parseAmount = (amount: number, locale: number = 2): string[] => {
    if (amount === 0) return ["0"];
    let parsedString = amount.toLocaleString(undefined, {minimumFractionDigits: locale, maximumFractionDigits: locale});
    
    return parsedString.split('.');
}

/**
 * Returns difference between now and input time in minutes
 * @param {time} time time in the past
 */
export const getMinutesAgo = (time: number): number => {
    return Math.floor((new Date().getTime() - time) / 1000 / 60)
}


export const parseTickerFromDataFrame = (streamName: string): string => {
    const ticker = streamName.split("@")[0].toUpperCase();
    return ticker;
}