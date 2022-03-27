import {simulationTime, hasUserStartedTheGame} from "$lib/store.js";
import { get } from 'svelte/store';

export const completeSimulation = (success) => {
    // All the fun things to track
    const gameObject = {
        success: success,
        totalTime: get(simulationTime),
        date: new Date().getTime(),
    }

    let currentHistory = localStorage.getItem("storage-gameHistory");

    if(currentHistory !== null) {
        currentHistory = JSON.parse(currentHistory);
        currentHistory = [...currentHistory, gameObject];

        localStorage.setItem("storage-gameHistory", JSON.stringify(currentHistory))
    }

    // Reset the game
    hasUserStartedTheGame.set(false);
}