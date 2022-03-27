<script>
    import Header from "$lib/components/Header.svelte";

    export let headerType = "";
    export let title = "";
</script>

{#if headerType === "blank"}

{:else}
    <Header {title} {headerType} />
{/if}


<main>
    <slot></slot>
</main>


<style>
    main {
        min-height: 100vh;
    }
</style>