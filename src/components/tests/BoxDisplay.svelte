<script lang="ts">
    import {Box} from "./Box";

    export let box: Box;
    export let screenCoords;
    export let element;

    const style = (box: Box) => {
        return `
        left: ${screenCoords(box.x, box.y)[0]}px;
        top: ${screenCoords(box.x, box.y)[1]}px;
        width: ${screenCoords(box.x + box.width, box.y + box.height)[0] - screenCoords(box.x, box.y)[0]}px;
        height: ${screenCoords(box.x + box.width, box.y + box.height)[1] - screenCoords(box.x, box.y)[1]}px;`;
    }
</script>

<div class="box-display" style={style(box)} bind:this={element}>
</div>

<style lang="scss">
    @import "../theme.scss";

    .box-display {
        position: absolute;
        background-color: #d9cfa9;
        border: 1px solid #000000;
    }
</style>