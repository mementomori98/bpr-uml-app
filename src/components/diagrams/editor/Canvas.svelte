<script lang="ts">
    import MouseDriver from "./MouseDriver.svelte";
    import Camera from "./Camera.svelte";
    import DisplayDispatcher from "./DisplayDispatcher.svelte";
    import ContextMenu from "../../../ui/ContextMenu.svelte";
    import Option from "../../../ui/Option.svelte";
    import getService from "../../utils/ServiceFactory";
    import {Snackbar} from "../../utils/Snackbar";
    import {getContext, setContext} from "svelte";
    import {createDiagramStore, key as diagramKey} from "./diagramStore";
    import {key as registerKey, CallbackRegister} from "./callbackRegister";
    import DialogRouter from "./DialogRouter.svelte";

    const snackbar = getService(Snackbar);
    const getStore = getContext(diagramKey);

    $: diagramStore = getStore();

    const inputRegister = new CallbackRegister();
    setContext(registerKey, inputRegister);

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
    setContext('canvas', () => canvas);

    let contextX: number;
    let contextY: number;
    let contextMenuVisible: boolean;
    let resultX;
    let resultY;

    const handleDrag = e => {
        cameraX -= e.detail.dx / zoom;
        cameraY -= e.detail.dy / zoom;
        camera = camera;
    };

    const handleScroll = e => {
        if (e.detail > 0) {
            camera.zoomOut(mouseX, mouseY, canvas.offsetWidth, canvas.offsetHeight);
        } else {
            camera.zoomIn(mouseX, mouseY, canvas.offsetWidth, canvas.offsetHeight);
        }
        camera = camera;
    }

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        contextX = e.x;
        contextY = e.y;
        resultX = e.offsetX;
        resultY = e.offsetY;
        contextMenuVisible = true;
    }


</script>


<MouseDriver
        bind:mouseX
        bind:mouseY
        target={canvas}
        on:drag={handleDrag}/>
<MouseDriver
        on:scroll={handleScroll}/>

<Camera
        bind:this={camera}
        bind:cameraX
        bind:cameraY
        bind:zoom/>

<div bind:this={canvas} style="user-select: none;height: 100%;position: relative; overflow: hidden;" on:contextmenu={handleContextMenu}>
    <slot/>
    {#each $diagramStore.representations as r, i (r._id)}
        <DisplayDispatcher representation={r} camera={camera}/>
    {/each}
</div>

<ContextMenu
        bind:visible={contextMenuVisible}
        left={contextX}
        top={contextY}>
    <Option on:click={() => inputRegister.raise('create_box', {x: camera.realCoords(resultX, resultY)[0], y: camera.realCoords(resultX, resultY)[1]})}>Create Box</Option>
    <Option on:click={() => inputRegister.raise('create_class', {x: camera.realCoords(resultX, resultY)[0], y: camera.realCoords(resultX, resultY)[1]})}>Create Class</Option>
</ContextMenu>

<DialogRouter/>

<style lang="scss">
    @import "../../../ui/theme";
</style>
