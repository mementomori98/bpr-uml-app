<script lang="ts">

    import BoxDisplay from "../boxes/BoxDisplay.svelte";
    import MouseDriver from "./MouseDriver.svelte";
    import Camera from "./Camera.svelte";
    import ClassDisplay from "../classes/ClassDisplay.svelte";
    import DisplayFrame from "./DisplayFrame.svelte";
    import {getContext} from "svelte";
    import {key} from "./diagramStore";

    export let representation;
    export let camera: Camera;

    let dragX: number = 0;
    let dragY: number = 0;
    let element: HTMLElement;

    const getStore = getContext(key);
    $: diagramStore = getStore();

    $: screenCoords = camera.screenCoords;
    $: zoom = camera.zoom;
    $: type = representation.model.type;

    const handleElementDrag = (e, b) => {
        dragX += e.detail.dx / camera.zoom;
        dragY += e.detail.dy / camera.zoom;
        representation = representation;
    }

    const handleElementDragEnd = () => {
        if (dragX == 0 && dragY == 0)
            return;

        diagramStore.updateRepresentation({
            _id: representation._id,
            x: representation.x + dragX,
            y: representation.y + dragY,
            w: representation.w,
            h: representation.h,
        });
        // diagramHandler.move(
        //     representation._id,
        //     representation.x + dragX,
        //     representation.y + dragY)
        dragX = 0;
        dragY = 0;
    }

</script>

<DisplayFrame representation={representation} dragX={dragX} dragY={dragY} screenCoords={screenCoords} zoom={zoom} bind:element>
    {#if type === 'textBox'}
        <BoxDisplay {representation}/>
    {:else if type === 'class'}
        <ClassDisplay {representation}/>
    {/if}
</DisplayFrame>

<MouseDriver
        target={element}
        on:drag={e => handleElementDrag(e, element)}
        on:dragend={e => handleElementDragEnd()}/>

<style lang="scss">
    @import "../../../ui/theme";

    .display {

    }

</style>