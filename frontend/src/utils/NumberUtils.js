/**
 * Pads a number depending on the number of digits required
 * Returns a string with the number padded with zeros
 *
 * @param {Number} num - the desired number
 * @param {Number} places - number of digits
 * @returns {String} formated string with zero padding
 */
export function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}
