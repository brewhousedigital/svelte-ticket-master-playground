<script>
    import "$lib/css/_reset.css";
    import "$lib/css/global.css";

    import {siteError} from "$lib/store.js";

    import Footer from "$lib/components/Footer.svelte";
    import Error500 from "$lib/components/Error500.svelte";
    import SiteLoader from "$lib/components/SiteLoader.svelte";

</script>


<slot></slot>

<Footer />

{#if $siteError !== ""}
    <Error500 />
{/if}


<SiteLoader />
