<script>
    import { pb, currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";

    import { onMount } from "svelte";
    import download from "svelte-awesome/icons/download";
    import Icon from "svelte-awesome";
    import eye from "svelte-awesome/icons/eye";

    let receipts = [];
    onMount(async () => {
        if ($currentUser === null || $currentUser === undefined) goto("/login");
        if ($currentUser.id === null || $currentUser.id === undefined)
            goto("/login");

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
</script>

<h1 class="text-5xl font-bold">Warranty dashboard</h1>
<h2 class="text-3xl">Latest receipts</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each receipts as receipt}
        <div class="card w-fit bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">{receipt.name}</h2>
                <p>
                    Purchased: {receipt.printableDate}
                </p>
                <p>
                    Valid until: {receipt.printableUntilDate}
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">
                        <Icon data={download} />
                    </button>
                    <button class="btn">
                        <Icon data={eye} />
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>
