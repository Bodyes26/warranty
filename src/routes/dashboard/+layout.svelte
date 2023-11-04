<script>
    import { page } from "$app/stores";
    import Icon from "svelte-awesome";
    import home from "svelte-awesome/icons/home";
    import gear from "svelte-awesome/icons/gear";
    import plus from "svelte-awesome/icons/plus";
    $: activeUrl = $page.url.pathname;
</script>

<div class="p-4">
    <slot />
</div>
<div class="btm-nav">
    <a class={activeUrl === "/dashboard" ? "active" : ""} href="/dashboard">
        <Icon data={home} scale="1.5" />
    </a>
    <a
        class={activeUrl === "/dashboard/new" ? "active" : ""}
        href="/dashboard/new"
    >
        <Icon data={plus} scale="1.5" />
    </a>
    <a
        class={activeUrl === "/dashboard/config" ? "active" : ""}
        href="/dashboard/config"
    >
        <Icon data={gear} scale="1.5" />
    </a>
</div>
