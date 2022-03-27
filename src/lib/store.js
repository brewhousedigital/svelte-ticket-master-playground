//import { persist, localStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store"

export const siteError = writable("")

export const user = writable({})

export const linkHome = [{name: "Home", url: "/"}]
export const linkEvents = [{name: "Events", url: "/events"}]
export const linkQueue = [{name: "Queue", url: "/queue/bts"}]
export const breadcrumbs = writable([...linkHome])

export const countdownTime = writable(450000)
//export const countdownTime = persist(writable(450000), localStorage(), 'storage-countdownTime');


export const hasUserStartedTheGame = writable(false);

// Simulation Timer - Used to track how long the simulation lasted
// https://svelte.dev/repl/9650399966c648dabdb272c7589cd946?version=3.18.2
export const simulationTime = writable(0, () => {
    let interval = setInterval(() => {
        simulationTime.update(value => value + 1)
    }, 1000)

    return () => {
        clearInterval(interval)
    }
})
simulationTime.subscribe(item => {
    //console.log("simulationTime", item);
})
/*export const simulationTime = persist(writable(0, () => {
    let interval = setInterval(() => {
        simulationTime.update(value => value + 1)
    }, 1000)

    return () => {
        clearInterval(interval)
    }
}), localStorage(), 'storage-simulationTime');*/
