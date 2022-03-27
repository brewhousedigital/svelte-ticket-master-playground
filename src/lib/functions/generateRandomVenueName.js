import {chooseRandomFromArray} from "$lib/functions/chooseRandomFromArray.js";

export const taverns = [
    "The Dusty Rope Bar",
    "The Groovy Guitar Venue",
    "The Running Cherry",
    "The Lazy Barracuda",
    "The High Fowl",
    "The Rapid Loaf Pub",
    "The Defeated Maple",
    "The Gruesome Gentlewomen",
    "The Brave Crew",
    "The Smart Falcon Tavern",
    "The Fine Cushion",
    "The Black Zebra Event Center",
    "The Colossal Goat Venue",
    "The Excited Bats Tavern",
    "The Secret Belltower",
    "The Scattered Goose",
    "The Wandering Hog",
]

export const getRandomTavern = () => {
    return chooseRandomFromArray(taverns);
}