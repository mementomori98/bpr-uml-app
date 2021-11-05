<script lang="ts">
    import MouseDriver from "./MouseDriver.svelte";
    import Camera from "./Camera.svelte";
    import {onMount} from "svelte";
    import BoxDisplay from "./BoxDisplay.svelte";
    import {DiagramHandler} from "../../services/diagrams/DiagramHandler";
    import {BoxRepresentation, Representation} from "../../services/diagrams/Representations";
    import ContextMenu from "../ui/ContextMenu.svelte";
    import Option from "../ui/Option.svelte";
    import DisplayDispatcher from "./DisplayDispatcher.svelte";

    let id = '8';
    export let diagramHandler: DiagramHandler;
    let activeId: string = null;

    let mouseX: number;
    let mouseY: number;

    let dragX: number = 0;
    let dragY: number = 0;

    let camera = {
        screenCoords: (n1, n2) => [0, 0],
        realCoords: (n1, n2) => [0, 0],
        zoomOut: (n1, n2, n3, n4) => null,
        zoomIn: (n1, n2, n3, n4) => null
    };
    let cameraX: number;
    let cameraY: number;
    let zoom: number;

    let canvas: HTMLDivElement;

    let contextX: number;
    let contextY: number;
    let contextVisible: boolean;
    let contextOffsetX: number;
    let contextOffsetY: number;

    let displays = [
        null, null
    ]

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
    }

    const handleElementDrag = (e, b) => {
        if (activeId == null)
            activeId = b.id;
        dragX += e.detail.dx / zoom;
        dragY += e.detail.dy / zoom;
        diagramHandler = diagramHandler;
    }

    const handleElementDragEnd = () => {
        if (dragX == 0 && dragY == 0)
            return;

        diagramHandler.move(
            activeId,
            diagramHandler.elements.find(e => e.id == activeId).x + dragX,
            diagramHandler.elements.find(e => e.id == activeId).y + dragY)
        dragX = 0;
        dragY = 0;
        activeId = null;
        diagramHandler = diagramHandler;
    }

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        contextX = e.x;
        contextY = e.y;
        contextVisible = true;
        contextOffsetX = e.offsetX;
        contextOffsetY = e.offsetY;
    }

    const handleCreateModel = () => {
        let coords = camera.realCoords(contextOffsetX, contextOffsetY);
        diagramHandler.elements.push(new BoxRepresentation({id: (id = id + 1), x: coords[0], y: coords[1], w: 100, h: 100}));
        diagramHandler = diagramHandler;
    }

    const getDragX = (element: Representation<any>) => {
        if (element.id == activeId)
            return dragX;
        return 0;
    };

    const getDragY = (element: Representation<any>) => {
        if (element.id == activeId)
            return dragY;
        return 0;
    };

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
    <div>{contextX}:{contextY}-{contextVisible}</div>
    <slot/>
    {#each diagramHandler.elements as element, i (element.id)}
        <DisplayDispatcher representation={element} screenCoords={camera.screenCoords} bind:element={displays[i]} dragX={getDragX(element)} dragY={getDragY(element)}/>
        <MouseDriver
                target={displays[i]}
                on:scroll={handleScroll}
                on:drag={e => handleElementDrag(e, element)}
                on:dragend={e => handleElementDragEnd()}/>
    {/each}

    <ContextMenu
    bind:left={contextX}
    bind:top={contextY}
    bind:visible={contextVisible}>
        <Option on:click={handleCreateModel}>Create Model</Option>
    </ContextMenu>
</div>

<style lang="scss">
    @import "../theme.scss";
</style>