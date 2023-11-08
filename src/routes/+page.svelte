<script>
    import { currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(async () => {
        if ($currentUser === null || $currentUser === undefined) {
            console.log("currentuser = null or undefined, redirect to login");
            goto("/login");
            return;
        } else if ($currentUser.id === null || $currentUser.id === undefined) {
            console.log(
                "currentuser != null or undefined but id is, redirect to login"
            );

            goto("/login");
        } else {
            console.log("currentuser is ok, redirect to dashboard");
            goto("/dashboard");
        }
    });
</script>
