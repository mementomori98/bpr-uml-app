<script lang="ts">

    import {CssBuilder} from "./utils/CssBuilder";
    import Button from "./Button.svelte";

    let closed = false;
    let drawerElement: HTMLElement;

    $: drawerClass = new CssBuilder('secondary-drawer__drawer-content')
        .addFeature('closed', closed)
        .build();

</script>

<div style="left: {drawerElement?.offsetLeft}px;top: {drawerElement?.offsetTop};position:absolute;background-color:#ededed;padding:4px 8px;z-index: 20000;cursor:pointer;user-select:none;font-weight:900;font-family:consolas;" on:click={() => closed = !closed}>
    {#if closed}
        &gt;
    {:else}
        &lt;
    {/if}
</div>
<div class="secondary-drawer">
    <div class={drawerClass} bind:this={drawerElement}>
        <slot name="drawer"/>
    </div>
    <div class="secondary-drawer__main-content">
        <slot/>
    </div>
</div>

<style lang="scss">
    @import "theme.scss";

    .secondary-drawer {
        width: 100%;
        height: 100%;
        display: flex;

        &__drawer-content {
            transition-duration: 400ms;
            width: 240px;
            height: calc(100vh - 64px);
            background-color: nth($drawer, 1);
            color: nth($drawer, 2);
            padding-top: 16px;
            box-shadow: $shadow-medium;

            &--closed {
                margin-left: -240px;
            }
        }

        &__main-content {
            flex: 1;
        }
    }

</style>