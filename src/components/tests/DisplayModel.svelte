<script lang="ts">
    import {Box} from "./Box";
    export let box: Box
    export let cameraX : number
    export let cameraY : number
    export let zoom : number

    let isDragging: boolean = false;
    let mouseX: number;
    let mouseY: number;


    const diagramToScreen = function (box: Box) {
        box = box;
        return [(box.x - cameraX) * zoom, (box.y - cameraY) * zoom, box.width * zoom, box.height * zoom];
    }

    const handleMouseDown = function (e: MouseEvent) {
        e.stopPropagation()
        isDragging = true;
        console.log("box")
        mouseX = e.x;
        mouseY = e.y;

    }
    const handleMouseMove = function (e: MouseEvent) {
        if(isDragging){
            console.log(e.x)
            let x = e.x - mouseX ;
            let y = e.y - mouseY;
            mouseX = e.x;
            mouseY = e.y;
            box.x += x / zoom;
            box.y += y / zoom;
        }
    }

    $: model = function (box: Box) {
        return `
         left: ${diagramToScreen(box)[0]}px;
         top: ${diagramToScreen(box)[1]}px;
         width: ${diagramToScreen(box)[2]}px;
         height: ${diagramToScreen(box)[3]}px;`
         }
</script>
<div
   style="{model(box)}"
   class="model"
    on:mousedown={handleMouseDown}
   on:mousemove={handleMouseMove}
   on:mouseup={() => isDragging = false}
   on:mouseleave={() => isDragging = false}>

</div>

<style lang="scss">
  .model {
    background-color: red;
    position:absolute;
    cursor: default;
  }
</style>