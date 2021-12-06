<script lang="ts">

    import Icon from "../../../ui/Icon.svelte";
    import TextButton from "../../../ui/TextButton.svelte";
    import {getContext, onDestroy, onMount} from "svelte";
    import {key} from "./callbackRegister";
    import ContextMenu from "../../../ui/ContextMenu.svelte";
    import Option from "../../../ui/Option.svelte";
    import Line from "../../utils/Line.svelte";
    import {key as associationKey} from './associationStore';
    import {key as diagramKey} from './diagramStore';

    export let representation;
    export let dragX: number;
    export let dragY: number;
    export let screenCoords;
    export let element = null;
    export let zoom: number;

    const inputRegister = getContext(key);
    const diagramStore = getContext(diagramKey)();

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
    const associationStore = getContext(associationKey);
    const getCameraStore = getContext('camera');

    let content;

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

    const addAssociation = () => {
        const coords = screenCoords(representation.x + representation.w / 2, representation.y + representation.h / 2 + 32);
        lineX = coords[0];
        lineY = coords[1];
        drawLine = true;
        getCanvas().addEventListener('mousedown', down);
        associationStore.setSource(representation.modelId);
        associationStore.setType('association');
        associationStore.setRepresentationId(representation._id);
        getCanvas().addEventListener('mouseup', canvasMouseUp);
    }

    const move = e => {
        [mx, my] = [e.pageX - getCanvas().offsetLeft, e.pageY - getCanvas().offsetTop];
        lineEndX = mx;
        lineEndY = my;
    }

    const down = e => {
        getCanvas().removeEventListener('mousedown', down);
        drawLine = false;
    }

    const up = e => {
        if (e.button != 0)
            return;
        associationStore.setTarget(representation.modelId);
        getCanvas().removeEventListener('mouseup', canvasMouseUp);
        e.stopPropagation();
    }

    const canvasMouseUp = e => {
        if (associationStore.target == null) {
            associationStore.setSource(null);
            associationStore.setTarget(null);
            associationStore.setType(null);
        }
        getCanvas().removeEventListener('mouseup', canvasMouseUp);
    }

    $: coords = (relationId) => {
        console.log($diagramStore);
        console.log(relationId);
        const source = $diagramStore.representations.find(r => r.model.relations.find(rel => rel._id === relationId) != null).model;
        console.log('hello 2 ');
        const target = $diagramStore.representations.find(r => r.model._id === source.relations.find(rel => rel._id === relationId).target);
        console.log('hello 3');
        return screenCoords(target.x + target.w / 2, target.y + target.h / 2);
    }

    onMount(() => {
        window.addEventListener('mousemove', move);
        content.addEventListener('mouseup', up);

        getCameraStore().subscribe(c => {
            screenCoords = screenCoords;
        });

    });
    onDestroy(() => {
        window.removeEventListener('mousemove', move);
        content.removeEventListener('mouseup', up)
    });

</script>

<div class="display-frame" style={style}>
    <div class="display-frame__toolbar">
        <TextButton noPadding on:click={() => inputRegister.raise('update_' + representation.model.type, representation)}>
            <Icon icon="edit"/>
        </TextButton>
        <Icon icon="open_with" cursor="all-scroll" bind:element/>
    </div>
    <div class="display-frame__content" style={contentStyle} on:contextmenu={context} bind:this={content}>
        <slot/>
    </div>
</div>

{#if drawLine}
    <Line startX={lineX} startY={lineY} endX={lineEndX} endY={lineEndY}/>
{/if}

{#each representation.relations as relation (relation._id)}
    <Line
            startX={screenCoords(representation.x + representation.w / 2, representation.y + representation.h / 2)[0]}
            startY={screenCoords(representation.x + representation.w / 2, representation.y + representation.h / 2)[1]}
            endX={coords(relation.relationId)[0]}
            endY={coords(relation.relationId)[1]}
    />
{/each}

<ContextMenu
        bind:visible={contextVisible}
        left={contextX}
        top={contextY}>
    <Option on:click={addAssociation}>Add Association</Option>
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
        z-index: 3;

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