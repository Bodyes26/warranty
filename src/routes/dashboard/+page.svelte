<script>
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";

    let receipts = [];
    onMount(async () => {
        receipts = await pb.collection("receipts").getFullList({
            sort: "-created",
        });
    });
</script>
