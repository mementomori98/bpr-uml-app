<script lang="ts">

    import {BoxRepresentation} from "../../services/diagrams/Representations";

    export let box: BoxRepresentation;
    export let dragX: number;
    export let dragY: number;
    export let screenCoords;
    export let element;

    const style = (box: BoxRepresentation) => {
        return `
        left: ${screenCoords(box.x + dragX, box.y + dragY)[0]}px;
        top: ${screenCoords(box.x + dragX, box.y + dragY)[1]}px;
        width: ${screenCoords(box.x + dragX + box.w, box.y + dragY + box.h)[0] - screenCoords(box.x + dragX, box.y + dragY)[0]}px;
        height: ${screenCoords(box.x + dragX + box.w, box.y + dragY + box.h)[1] - screenCoords(box.x + dragX, box.y + dragY)[1]}px;`;
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

        &:hover {
            box-shadow: $shadow-medium;
        }
    }
</style>