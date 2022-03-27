import {simulationTime, gameHistory, hasUserStartedTheGame} from "$lib/store.js";
import { get } from 'svelte/store';

export const completeSimulation = (success) => {
    // All the fun things to track
    const gameObject = {
        success: success,
        totalTime: get(simulationTime),
        date: new Date().getTime(),
    }

    // Save their history
    gameHistory.update(obj => [
        ...obj,
        gameObject,
    ])

    // Reset the game
    hasUserStartedTheGame.set(false);
}