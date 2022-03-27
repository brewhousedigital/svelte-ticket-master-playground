<script>
    import { page } from '$app/stores';
    import events from "$lib/data/hero-events.json";
    import {goto} from "$app/navigation";
    import {slide} from "svelte/transition"
    import {getFutureDate} from "$lib/functions/getFutureDate.js";
    import {getRandomTavern} from "$lib/functions/generateRandomVenueName.js";
    import {randomNumberBetween} from "$lib/functions/randomNumberBetween.js";
    import {chooseRandomFromArray} from "$lib/functions/chooseRandomFromArray.js";

    //import swal from 'sweetalert';
    import LayoutBuilder from "$lib/components/LayoutBuilder.svelte";
    import {onDestroy, onMount} from "svelte";
    import {coinToss} from "$lib/functions/coinToss.js";
    import {createFatalError} from "$lib/functions/hardCrash.js";

    const venueRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"]

    const selectedEvent = events.find(item => item.name === "BTS");

    const map = `/images/map-${randomNumberBetween(12)}.svg`;
    const seatChoice = `Sec ${randomNumberBetween(600)}, Row ${randomNumberBetween(40)}`;



    onMount(() => {
        if(!selectedEvent){
            goto("/events");
            return false;
        }

        if(selectedEvent.name === "BTS") {
            swal("What You Need To Know", "A Note on the Safety Protocols in Place for this Event COVID-19 related health protocols may be in effect at the time of performance, including, without limitation, masks or facial coverings, testing, confirmation of prior travel to restricted areas and/or confirmation of no known symptoms of and exposure to COVID-19. We reserve the right to unilaterally make changes to health protocols according to updated public health guidance and applicable law. Future updates will be provided to ticket holders prior to the performance. Any ticket holder who does not comply with COVID-19 related health protocol may be required to leave the venue, and his/her/their ticket will not be refunded. Guests with accessibility questions, or who may require additional assistance related to the venue's COVID-19 policies may email thisisfake@definitelyfake.com or call (123) 456-7890. Please note: this event is being planned at full capacity subject to applicable law and government approval.", "info", {
                closeOnClickOutside: false
            })
        } else {
            swal("Wait a second", "Are you sure you want to be buying tickets for something other than BTS...?", "info", {
                closeOnClickOutside: false,
            })
        }
    })

    let isConfirmTicket = false;

    function handleCloseConfirmTicket() {
        isConfirmTicket = false;
    }

    function handleConfirmTicket() {
        isConfirmTicket = true;
    }

    let checkSite = $page.url.hostname;

    let setTimeoutHandleCheckout;

    onDestroy(() => {
        clearTimeout(setTimeoutHandleCheckout);
    })

    function handleCheckout() {
        swal("Sit tight", "We're securing your Verified Tickets", "success", {
            button: false,
            closeOnClickOutside: false,
        });

        let counter = randomNumberBetween(60) * 1000;

        if(checkSite === "localhost") {
            counter = 3000;
        }

        let interval = setInterval(() => {
            if(!coinToss(0.90)) {
                createFatalError();
                clearInterval(interval);
                return false;
            }
        }, 1000)

        setTimeoutHandleCheckout = setTimeout(() => {
            clearInterval(interval)
            goto("/checkout")
            swal.close();
        }, counter)
    }
</script>

{#if selectedEvent}
<LayoutBuilder headerType="slim">
    <div class="event-header">
        <img src="/images/{selectedEvent.image}" alt={selectedEvent.name} />

        <div>
            <h3>{selectedEvent.name}</h3>
            <div>
                {getFutureDate(selectedEvent.saleDate).dayNameShort} -
                {getFutureDate(selectedEvent.saleDate).monthNameShort}
                {getFutureDate(selectedEvent.saleDate).day} -
                {getFutureDate(selectedEvent.saleDate).randomTime}
            </div>
            <div>
                Location: {getRandomTavern()}
            </div>
        </div>
    </div>

    <div class="grid">
        <div class="Content">
            <img src={map} alt="venue map" />
        </div>

        <div class="Sidebar">
            <div class="ticket-setup">
                {#each Array(100) as item}
                    <div class="ticket-box">
                        <div>
                            <strong>Sec {randomNumberBetween(600)}, Row {chooseRandomFromArray(venueRows)}</strong>
                            <small>Standard Ticket</small>
                        </div>

                        <button type="button" on:click={handleConfirmTicket}>${randomNumberBetween(400)}.00 ea</button>
                    </div>
                {/each}
            </div>

            {#if isConfirmTicket}
            <div class="ticket-confirmation" transition:slide>
                <div class="confirmation-header text-center">
                    <div>{seatChoice}</div>
                    <button on:click={handleCloseConfirmTicket}>
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <div class="confirmation-box">
                    <img src={map} alt="venue map" />

                    <div class="text-end">
                        <div>Standard Ticket</div>
                        <div>{seatChoice}</div>
                    </div>
                </div>

                <div class="covid-disclaimer">
                    *As official local health guidelines evolve regarding COVID-19 safety protocols, select venues may shift seating configurations and/or increase capacity.
                </div>

                <div class="confirm-ticket-box">
                    <div>
                        <div>Standard Ticket</div>
                        <div>$200.00 ea + Fees</div>
                    </div>

                    <div class="confirm-ticket-box-num">
                        <span>2</span>
                        <button disabled><i class="bi bi-plus-circle-fill"></i></button>
                    </div>
                </div>

                <div class="continue-to-checkout">
                    <div>2 Tickets</div>
                    <div><button on:click={handleCheckout} class="shop-cta">Next</button></div>
                </div>
            </div>
            {/if}
        </div>
    </div>
</LayoutBuilder>
{/if}


<style>
    /*.ticket-setup {display: none;}*/

    .event-header {
        padding: 10px 20px;
        background-color: #0256b2;
        display: flex;
        align-items: center;
        color: #fff;
    }

    .event-header img {
        max-width: 200px;
        margin-right: 24px;
    }

    .grid {
        min-height: calc(100vh - 189px);
        display: grid;
        grid-template-columns: 1fr 420px;
        grid-template-rows: 1fr;
        gap: 0 0;
        grid-template-areas: "Content Sidebar";
    }

    .Content {
        grid-area: Content;
        background-color: #e8ecf2;
    }
    .Sidebar {
        grid-area: Sidebar;
        min-height: calc(100vh - 189px);
        background-color: #fff;
        position: relative;
    }

    .ticket-setup::-webkit-scrollbar-track {
        background-color: #fff;
    }

    .ticket-setup::-webkit-scrollbar {
        width: 7px;
        background-color: #F5F5F5;
    }
    .ticket-setup::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #0d6efd;
    }

    .ticket-setup {
        height: calc(100vh - 189px);
        overflow-y: scroll;
    }

    .ticket-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        border-bottom: 1px solid #eee;
    }

    .ticket-box:hover {
        background-color: #fafafa;
    }

    .ticket-box strong, .ticket-box small {
        display: block;
    }

    .ticket-box small {
        opacity: 0.7;
    }

    .ticket-box button {
        background: transparent;
        border: 0;
        color: #0d6efd;
        font-weight: 500;
        cursor: pointer;
    }

    .ticket-confirmation {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: absolute;
        z-index: 20;
        top: 0;
        right: 0;
        background-color: #fff;
    }

    .ticket-confirmation .confirmation-header {
        background-color: #eee;
        position: relative;
        padding: 12px 24px;
        font-weight: 600;
    }

    .ticket-confirmation .confirmation-header button {
        border: 0;
        background: transparent;
        position: absolute;
        top: calc(50% - 15px);
        right: 6px;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .confirmation-box {
        padding: 12px 24px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .confirmation-box img {
        max-width: 175px;
    }

    .covid-disclaimer {
        padding: 12px 24px;
        font-size: 12px;
        border-bottom: 1px solid #eee;
    }

    .confirm-ticket-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 24px;
    }

    .confirm-ticket-box-num {
        display: flex;
        align-items: center;
    }

    .confirm-ticket-box-num span {
        font-size: 30px;
        font-weight: 500;
        display: inline-block;
        margin-right: 6px;
    }

    .confirm-ticket-box-num button {
        background: transparent;
        border: 0;
        padding: 0;
        font-size: 30px;
        cursor: pointer;
        color: #0d6efd;
        opacity: 0.3;
    }

    .continue-to-checkout {
        margin-top: auto;
        background-color: #eee;
        padding: 12px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .continue-to-checkout .shop-cta {
        background-color: #1bab1e;
        font-weight: 700;
        max-width: 80px;
        min-width: initial;
        border-radius: 4px;
    }
</style>