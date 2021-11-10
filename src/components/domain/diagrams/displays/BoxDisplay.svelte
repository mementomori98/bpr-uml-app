<script lang="ts">

    import {BoxRepresentation} from "../../../../services/diagrams/Representations";
    import DisplayFrame from "./DisplayFrame.svelte";

    export let representation: BoxRepresentation;
    export let dragX: number;
    export let dragY: number;
    export let screenCoords;
    export let element = null;
    export let zoom: number;

</script>

<DisplayFrame representation={representation} dragX={dragX} dragY={dragY} screenCoords={screenCoords} zoom={zoom} bind:element>
    <div class="box">
        {representation.text}
    </div>
</DisplayFrame>

<style lang="scss">
    @import "../../../theme";

    .box {
        background-color: #d9cfa9;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>