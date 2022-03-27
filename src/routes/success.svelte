<script>
    import gifs from "$lib/data/bts-gifs.json";
    import {gameHistory} from "$lib/store.js";
    import {shuffleArray} from "$lib/functions/shuffleArray.js";
    import swal from "sweetalert";
    import LayoutBuilder from "$lib/components/LayoutBuilder.svelte";

    let newArray = [...gifs];
    newArray = shuffleArray(newArray);
    newArray = shuffleArray(newArray);
    newArray = shuffleArray(newArray);


    let minutes
    let seconds
    $: {
        minutes = String(Math.floor($gameHistory[$gameHistory.length - 1].totalTime / 60));
        seconds = String($gameHistory[$gameHistory.length - 1].totalTime - minutes * 60);
    }

    let background1 = `background-image: url('${newArray[0]}')`;
    let background2 = `background-image: url('${newArray[1]}')`;
    let background3 = `background-image: url('${newArray[2]}')`;
    let background4 = `background-image: url('${newArray[3]}')`;
    let background5 = `background-image: url('${newArray[4]}')`;
    let background6 = `background-image: url('${newArray[5]}')`;
    let background7 = `background-image: url('${newArray[6]}')`;
    let background8 = `background-image: url('${newArray[7]}')`;

    function handleShare() {
        const area = document.querySelector('#clipboard-area')
        area.select();
        document.execCommand('copy')
        swal("Score Copied", "", "success")
    }
</script>

<LayoutBuilder headerType="blank">
    <div class="grid">
        <div class="giphy giphy-1" style={background1}></div>

        <div class="giphy giphy-2" style={background2}></div>

        <div class="giphy giphy-3" style={background3}></div>

        <div class="giphy giphy-4" style={background4}></div>

        <div>
            <div class="order-success text-center">
                <div>
                    <h1>Your Order is Complete</h1>
                    <h2 class="mb-24">BTS Ticket Simulator Order Number: 7</h2>

                    <p class="mb-24">It took a total of {minutes} minute{minutes === 1 ? '' : 's'} and {seconds} second{seconds === 1 ? '' : 's'}</p>

                    <div>
                        <button on:click={handleShare} class="btn">Share Your Score</button>
                        <button on:click={() => {window.location = "/"}} class="btn">Main Menu</button>
                    </div>

                    <textarea id="clipboard-area">I got a 🎟 on the BTS Ticket Simulator in {minutes} minute{minutes === 1 ? '' : 's'} and {seconds} second{seconds === 1 ? '' : 's'}</textarea>
                </div>
            </div>
        </div>

        <div class="giphy giphy-5" style={background5}></div>

        <div class="giphy giphy-6" style={background6}></div>

        <div class="giphy giphy-7" style={background7}></div>

        <div class="giphy giphy-8" style={background8}></div>
    </div>
</LayoutBuilder>


<style>
    .grid {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 0 0;
        grid-template-areas:
        ". . ."
        ". . ."
        ". . .";
    }

    .order-success {
        background-color: #eee;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .giphy {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        opacity: 0.4;
    }

    #clipboard-area {
        position: absolute;
        top: -1000px;
        left: -1000px;
    }

    .btn {
        cursor: pointer;
        padding: 8px 16px;
        margin: 0 12px;
    }

    .btn:first-child {
        border-color: forestgreen;
    }

    .btn:last-child {
        border-color: rgba(0,0,0,0.1);
    }
</style>