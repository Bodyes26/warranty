<script>
    import { currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(async () => {
        if ($currentUser === null || $currentUser === undefined) goto("/login");
        if ($currentUser.id === null || $currentUser.id === undefined)
            goto("/login");

        goto("/dashboard");
    });
</script>
