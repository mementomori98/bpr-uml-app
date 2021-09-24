<script lang="ts">
    import {CssBuilder} from "./CssBuilder";
    import Button from "./Button.svelte";

    let drawerOpen = true;


    $: drawerClass = new CssBuilder('drawer-layout__drawer')
        .addFeature('closed', !drawerOpen)
        .build();
</script>

<div class="drawer-layout">
    <div class={drawerClass}>
        <div class="drawer-layout__logo">Logo</div>
        <slot name="drawer"/>
    </div>
    <div class="drawer-layout__appbar-wrapper">
        <div class="drawer-layout__appbar">
            <Button on:click={() => drawerOpen = !drawerOpen}>---</Button>
            <slot name="appbar"/>
        </div>
        <div class="drawer-layout__content">
            <slot/>
        </div>
    </div>
</div>

<style lang="scss">
    @import "../theme.scss";

    .drawer-layout {
        width: 100vw;
        height: 100vh;
        display: flex;

        &__logo {
            font: $font-title;
            height: 44px;
            width: 100%;
            padding-right: 24px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin-bottom: 24px;
        }

        &__drawer {
            box-sizing: border-box;
            width: 240px;
            padding: 16px 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            z-index: 501;
            box-shadow: 0 52px 5px 1px rgba(0, 0, 0, .2);
            background-color: #e0e0e0;
            transition-duration: 400ms;

            &--closed {
                margin-left: -240px;
            }
        }

        &__appbar-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        &__appbar {
            height: 64px;
            padding: 8px;
            display: flex;
            align-items: center;
            box-shadow: 2px 0 5px 1px rgba(0, 0, 0, .2);
            z-index: 500;
            position: relative;
            background-color: #307186;
            color: white;
        }

        &__content {
            flex: 1;
        }
    }
</style>