
/**
 * Get's the dimensions of a 2d array.
 * @param {any[]}. Any array.
 * @returns {rows: number, columns: number}. The dimensions of the 2d array.
 */
export function get2dArrayDimensions(array: any[][]): { rows: number, columns: number } {
    return {
        rows: array.length,
        columns: array[0].length,
    };
}

/**
 * Returns a random element from an array
 * @param {T[]} arr. An array of type T.
 * @returns {T}. Value found in a random position.
 */
export function getRandomArrayElement<T>(arr: T[]): T {
    if (arr.length === 1) {
        return arr[0];
    } else {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}

/**
 * Returns a number between 0 and the number of elements in the array.
 * @param {any[]} arr. An array of any type.
 * @returns {number}. A randomly selected index from the array.
 */
export function getRandomArrayIndex(arr: any[]): number {
    return Math.floor(Math.random() * arr.length - 1);
}