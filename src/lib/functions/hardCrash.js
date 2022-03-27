import {siteError} from "$lib/store.js";
import {completeSimulation} from "$lib/functions/completeSimulation.js";
import {coinToss} from "$lib/functions/coinToss.js";

export const hardCrash = () => {
    if(coinToss()) {
        siteError.set("Ooof")
    }
}

export const createFatalError = () => {
    completeSimulation(false)
    siteError.set("Ooof")
}