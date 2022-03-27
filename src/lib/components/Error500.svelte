<script>
    import {siteError} from "$lib/store.js";
    import {onMount} from "svelte";

    onMount(() => {
        document.querySelector("header").style.display = "none";
        document.querySelector("main").style.display = "none";
        document.querySelector("footer").style.display = "none";
    })

    function handleReload() {
        siteError.set("")
        window.location = "/";
    }
</script>


<div class="error">
    <div class="container container-sm">
    <div class="icon">
        <i class="bi bi-exclamation-octagon"></i>
    </div>

    <h1>Aw, Snap!</h1>

    <p>Something went wrong while displaying this webpage.</p>

    <div class="text-end">
        <button on:click={handleReload}>Reload</button>
    </div>
    </div>
</div>


<style>
    .error {
        display: flex;
        align-items: center;
        z-index: 12000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: #fafafa;
    }

    .icon {
        font-size: 40px;
    }

    h1 {
        margin-bottom: 30px;
    }

    p {
        margin-bottom: 40px;
    }


    button {
        display: inline-block;
        font-weight: 400;
        line-height: 1.5;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        color: #fff;
        background-color: #0d6efd;
        border-color: #0d6efd;
    }
</style>