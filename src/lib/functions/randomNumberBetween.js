// Generates a random number between 1 and the supplied maximum value
export const randomNumberBetween = (max) => {
    return Math.floor(Math.random() * max) + 1
}