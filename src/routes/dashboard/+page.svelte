<script>
    import { pb, currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";

    import { onMount } from "svelte";
    import download from "svelte-awesome/icons/download";
    import Icon from "svelte-awesome";
    import eye from "svelte-awesome/icons/eye";

    let receipts = [],
        anteprima,
        backdrop;
    onMount(async () => {
        if ($currentUser === null || $currentUser === undefined) goto("/login");

        let temp = await pb.collection("receipts").getFullList({
            sort: "-created",
        });

        for (let index = 0; index < temp.length; index++) {
            const receipt = temp[index];
            receipt.downloadUrl = pb.files.getUrl(receipt, receipt.files[0], {
                download: "1",
            });
            receipt.thumbUrl = pb.files.getUrl(receipt, receipt.files[0], {
                thumb: "300x500",
            });
            receipt.url = pb.files.getUrl(receipt, receipt.files[0]);
            receipt.untilDate = calculateWarrantyEnd(
                receipt.date_of_purchase,
                receipt.duration_days
            );
            receipt.printableDate = new Date(
                receipt.date_of_purchase
            ).toLocaleDateString("en-GB");
            receipt.printableUntilDate = new Date(
                receipt.untilDate
            ).toLocaleDateString("en-GB");
            receipts = [...receipts, receipt];
        }
    });

    function calculateWarrantyEnd(dateOfPurchase, duration) {
        console.log(
            " date of purchase and duration ",
            dateOfPurchase,
            duration
        );
        let endDate = new Date(dateOfPurchase);
        endDate.setDate(endDate.getDate() + duration);
        return endDate;
    }

    function showAnteprima(receipt) {
        console.log(receipt);
        anteprima.src = receipt.url;

        backdrop.classList.add("!z-10");

        backdrop.classList.add("!opacity-100");
        backdrop.classList.add("!bg-opacity-30");
        backdrop.classList.remove("hidden");
    }

    function removePreview() {
        backdrop.classList.remove("!opacity-100");
        backdrop.classList.remove("!bg-opacity-30");
        backdrop.classList.add("hidden");

        setTimeout(() => {
            backdrop.classList.remove("!z-10");
        }, 350);
    }
</script>

<h1 class="text-5xl font-bold">Warranty dashboard</h1>
<h2 class="text-3xl">Latest receipts</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each receipts as receipt}
        <div class="card w-fit bg-base-100 shadow-xl !z-0">
            <div class="card-body !z-0">
                <h2 class="card-title">{receipt.name}</h2>
                <p>
                    Purchased: {receipt.printableDate}
                </p>
                <p>
                    Valid until: {receipt.printableUntilDate}
                </p>
                <div class="card-actions justify-end !z-0">
                    <a class="btn btn-primary" href={receipt.downloadUrl}>
                        <Icon data={download} />
                    </a>
                    <button
                        class="btn"
                        on:click={() => {
                            showAnteprima(receipt);
                        }}
                    >
                        <Icon data={eye} />
                    </button>
                </div>
            </div>
        </div>
    {/each}

    <div
        class="opacity-0 z-0 bg-black absolute inset-0 w-screen transition-all duration-300 ease-in-out px-24 overflow-hidden hidden"
        role="button"
        tabindex="-1"
        bind:this={backdrop}
        on:click={removePreview}
        on:keypress={(e) => {
            if (e.key === "Escape") removePreview();
        }}
    >
        <img
            class="opacity-100 relative top-1/2 -translate-y-1/2 max-w-full max-h-full"
            bind:this={anteprima}
            alt="shut"
        />
    </div>
</div>
