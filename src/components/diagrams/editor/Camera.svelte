<svelte:options accessors={true}/>

<script lang="ts">

    import {writable} from "svelte/store";

    export let cameraX: number = 0;
    export let cameraY: number = 0;
    export let zoom: number = 1;

    const store = writable({
        cameraX: cameraX,
        cameraY: cameraY,
        zoom: zoom
    });

    $: store.update(c => {
       c.cameraX = cameraX;
       c.cameraY = cameraY;
       c.zoom = zoom;
       return c;
    });

    export const cameraStore = {subscribe: store.subscribe};

    export const realCoords = (screenX: number, screenY: number) => {
        return [screenX / zoom + cameraX, screenY / zoom + cameraY]
    }

    export let screenCoords = (realX: number, realY: number) => {
        return [(realX - cameraX) * zoom, (realY - cameraY) * zoom];
    }

    export const zoomIn = (mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) => {
        if (zoom * 1.1 > 3)
            return;
        let x = (canvasWidth - canvasWidth / 1.1) / zoom * (mouseX / canvasWidth);
        let y = (canvasHeight - canvasHeight / 1.1) / zoom * (mouseY / canvasHeight);
        cameraX += x;
        cameraY += y;
        zoom *= 1.1;
    }

    export const zoomOut = (mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) => {
        if (zoom / 1.1 < 0.4)
            return;
        let x = (canvasWidth - canvasWidth * 1.1) / zoom * (mouseX / canvasWidth);
        let y = (canvasHeight - canvasHeight * 1.1) / zoom * (mouseY / canvasHeight);
        cameraX += x;
        cameraY += y;
        zoom /= 1.1;
    }

    export const getZoom = () => {
        return zoom;
    };

</script>

<style lang="scss">
    @import "../../../ui/theme";

</style>