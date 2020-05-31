/**
 * Returns capitalized string at 0 index
 * @param {string} string string to capitalize
 */
export const capitalize = string => {
    if (!string) return "";
    if (typeof string !== 'string') return "";

    return string.charAt(0).toUpperCase() + string.slice(1)
};

/**
 * Returns array of strings [parsed number split on '.']
 * 
 * @param {number} amount number to be parsed
 * @param {number} locale precision to parse decimal number
 */
export const parseAmount = (amount, locale = 2) => {
    if (amount === 0) return "0";
    if (!amount) return false;
    if (typeof amount !== 'number') return false;
    if (isNaN(+amount)) return false;

    let parsedString = amount.toLocaleString(undefined, {minimumFractionDigits: locale, maximumFractionDigits: locale});
    
    return parsedString.split('.');
}

/**
 * Returns difference between now and input time in minutes
 * @param {time} time time in the past
 */
export const getMinutesAgo = time => {
    if (!time) return 0;
    if (isNaN(+time)) return 0;

    return Math.floor((new Date() - time) / 1000 / 60)
}


export const parseTickerFromDataFrame = streamName => {
    const ticker = streamName.split("@")[0].toUpperCase();
    return ticker;
}