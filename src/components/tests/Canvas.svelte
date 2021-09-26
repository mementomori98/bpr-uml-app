<script lang="ts">
    import MouseDriver from "./MouseDriver.svelte";
    import Camera from "./Camera.svelte";
    import {Box} from "./Box";
    import {onMount} from "svelte";
    import BoxDisplay from "./BoxDisplay.svelte";

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

    let boxes = [
        new Box(100, 100, 50, 100),
        new Box(300, 100, 150, 100),
    ];

    let displays = [
        null, null
    ]

    const handleDrag = e => {
        cameraX -= e.detail.dx / zoom;
        cameraY -= e.detail.dy / zoom;
        boxes = boxes;
    };

    const handleScroll = e => {
        if (e.detail > 0) {
            camera.zoomOut(mouseX, mouseY, canvas.offsetWidth, canvas.offsetHeight);
        } else {
            camera.zoomIn(mouseX, mouseY, canvas.offsetWidth, canvas.offsetHeight);
        }
        boxes = boxes;
    }

    const handleElementDrag = (e, b) => {
        b.x += e.detail.dx / zoom;
        b.y += e.detail.dy / zoom;
        boxes = boxes;
    }

    onMount(() => boxes = boxes);

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
    Camera: {cameraX}:{cameraY}<br/>
    Zoom: {zoom} <br/>

    {#each boxes as box, i}
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