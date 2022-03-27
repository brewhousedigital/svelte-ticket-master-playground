<script>
    import {breadcrumbs, linkHome} from "$lib/store.js";
    import {shuffleArray} from "$lib/functions/shuffleArray.js";
    import {getFutureDate} from "$lib/functions/getFutureDate.js";
    import {getRandomTavern} from "$lib/functions/generateRandomVenueName.js";
    import heroBanners from "$lib/data/hero-events.json";

    import EventList from "$lib/components/EventList.svelte";
    import LayoutBuilder from "$lib/components/LayoutBuilder.svelte";

    breadcrumbs.set([...linkHome])

    let localHeroBannersArray = [...heroBanners];
    localHeroBannersArray = shuffleArray(localHeroBannersArray);

    const mainBanner = localHeroBannersArray.pop();

</script>


<LayoutBuilder title={`<strong>Concert</strong> Tickets`}>
    <div class="container">
        <div class="grid">
            <div class="Main">
                <div class="main-event">
                    <img src="/images/{mainBanner.image}" alt={mainBanner.name}>
                    <div class="flex">
                        <div>
                            <h2>{mainBanner.name}</h2>
                            <p>{mainBanner.description}</p>
                        </div>

                        <a href={mainBanner.url} class="shop-cta stretched-link" sveltekit:prefetch>See Tickets</a>
                    </div>
                </div>

                <h2 style="margin-bottom: 24px">All Events Near You</h2>
                <EventList limit={3} />
            </div>

            <div class="Sidebar">

            </div>
        </div>
    </div>
</LayoutBuilder>


<style>
    .grid {
        display: grid;
        grid-template-columns: 67% 33%;
        grid-template-rows: 1fr;
        gap: 0 12px;
        grid-template-areas: "Content Sidebar";
    }

    .Content { grid-area: Content; }
    .Sidebar { grid-area: Sidebar; }

    .main-event {
        position: relative;
        margin-bottom: 60px;
    }

    .main-event img {
        margin-bottom: 10px;
    }

    .main-event .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>