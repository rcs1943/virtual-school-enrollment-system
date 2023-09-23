const getDayDate = (date) => getDigitDateWith2Digits(date.getDate());
const getMonthDate = (date) => getDigitDateWith2Digits(date.getMonth() + 1);
const getDigitDateWith2Digits = (value) => {
    const valueWithZero = `0${value}`;
    return valueWithZero.substring(valueWithZero.length - 2);
}
export const getDate = (valueDate, reverse = false) => {
    const date = new Date(valueDate);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return !reverse 
        ? `${getDayDate(date)}-${getMonthDate(date)}-${date.getFullYear()}`
        : `${date.getFullYear()}-${getMonthDate(date)}-${getDayDate(date)}`;
}
export const getTimeMillis = (strDate) => {
    const date = new Date(strDate);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.getTime();
}