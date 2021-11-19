<script lang="ts">

    import Icon from "../../../ui/Icon.svelte";
    import TextButton from "../../../ui/TextButton.svelte";

    export let representation;
    export let dragX: number;
    export let dragY: number;
    export let screenCoords;
    export let element = null;
    export let zoom: number;

    $: style = `
        left: ${screenCoords(representation.x + dragX, representation.y + dragY)[0]}px;
        top: ${screenCoords(representation.x + dragX, representation.y + dragY)[1]}px;
        transform: scale(${zoom});`;

    $: contentStyle = `
        width: ${representation.w}px;
        height: ${representation.h}px;`;

</script>

<div class="display-frame" style={style}>
    <div class="display-frame__toolbar">
        <TextButton noPadding><Icon icon="edit"/></TextButton>
        <Icon icon="open_with" cursor="all-scroll" bind:element/>
    </div>
    <div class="display-frame__content" style={contentStyle}>
        <slot/>
    </div>
</div>

<style lang="scss">
    @import "../../../ui/theme";

    .display-frame {
        position: absolute;
        background-color: transparent;
        color: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform-origin: top left;

        &:hover {
            color: #8f8f8f;
        }

        &__toolbar {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        &__content {
            padding: 1px;
            background-color: white;
            color: black;
            display: flex;
        }
    }

    :global(.display-frame__content > *) {
        width: 100%;
        height: 100%;
    }
</style>