<script>
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";

    let temp = [];
    onMount(async () => {
        temp = await pb.collection("receipts").getFullList({
            sort: "-created",
        });
        console.log("ciao fatto pb!");
    });
</script>

<div>temp length = {temp.length}</div>
<div>temp = {temp}</div>
