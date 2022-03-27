<script>
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import {breadcrumbs, linkHome, linkEvents, linkQueue} from "$lib/store.js";
    import {randomNumberBetween} from "$lib/functions/randomNumberBetween.js";
    import {createFatalError} from "$lib/functions/hardCrash.js";
    import {coinToss} from "$lib/functions/coinToss.js";

    import LayoutBuilder from "$lib/components/LayoutBuilder.svelte";
    import {onMount} from "svelte";

    breadcrumbs.set([...linkHome, ...linkEvents, ...linkQueue])

    let env = $page.url.hostname;

    let randomCounter = randomNumberBetween(60)
    let incrementAmount = Math.round(100 / randomCounter);
    incrementAmount = env === "localhost" ? 20 : incrementAmount;
    let width = 1;

    function update() {
        let identity = setInterval(scene, 1000);
        function scene(element) {
            if (width >= 100) {
                clearInterval(identity);
                goto("/events/bts")
            } else {
                if(!coinToss(0.95)) {
                    createFatalError();
                    return false;
                }
                width = width + incrementAmount;
            }
        }
    }

    onMount(() => {
        setTimeout(() => {
            update()
        }, 1000)
    })
</script>

<LayoutBuilder title={`<strong>Ticket</strong> Queue`}>
    <div class="header"></div>
    <div class="container">
        <div class="card text-center">
            <h2>You Are Now in The Queue</h2>
            <p class="queue-text">20,000+</p>

            <div class="queue-container">
                <div class="queue-bar" style={`width: ${width}%`}></div>
            </div>
        </div>
    </div>
</LayoutBuilder>


<style>
    .queue-container {
        width: 100%;
        background-color: #ddd;
    }

    .queue-bar {
        transition: all 200ms linear;
        width: 1%;
        height: 35px;
        background-color: #4CAF50;
        text-align: center;
        line-height: 32px;
        color: black;
    }

    .header {
        background-color: #222;
        min-height: 400px;
        margin-top: -32px;
    }

    .card {
        margin-top: -200px;
        background-color: #fff;
        padding: 60px 80px;
        border-radius: 8px;
        box-shadow: rgb(0 0 0) 0 10px 22px -23px;
    }

    .queue-text {
        font-size: 70px;
        font-weight: 500;
        margin-bottom: 24px;
    }
</style>