<script>
    import { pb, currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        if ($currentUser === null || $currentUser === undefined) goto("/login");
        if ($currentUser.id === null || $currentUser.id === undefined)
            goto("/login");
    });

    function logout() {
        pb.authStore.clear();
        goto("/login");
    }
</script>

<div class="w-screen h-full flex items-center justify-center">
    <button class="btn btn-error btn-lg" on:click={logout}>LOG OUT</button>
</div>
