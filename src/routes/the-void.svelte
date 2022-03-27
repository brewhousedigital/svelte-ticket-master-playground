<script>
    import LayoutBuilder from "$lib/components/LayoutBuilder.svelte";
</script>

<LayoutBuilder headerType="blank">
    <div class="main">
        <div class="text-center" style="width: 100%;">
            <img src="https://c.tenor.com/wp3pbNkOpcEAAAAC/bts-hello-darkness-my-old-friend.gif" alt="Hello Darkness My Old Friend" />

            <p class="mb-16">That wasn't a BTS show... and now it's already sold out...</p>
            <button on:click={() => {window.location = "/"}} class="shop-cta">Try Again</button>
        </div>
    </div>
</LayoutBuilder>

<style>
    .main {
        background-color: #222;
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
    }

    .main img {
        max-width: 500px;
        width: 100%;
        height: auto;
        display: block;
        margin: 0 auto 32px auto;
    }
</style>