<script>
    import {breadcrumbs, linkHome, linkEvents} from "$lib/store.js";
    import EventList from "$lib/components/EventList.svelte";
    import LayoutBuilder from "$lib/components/LayoutBuilder.svelte";

    breadcrumbs.set([...linkHome, ...linkEvents])
</script>

<LayoutBuilder  title={`<strong>All Concert</strong> Tickets`}>
    <div class="container">
        <EventList filter={false} />
    </div>
</LayoutBuilder>