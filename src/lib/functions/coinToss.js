export const coinToss = (chance = 0.5) => {
    return Math.random() < chance;
}