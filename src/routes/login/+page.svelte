<script>
    import { goto } from "$app/navigation";
    import { pb } from "$lib/pocketbase";

    let username,
        password,
        showToastError = false;

    async function handleLogin() {
        try {
            const authData = await pb
                .collection("users")
                .authWithPassword(username, password);
            goto("/dashboard");
        } catch (error) {
            showToastError = true;
            setTimeout(() => (showToastError = false), 3000);
        }
    }
</script>

<form
    on:submit|preventDefault={handleLogin}
    class="w-full min-h-screen flex flex-col justify-center items-center gap-2"
>
    <div class="form-control max-w-sm w-full">
        <label for="username" class="label">
            <span class="label-text">Username</span>
        </label>
        <input
            type="text"
            id="username"
            class="input input-bordered max-w-sm w-full"
            bind:value={username}
            required
        />
    </div>
    <div class="form-control max-w-sm w-full">
        <label for="password" class="label">
            <span class="label-text">Password</span>
        </label>
        <input
            type="password"
            id="password"
            class="input input-bordered max-w-sm w-full"
            bind:value={password}
            required
        />
    </div>
    <div class="grid grid-cols-2 gap-2 max-w-sm w-full mt-4">
        <button class="btn btn-primary" type="submit">Login</button>
        <button type="reset" class="btn">Cancel</button>
    </div>
</form>

{#if showToastError}
    <div class="toast">
        <div class="alert alert-error">
            <span>Login error</span>
        </div>
    </div>
{/if}
