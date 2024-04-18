/**
 * Add a zero to number if is less than 10
 */
export const formatNumber = (num: number) => {
    return num < 10 ? "0" + num : num;
};

/**
 * Convert milliseconds to time format hh:mm:ss
 */
export const msToTime = (duration: number) => {
    let milliseconds: number = Math.floor((duration % 1000) / 100),
        seconds: number = Math.floor((duration / 1000) % 60),
        minutes: number = Math.floor((duration / (1000 * 60)) % 60),
        hours: number  = Math.floor((duration / (1000 * 60 * 60)) % 24);

   /*  hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds; */

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
};

/**
 * Convert date to format dd:MM:yy
 */
export const dateParser = (dateString: string) => {
    let milliseconds = Date.parse(dateString);
    let date = new Date(milliseconds);

    return formatNumber(date.getDate()) + '/' + formatNumber(date.getMonth() + 1) + '/' + formatNumber(date.getFullYear());
};
