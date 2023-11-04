import Pocketbase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new Pocketbase("https://pb_warranty.myapollo.it");
export const currentUser = writable(pb.authStore.model);
pb.autoCancellation(false);

pb.authStore.onChange(async (auth) => {
    console.log("authStore changed", auth);
    currentUser.set(pb.authStore.model);
});
