<script lang="ts">
    import MouseDriver from "./MouseDriver.svelte";
    import Camera from "./Camera.svelte";
    import {onMount} from "svelte";
    import BoxDisplay from "./BoxDisplay.svelte";
    import {Box} from "./Box";
    import {Diagram} from "./Diagram";

    export let diagram: Diagram;

    let mouseX: number;
    let mouseY: number;

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
        diagram.move(b.id, b.x + e.detail.dx / zoom, b.y + e.detail.dy / zoom);
        diagram = diagram;
    }

    const handleElementDragEnd = () => {

    }

    onMount(() => diagram = diagram);

</script>

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
    {#each diagram.elements as box, i}
        <BoxDisplay box={box} screenCoords={camera.screenCoords} bind:element={displays[i]}/>
        <MouseDriver
                target={displays[i]}
                on:scroll={handleScroll}
                on:drag={e => handleElementDrag(e, box)}/>
    {/each}
</div>

<style lang="scss">
    @import "../theme.scss";
</style>