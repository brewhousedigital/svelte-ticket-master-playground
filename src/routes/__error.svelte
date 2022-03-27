<script context="module">
    export function load({ error, status }) {
        return {
            props: {
                status: status,
                message: error.message
            }
        };
    }
</script>

<script>
    export let status;
    export let message;
</script>



<div class="container mx-auto">
    <h1 class="text-5xl font-bold">Status: {status}</h1>
    <h2 class="text-4xl font-bold mb-8">{message}</h2>

    <p><a href="/" class="btn btn-outline">Return Home</a></p>
</div>