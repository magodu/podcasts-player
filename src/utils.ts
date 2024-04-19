/**
 * Add a zero to number if is less than 10
 */
export const formatNumber = (num: number) => {
    return num < 10 ? "0" + num : num;
};

/**
 * Converts milliseconds to time format hh:mm:ss
 */
export const msToTime = (duration: number) => {
    let seconds: number = Math.floor((duration / 1000) % 60),
        minutes: number = Math.floor((duration / (1000 * 60)) % 60),
        hours: number  = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
};

/**
 * Converts date to format dd:MM:yy
 */
export const dateParser = (dateString: string) => {
    let milliseconds = Date.parse(dateString);
    let date = new Date(milliseconds);

    return formatNumber(date.getDate()) + '/' + formatNumber(date.getMonth() + 1) + '/' + formatNumber(date.getFullYear());
};

/**
 * Checks if date is older than 1 day
 */
export const isOutdated = (timestamp: number) => {
    const oneDay = 60 * 60 * 24 * 1000;
    const now = Date.now();
    return now - timestamp > oneDay;
};
