<script>
    import Icon from "svelte-awesome";
    import camera from "svelte-awesome/icons/camera";
    import cloudUpload from "svelte-awesome/icons/cloudUpload";
    import { pb, currentUser } from "$lib/pocketbase";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let files = [],
        fileInput,
        name,
        dateOfPurchase,
        loading = false,
        form,
        showToastSaved = false,
        showToastError = false;

    onMount(() => {
        if ($currentUser === null || $currentUser === undefined) goto("/login");
        if ($currentUser.id === null || $currentUser.id === undefined)
            goto("/login");
    });

    async function loadReceipt() {
        try {
            loading = true;
            let formData = new FormData();
            formData.append("name", name);
            formData.append("date_of_purchase", dateOfPurchase);
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
            formData.append("user", $currentUser.id);
            const record = await pb.collection("receipts").create(formData);
            loading = false;
            console.log("Salvato");
            form.reset();
            showToastSaved = true;
            setTimeout(() => {
                showToastSaved = false;
            }, 3000);
        } catch (error) {
            console.log(error);
            showToastError = true;
            setTimeout(() => {
                showToastError = false;
            }, 3000);
        }
    }

    // TODO: Show preview of uploaded image
    function showPreview() {
        files = fileInput.files;
        console.log(files);
    }
</script>

<div class="w-screen min-h-screen p-8 flex flex-col items-center gap-8">
    <h1 class="text-4xl text-center">Load new receipt</h1>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="w-1/3 h-40 flex items-center justify-center bg-gray-400 rounded-xl border-2 border-gray-700 border-dashed gap-6"
        on:click={() => fileInput.click()}
        role="button"
        tabindex="-1"
    >
        <Icon data={camera} scale="2" />
        <div class="divider divider-horizontal h-2/3 my-auto">OR</div>
        <Icon data={cloudUpload} scale="2" />

        <input
            type="file"
            name="fileInput"
            id="fileInput"
            multiple={true}
            bind:this={fileInput}
            class="hidden"
            on:change={showPreview}
        />
    </div>

    <form
        on:submit|preventDefault={loadReceipt}
        class="w-full max-w-sm mx-auto"
        bind:this={form}
    >
        <div class="form-control w-full max-w-sm">
            <label for="name" class="label">
                <span class="label-text">Name</span>
            </label>
            <input
                type="text"
                bind:value={name}
                id="name"
                class="input input-bordered w-full max-w-sm"
            />
        </div>
        <div class="form-control w-full max-w-sm">
            <label for="date" class="label">
                <span class="label-text">Date of purchase</span>
            </label>
            <input
                type="date"
                bind:value={dateOfPurchase}
                id="date"
                class="input input-bordered w-full max-w-sm"
            />
        </div>
        <div class="grid grid-cols-2 gap-4 mt-8">
            <button class="btn btn-primary" type="submit" disabled={loading}>
                Save
            </button>
            <button class="btn" type="reset" disabled={loading}>Cancel</button>
        </div>
    </form>
</div>

{#if showToastSaved}
    <div class="toast">
        <div class="alert alert-success">
            <span>Receipt Saved!</span>
        </div>
    </div>
{/if}

{#if showToastError}
    <div class="toast">
        <div class="alert alert-error">
            <span>Error saving receipt.</span>
        </div>
    </div>
{/if}
