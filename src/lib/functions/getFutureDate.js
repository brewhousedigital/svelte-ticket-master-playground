import {chooseRandomFromArray} from "$lib/functions/chooseRandomFromArray.js";

export const months = ["January","February","March","April","May","June","July", "August","September", "October","November","December"];
export const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const daysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const randomStartTimes = [
    "3:00pm", "5:00pm", "6:30pm", "7:00pm", "7:30pm", "8:00pm"
]

export const getFutureDate = (future) => {
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + future);

    return {
        base: targetDate,
        prettyDate: targetDate.toLocaleDateString(),

        monthName: months[targetDate.getMonth()],
        monthNameShort: monthsShort[targetDate.getMonth()],

        day: targetDate.getDate(),
        dayName: days[targetDate.getDay()],
        dayNameShort: daysShort[targetDate.getDay()],

        randomTime: chooseRandomFromArray(randomStartTimes)
    }
}