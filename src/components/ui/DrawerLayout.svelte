<script lang="ts">
    import {CssBuilder} from "./utils/CssBuilder";
    import Button from "./Button.svelte";
    import Icon from "./Icon.svelte";
    import {Colors} from "./utils/Colors";
    import TextButton from "./TextButton.svelte";

    let drawerOpen = true;


    $: drawerClass = new CssBuilder('drawer')
        .addFeature('closed', !drawerOpen)
        .build();

    $: appbarClass = new CssBuilder('appbar-wrapper')
        .addFeature('closed', !drawerOpen)
        .build();

    $:appbarCls = new CssBuilder('appbar')
        .addFeature('closed', !drawerOpen)
        .build();

</script>

<div class={drawerClass}>
    <div class="drawer__logo">Logo</div>
    <slot name="drawer"/>
</div>
<div class={appbarClass}>
    <div class={appbarCls}>
        <TextButton on:click={() => drawerOpen = !drawerOpen}>
            <Icon icon="menu" size="14"/>
        </TextButton>
        <slot name="appbar"/>
    </div>
    <div class="content">
        <slot/>
    </div>
</div>

<style lang="scss">
    @import "../theme.scss";


    .drawer {
        position: fixed;
        top: 0;
        width: 240px;
        height: 100%;
        padding: 16px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        z-index: 501;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, .2);
        background-color: nth($drawer, 1);
        transition-duration: 400ms;
        color: nth($drawer, 2);

        &--closed {
            margin-left: -240px;
        }

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
    }

    .appbar-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-left: 240px;
        transition-duration: 400ms;

        &--closed {
            margin-left: 0;
        }
    }

    .appbar {
        height: 64px;
        padding: 8px;
        display: flex;
        align-items: center;
        box-shadow: 2px 0 6px 3px rgba(0, 0, 0, .2);
        z-index: 500;
        position: fixed;
        background-color: #e8e8e8;
        color: black;
        width: calc(100% - 240px);
        transition-duration: 400ms;

        &--closed {
            width: 100%;
        }
    }

    .content {
        flex: 1;
        margin-top: 64px;
    }
</style>