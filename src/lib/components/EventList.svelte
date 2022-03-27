<script>
    import {getFutureDate} from "$lib/functions/getFutureDate.js";
    import {getRandomTavern} from "$lib/functions/generateRandomVenueName.js";
    import {shuffleArray} from "$lib/functions/shuffleArray.js";
    import {sortArrayNumerically} from "$lib/functions/sortArrayNumerically.js";

    import heroBanners from "$lib/data/hero-events.json";

    export let filter = false;
    export let limit = 200;

    let events = [...heroBanners];
    events = shuffleArray(events);

    function handleSort() {
        let sortedEvents = sortArrayNumerically(events, "saleDate");
        events = [...sortedEvents]
    }
</script>


{#if filter}
    <div class="mb-24 text-end">
        <button on:click={handleSort}>Sort By: Date</button>
    </div>
{/if}

{#each events as event, index}
    {#if index < limit}
    <div class="event-block">
        <img src="/images/{event.image}" alt={event.name} />

        <div class="date">
            <div>
                {getFutureDate(event.saleDate).monthNameShort}
                {getFutureDate(event.saleDate).day}
            </div>
            <div>
                {getFutureDate(event.saleDate).dayNameShort} -
                {getFutureDate(event.saleDate).randomTime}
            </div>
        </div>

        <div class="title">
            <h3>{event.name}</h3>
            <p>Location: {getRandomTavern()}</p>
        </div>

        <div class="cta">
            <a href={event.url} sveltekit:prefetch class="shop-cta">See Tickets</a>
        </div>
    </div>
    {/if}
{/each}


<style>
    .event-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 24px;
        margin-bottom: 24px;
        border-bottom: 1px solid #eee;
    }

    .event-block img {
        max-width: 100px;
        margin-right: 24px;
    }

    .event-block .date {
        min-width: 150px;
    }

    .event-block .cta {
        margin-left: auto;
    }
</style>