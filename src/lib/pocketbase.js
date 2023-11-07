import Pocketbase from "pocketbase";
import { writable } from "svelte/store";
import { PUBLIC_PB_URL } from "$env/static/public";

export const pb = new Pocketbase(PUBLIC_PB_URL);
export const currentUser = writable(pb.authStore.model);
pb.autoCancellation(false);

pb.authStore.onChange(async (auth) => {
    console.log("authStore changed", auth);
    currentUser.set(pb.authStore.model);
});
