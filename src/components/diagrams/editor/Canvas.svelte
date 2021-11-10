<script lang="ts">
    import MouseDriver from "./MouseDriver.svelte";
    import Camera from "./Camera.svelte";
    import {onMount} from "svelte";
    import BoxDisplay from "../boxes/BoxDisplay.svelte";
    import {DiagramHandler} from "../utils/DiagramHandler";
    import ContextMenu from "../../../ui/ContextMenu.svelte";
    import Option from "../../../ui/Option.svelte";
    import DisplayDispatcher from "./DisplayDispatcher.svelte";
    import {context} from "@roxi/routify/typings/runtime";
    import {BoxRepresentation} from "../boxes/Models";
    import CanvasContextMenu from "./CanvasContextMenu.svelte";

    export let diagramHandler: DiagramHandler;

    let mouseX: number;
    let mouseY: number;

    let dragX: number = 0;
    let dragY: number = 0;

    let camera = {
        screenCoords: (n1, n2) => [0, 0],
        realCoords: (n1, n2) => [0, 0],
        zoomOut: (n1, n2, n3, n4) => null,
        zoomIn: (n1, n2, n3, n4) => null,
        getZoom: () => 1,
    };
    let cameraX: number;
    let cameraY: number;
    let zoom: number;

    let canvas: HTMLDivElement;

    let contextX: number;
    let contextY: number;
    let contextVisible: boolean;

    const handleDrag = e => {
        cameraX -= e.detail.dx / zoom;
        cameraY -= e.detail.dy / zoom;
        diagramHandler = diagramHandler
    };

    const handleScroll = e => {
        if (e.detail > 0) {
            camera.zoomOut(mouseX, mouseY, canvas.offsetWidth, canvas.offsetHeight);
        } else {
            camera.zoomIn(mouseX, mouseY, canvas.offsetWidth, canvas.offsetHeight);
        }
        diagramHandler = diagramHandler;
        camera = camera;
    }

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        contextX = e.x;
        contextY = e.y;
        contextVisible = true;
    }

    onMount(() => diagramHandler = diagramHandler);

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

<div bind:this={canvas} style="user-select: none;height: 100%;position: relative; overflow: hidden;" on:contextmenu={handleContextMenu}>
    <slot/>
    {#each diagramHandler.elements as element, i (element.id)}
        <DisplayDispatcher representation={element} camera={camera} diagramHandler={diagramHandler} />
    {/each}

    <CanvasContextMenu
        originX={contextX}
        originY={contextY}
        canvasX={canvas?.offsetLeft}
        canvasY={canvas?.offsetTop}
        diagramHandler={diagramHandler}
        realCoords={camera.realCoords}
        bind:visible={contextVisible}
        refreshCallback={() => diagramHandler = diagramHandler}/>
</div>

<style lang="scss">
    @import "../../../ui/theme";
</style>