<script lang="ts">

    import Icon from "../../../ui/Icon.svelte";
    import TextButton from "../../../ui/TextButton.svelte";
    import {getContext, onDestroy, onMount} from "svelte";
    import {key} from "./callbackRegister";
    import ContextMenu from "../../../ui/ContextMenu.svelte";
    import Option from "../../../ui/Option.svelte";
    import Line from "../../utils/Line.svelte";

    export let representation;
    export let dragX: number;
    export let dragY: number;
    export let screenCoords;
    export let element = null;
    export let zoom: number;
    export let canvas;

    const inputRegister = getContext(key);

    let contextVisible: boolean;
    let contextX;
    let contextY;

    let lineX = 0;
    let lineY = 0;
    let lineEndX = 0;
    let lineEndY = 0;
    let drawLine: boolean;

    let mx, my;

    const getCanvas = getContext('canvas');

    $: style = `
        left: ${screenCoords(representation.x + dragX, representation.y + dragY)[0]}px;
        top: ${screenCoords(representation.x + dragX, representation.y + dragY)[1]}px;
        transform: scale(${zoom});`;

    $: contentStyle = `
        width: ${representation.w}px;
        height: ${representation.h}px;`;

    const context = e => {
        e.preventDefault();
        e.stopPropagation();
        contextX = e.clientX;
        contextY = e.clientY;
        contextVisible = true
    }

    const startLine = () => {
        lineX = mx;
        lineY = my;
        drawLine = true;
        window.addEventListener('mousedown', down);
    }

    const move = e => {
        [mx, my] = [e.pageX - getCanvas().offsetLeft, e.pageY - getCanvas().offsetTop];
        lineEndX = mx;
        lineEndY = my;
    }

    const down = e => {
        window.removeEventListener('mousedown', down);
        drawLine = false;
    }

    onMount(() => window.addEventListener('mousemove', move));
    onDestroy(() => window.removeEventListener('mousemove', move));

</script>

<div class="display-frame" style={style}>
    <div class="display-frame__toolbar">
        <TextButton noPadding on:click={() => inputRegister.raise('update_' + representation.model.type, representation)}>
            <Icon icon="edit"/>
        </TextButton>
        <Icon icon="open_with" cursor="all-scroll" bind:element/>
    </div>
    <div class="display-frame__content" style={contentStyle} on:contextmenu={context}>
        <slot/>
    </div>
</div>

{#if drawLine}
    <Line startX={lineX} startY={lineY} endX={lineEndX} endY={lineEndY}/>
{/if}

<ContextMenu
        bind:visible={contextVisible}
        left={contextX}
        top={contextY}>
    <Option on:click={startLine}>Hello</Option>
</ContextMenu>

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