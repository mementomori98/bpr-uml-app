<script lang="ts">
    import MouseDriver from "./MouseDriver.svelte";
    import Camera from "./Camera.svelte";
    import {onMount} from "svelte";
    import BoxDisplay from "./BoxDisplay.svelte";
    import {Box} from "./Box";
    import {Diagram} from "./Diagram";
    import Dialog from "../ui/Dialog.svelte";
    import View from "../ui/View.svelte";
    import Button from "../ui/Button.svelte";
    import {Colors} from "../ui/Colors";

    export let diagram: Diagram;
    let activeId: number = null;

    let errorVisible: boolean = false;

    let mouseX: number;
    let mouseY: number;

    let dragX: number = 0;
    let dragY: number = 0;

    let camera = {
        screenCoords: (n1, n2) => [0, 0],
        zoomOut: (n1, n2, n3, n4) => null,
        zoomIn: (n1, n2, n3, n4) => null
    };
    let cameraX: number;
    let cameraY: number;
    let zoom: number;

    let canvas: HTMLDivElement;

    let displays = [
        null, null
    ]

    const handleDrag = e => {
        cameraX -= e.detail.dx / zoom;
        cameraY -= e.detail.dy / zoom;
        diagram = diagram
    };

    const handleScroll = e => {
        if (e.detail > 0) {
            camera.zoomOut(mouseX, mouseY, canvas.offsetWidth, canvas.offsetHeight);
        } else {
            camera.zoomIn(mouseX, mouseY, canvas.offsetWidth, canvas.offsetHeight);
        }
        diagram = diagram;
    }

    const handleElementDrag = (e, b) => {
        if (activeId == null)
            activeId = b.id;
        dragX += e.detail.dx / zoom;
        dragY += e.detail.dy / zoom;
        diagram = diagram;
    }

    const handleElementDragEnd = () => {
        if (dragX == 0 && dragY == 0)
            {return;}
        if (!diagram.move(
            activeId,
            diagram.elements.find(e => e.id == activeId).x + dragX,
            diagram.elements.find(e => e.id == activeId).y + dragY)) {
            errorVisible = true;
        }
        dragX = 0;
        dragY = 0;
        activeId = null;
        diagram = diagram;
    }

    onMount(() => diagram = diagram);

</script>

<Dialog bind:visible={errorVisible}>
    <View>
        <svelte:fragment slot="header">Conflict</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        An error occurred, your changes were not applied.
        <svelte:fragment slot="actions">
            <Button on:click={() => errorVisible = false} color={Colors.Red}>Close</Button>
        </svelte:fragment>
    </View>
</Dialog>

<MouseDriver
        bind:mouseX
        bind:mouseY
        target={canvas}
        on:drag={handleDrag}
        on:scroll={handleScroll}/>

<Camera
        bind:this={camera}
        bind:cameraX
        bind:cameraY
        bind:zoom/>

<div bind:this={canvas} style="user-select: none;height: 100%;position: relative; overflow: hidden;">
    {#each diagram.elements as box, i (box.id)}
        {#if box.id == activeId}
            <BoxDisplay box={new Box(box.x + dragX, box.y + dragY, box.width, box.height, box.id)} screenCoords={camera.screenCoords} bind:element={displays[i]}/>
        {:else}
            <BoxDisplay box={box} screenCoords={camera.screenCoords} bind:element={displays[i]}/>
        {/if}

        <MouseDriver
                target={displays[i]}
                on:scroll={handleScroll}
                on:drag={e => handleElementDrag(e, box)}
                on:dragend={e => handleElementDragEnd()}/>
    {/each}
</div>

<style lang="scss">
    @import "../theme.scss";
</style>