<script>
    import { slide } from 'svelte/transition';
    import { page } from '$app/stores';
    import {simulationTime, hasUserStartedTheGame} from "$lib/store.js";
    import Loader from "$lib/components/reusable/Loader.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    let showStartScreen = false;
    let hideSite = true;

    let showStats = false;

    let totalStats;
    let ticketsAcquired = 0;
    let totalGames = 0;
    let fastestTime = 0;

    onMount(() => {
        if($hasUserStartedTheGame) {
            hideSite = false;
        } else {
            showStartScreen = true;
        }

        totalStats = localStorage.getItem("storage-gameHistory");

        if(totalStats !== null) {
            totalStats = JSON.parse(totalStats);

            ticketsAcquired = totalStats.filter(item => item.success).length ?? 0;
            totalGames = totalStats.length;

            let filteredTimes = totalStats.filter(item => item.success);
            let sortedTimes = filteredTimes.sort(function(a, b) {
                return (a?.totalTime - b?.totalTime);
            });
            fastestTime = sortedTimes?.[0]?.totalTime ?? 0;
        }
    })

    function handleStart() {
        let checkPage = $page.url.pathname;
        if(checkPage !== "/") {
            goto("/")
        }

        simulationTime.set(0);
        hasUserStartedTheGame.set(true);
        hideSite = false;
        showStartScreen = false;
    }

    function handleStats() {
        showStats = !showStats;
    }

</script>

{#if hideSite}
    {#if showStartScreen}
        <div class="loader-container" out:slide="{{delay: 500}}">
            <button class="your-stats" on:click={handleStats}>Your Stats</button>
            {#if showStats}
                <div class="your-stats-box" transition:slide>
                    <div>
                        <div class="stats-box-emoji">🎟</div>
                        <div class="stats-box-title">Tickets Acquired</div>
                        <div class="stats-box-stat">{ticketsAcquired}</div>
                    </div>

                    <div>
                        <div class="stats-box-emoji">🎰</div>
                        <div class="stats-box-title">Total Games</div>
                        <div class="stats-box-stat">{totalGames}</div>
                    </div>

                    <div>
                        <div class="stats-box-emoji">⏱</div>
                        <div class="stats-box-title">Fastest Time</div>
                        <div class="stats-box-stat">{fastestTime} sec</div>
                    </div>
                </div>
            {/if}

            <div class="text-center">
                <h1>Welcome to the BTS Ticket Simulator</h1>
                <h2 class="mb-12">Where your dreams can become reality*</h2>

                <p class="ultra-small mb-32">*The chances of making your dreams become a reality on the BTS Ticket Simulator is approximately 1 in 134 million. Proceed at your own risk.</p>

                <div>
                    <button class="shop-cta" on:click={handleStart}>Begin Simulation</button>
                </div>
            </div>
        </div>
    {:else}
        <div class="loader-container">
            <Loader />
        </div>
    {/if}
{/if}


<style>
    .loader-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: #fafafa;
        z-index: 20000;
    }

    .ultra-small {
        font-size: 10px;
    }

    .your-stats {
        position: absolute;
        top: 12px;
        right: 24px;
        padding: 12px 24px;
    }

    .your-stats-box {
        position: absolute;
        top: 71px;
        right: 24px;
        padding: 12px 24px;
        background-color: #fff;
        display: flex;
        border: 1px solid #eee;
        border-radius: 4px;
        text-align: center;
    }

    .your-stats-box > div {
        padding: 0 24px;
    }

    .stats-box-emoji {
        font-size: 30px;
    }
    .stats-box-title {
        font-weight: 500;
    }
    .stats-box-stat {
        font-size: 30px;
    }
</style>