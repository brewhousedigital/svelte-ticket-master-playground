<script>
    import { slide } from 'svelte/transition';
    import { page } from '$app/stores';
    import {simulationTime, gameHistory, hasUserStartedTheGame} from "$lib/store.js";
    import Loader from "$lib/components/reusable/Loader.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    let showStartScreen = false;
    let hideSite = true;

    onMount(() => {
        if($hasUserStartedTheGame) {
            hideSite = false;
        } else {
            showStartScreen = true;
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

</script>

{#if hideSite}
    {#if showStartScreen}
        <div class="loader-container" out:slide="{{delay: 500}}">
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
</style>