<script lang="ts">

    import {BoxRepresentation, ClassDiagramRepresentation, Representation} from "../Representations";
    import BoxDisplay from "./BoxDisplay.svelte";
    import MouseDriver from "../MouseDriver.svelte";
    import Camera from "../Camera.svelte";
    import {DiagramHandler} from "../DiagramHandler";
    import ClassDisplay from "./ClassDisplay.svelte";

    export let representation: Representation<any>;
    export let camera: Camera;
    export let diagramHandler: DiagramHandler

    let dragX: number = 0;
    let dragY: number = 0;
    let element: HTMLElement;

    $: screenCoords = camera.screenCoords;
    $: zoom = camera.zoom;
    $: type = representation.constructor.name;

    const handleElementDrag = (e, b) => {
        dragX += e.detail.dx / camera.zoom;
        dragY += e.detail.dy / camera.zoom;
        representation = representation;
    }

    const handleElementDragEnd = () => {
        if (dragX == 0 && dragY == 0)
            return;

        diagramHandler.move(
            representation.id,
            representation.x + dragX,
            representation.y + dragY)
        dragX = 0;
        dragY = 0;
        diagramHandler = diagramHandler;
    }

</script>

{#if type === BoxRepresentation.name}
    <BoxDisplay representation={representation} screenCoords={screenCoords} bind:zoom bind:dragX={dragX} bind:dragY={dragY} bind:element/>
{:else if type === ClassDiagramRepresentation.name}
    <ClassDisplay representation={representation} screenCoords={screenCoords} bind:zoom bind:dragX={dragX} bind:dragY={dragY} bind:element/>
{/if}

<MouseDriver
        target={element}
        on:drag={e => handleElementDrag(e, element)}
        on:dragend={e => handleElementDragEnd()}/>

<style lang="scss">
    @import "../../../ui/theme";

    .display {

    }

</style>