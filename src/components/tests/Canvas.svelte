<script lang="ts">
    import {Box} from "./Box";
    import DisplayModel from "./DisplayModel.svelte";

    let mouseX: number;
    let mouseY: number;

    let canvasWidth: number;
    let canvasHeight: number;

    let cameraX: number = 0;
    let cameraY: number = 0;
    let zoom: number = 1;

    let isDragging: boolean = false;
    let dragX: number, dragY: number;

    let box: Box = new Box(50, 150, 100, 200);
    let box2: Box = new Box(200, 300, 100, 100);

    const handleMouseMove = function (e: MouseEvent) {
        if(isDragging){
            handleDrag(e)
        }
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }

    const handleDrag = function(e: MouseEvent) {
        dragX = e.offsetX - mouseX
        dragY = e.offsetY - mouseY
        cameraX -= dragX / zoom;
        cameraY -= dragY / zoom;
        box = box;
        box2 = box2;
    }

    const handleScroll = function (e: WheelEvent) {
        if (e.deltaY < 0)
        {
            let x = (canvasWidth - canvasWidth / 1.1) / zoom * (mouseX / canvasWidth);
            let y = (canvasHeight - canvasHeight / 1.1) / zoom * (mouseY / canvasHeight);
            cameraX += (x);
            cameraY += (y);
            zoom *= 1.1;
        }
        else if (e.deltaY > 0) {
            let x = (canvasWidth - canvasWidth * 1.1) / zoom * (mouseX / canvasWidth);
            let y = (canvasHeight - canvasHeight * 1.1) / zoom * (mouseY / canvasHeight);
            cameraX += (x);
            cameraY += (y);
            zoom /= 1.1;
        }
        box = box;
        box2 = box2;
    }
</script>

<div class="canvas"
     bind:clientWidth={canvasWidth}
     bind:clientHeight={canvasHeight}
     on:mousemove={handleMouseMove}
     on:mousedown={() => isDragging = true}
     on:mouseup={() => isDragging = false}
     on:wheel={handleScroll}>
    <div style="user-select: none">
        canvas: {canvasWidth}:{canvasHeight}<br/>
        drag: {dragX}:{dragY}<br/>
        mouse: {mouseX}:{mouseY}<br/>
        zoom: {zoom}<br/>
        Dragging: {isDragging}<br/>
        camera: {cameraX}:{cameraY}<br/>
    </div>


    <DisplayModel box={box} cameraX={cameraX} cameraY={cameraY} zoom={zoom}/>
    <DisplayModel box={box2} cameraX={cameraX} cameraY={cameraY} zoom={zoom}/>

</div>

<style lang="scss">
    .canvas {
        width: 100%;
        height: 100%;
        background-color: #f6f6f1;
        overflow: hidden;
    }
</style>