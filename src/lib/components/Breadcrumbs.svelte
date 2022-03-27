<script>
    import {breadcrumbs} from "$lib/store.js";
</script>

<div class="breadcrumbs">
{#each $breadcrumbs as link, index}
    {index === 0 ? '' : ' /'}
    <a href={link.url} sveltekit:prefetch>{link.name}</a>
{/each}
</div>


<style>
    .breadcrumbs {
        font-size: 13px;
    }

    .breadcrumbs a {
        color: #fff;
        text-decoration: none;
    }
</style>