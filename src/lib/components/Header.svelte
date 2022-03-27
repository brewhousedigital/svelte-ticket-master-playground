<script>
    import Timer from "tiny-timer";
    import {user} from "$lib/store.js";
    export let headerType = "";
    export let title = "";

    import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
    import {onMount} from "svelte";

    const timer = new Timer();
    // 7 minutes 30 seconds
    let totalTime = 450000;
    let countdownRemaining = "07:30";

    onMount(() => {
        if(headerType === "checkout") {
            timer.start(totalTime)

            timer.on('tick', (ms) => {
                let time = Math.round(ms / 1000);

                let minutes = String(Math.floor(time / 60));
                let seconds = String(time - minutes * 60);

                seconds = seconds.length > 1 ? seconds : "0" + seconds;

                countdownRemaining = "0" + minutes + ":" + seconds;
            })
        }
    })

</script>

<header class={headerType === "slim" ? "" : "mb-32"}>
    <nav class={headerType === "slim" || headerType === "checkout" ? '' : 'mb-60'}>
        <h1><a href="/" sveltekit:prefetch>BTS Ticket Simulator</a></h1>

        {#if headerType === "checkout"}
            <div style="font-weight: 500; font-size: 20px">Checkout</div>

            <!-- Hidden for spacing-->
            <div style="font-weight: 500; font-size: 20px">Time Remaining {countdownRemaining}</div>
        {:else}
            <div class="searchbar">
                <i class="bi bi-search"></i>
                <input type="text" placeholder="Pretend to find millions of live experiences" aria-label="Pretend to find millions of live experiences">
            </div>

            <div class="links-group-1">
                <a href="/events" sveltekit:prefetch>Concerts</a>
                <a href="#">Sports</a>
                <a href="#">More</a>
            </div>

            <div class="links-group-2">
                {#if $user.email}
                    <a href="/" sveltekit:prefetch>My Account</a>
                {:else}
                    <a href="/sign-in" sveltekit:prefetch>Sign In</a>
                {/if}
                <a href="#">Sell</a>
                <a href="#">Gift Cards</a>
                <a href="#">Help</a>
            </div>
        {/if}

    </nav>

    {#if headerType !== "slim" && headerType !== "checkout"}
    <div class="container">
        <Breadcrumbs />

        <h2>{@html title}</h2>
    </div>
    {/if}
</header>



<style>
    header {
        color: #fff;
        background-image: linear-gradient(262deg, rgb(0, 45, 161), rgb(2, 108, 223) 55%, rgb(0, 45, 161));
        padding: 10px 24px;
    }

    header a {
        color: #fff;
        text-decoration: none;
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    nav h1 {
        margin: 0 24px 0 0;
        text-transform: lowercase;
        font-style: italic;
    }

    .searchbar {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        padding: 0 16px;
        margin-right: 24px;
    }

    .searchbar input {
        background-color: transparent;
        border: 0;
        padding: 8px 16px;
        color: #fff;
        font-size: 14px;
        min-width: 300px;
    }

    .searchbar input::placeholder {
        color: #fff;
    }

    .searchbar input:focus {
        outline: transparent;
    }

    h2 {
        margin: 0;
        font-weight: 400;
        font-size: 46px;
    }

    .links-group-1 a,
    .links-group-2 a {
        padding: 6px 12px;
        font-weight: 700;
        display: inline-block;
    }

    .links-group-2 {
        margin-left: auto;
    }
</style>