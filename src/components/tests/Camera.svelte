<script lang="ts">

    export let cameraX: number = 0;
    export let cameraY: number = 0;
    export let zoom: number = 1;

    export const realCoords = (screenX: number, screenY: number) => {
        return [screenX / zoom + cameraX, screenY / zoom + cameraY]
    }

    export const screenCoords = (realX: number, realY: number) => {
        return [(realX - cameraX) * zoom, (realY - cameraY) * zoom];
    }

    export const zoomIn = (mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) => {
        let x = (canvasWidth - canvasWidth / 1.1) / zoom * (mouseX / canvasWidth);
        let y = (canvasHeight - canvasHeight / 1.1) / zoom * (mouseY / canvasHeight);
        cameraX += x;
        cameraY += y;
        zoom *= 1.1;
    }

    export const zoomOut = (mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) => {
        let x = (canvasWidth - canvasWidth * 1.1) / zoom * (mouseX / canvasWidth);
        let y = (canvasHeight - canvasHeight * 1.1) / zoom * (mouseY / canvasHeight);
        cameraX += x;
        cameraY += y;
        zoom /= 1.1;
    }

</script>


<style lang="scss">
    @import "../theme.scss";

</style>