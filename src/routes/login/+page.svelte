<script>
    import { goto } from "$app/navigation";
    import { pb, currentUser } from "$lib/pocketbase";
    import { onMount } from "svelte";
    let username,
        password,
        confirmPassword,
        showToastError = false,
        toastErrorMessage = "";

    onMount(() => {
        if ($currentUser != null && $currentUser != undefined)
            goto("/dashboard");
    });

    async function handleLogin() {
        try {
            await pb.collection("users").authWithPassword(username, password);
            goto("/dashboard");
        } catch (error) {
            toastErrorMessage = "Invalid username or password";
            showToastError = true;
            setTimeout(() => (showToastError = false), 3000);
        }
    }

    async function handleRegister() {
        try {
            const data = {
                username: username,
                password: password,
                passwordConfirm: confirmPassword,
                name: username,
            };
            await pb.collection("users").create(data);
            await pb.collection("users").authWithPassword(username, password);
            goto("/dashboard");
        } catch (error) {
            toastErrorMessage = "Registration error";
            showToastError = true;
            setTimeout(() => (showToastError = false), 3000);
        }
    }
</script>

<div
    class="w-full min-h-screen flex flex-col items-center justify-center gap-2"
>
    <div class="tabs tabs-lifted">
        <input
            type="radio"
            name="tabs_login"
            class="tab"
            aria-label="Login"
            checked
        />
        <div class="tab-content bg-base-100 border-base-300 rounded-box p-10">
            <form
                on:submit|preventDefault={handleLogin}
                class="w-full flex flex-col justify-center items-center gap-2"
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
                        autocomplete="username"
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
                        autocomplete="current-password"
                    />
                </div>
                <div class="grid grid-cols-2 gap-2 max-w-sm w-full mt-4">
                    <button class="btn btn-primary" type="submit">Login</button>
                    <button type="reset" class="btn">Cancel</button>
                </div>
            </form>
        </div>

        <input
            type="radio"
            name="tabs_login"
            class="tab"
            aria-label="Register"
        />
        <div class="tab-content bg-base-100 border-base-300 rounded-box p-10">
            <form
                on:submit|preventDefault={handleRegister}
                id="register"
                class="w-full flex-col justify-center items-center gap-2 flex"
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
                        autocomplete="username"
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
                        autocomplete="new-password"
                    />
                </div>
                <div class="form-control max-w-sm w-full">
                    <label for="confirm-password" class="label">
                        <span class="label-text">Confirm Password</span>
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        class="input input-bordered max-w-sm w-full"
                        bind:value={confirmPassword}
                        required
                        autocomplete="new-password"
                    />
                </div>
                <div class="grid grid-cols-2 gap-2 max-w-sm w-full mt-4">
                    <button class="btn btn-primary" type="submit"
                        >Sign up</button
                    >
                    <button type="reset" class="btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    <!-- <div class="tabs tabs-boxed">
        <a
            class={activeTab == 0 ? "tab tab-active" : "tab"}
            on:click={() => (activeTab = 0)}
            href="#login"
        >
            Log in
        </a>
        <a
            class={activeTab == 1 ? "tab tab-active" : "tab"}
            on:click={() => (activeTab = 1)}
            href="#register"
        >
            Register
        </a>
    </div> -->
</div>

{#if showToastError}
    <div class="toast">
        <div class="alert alert-error">
            <span>{toastErrorMessage}</span>
        </div>
    </div>
{/if}
