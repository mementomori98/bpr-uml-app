<script lang="ts">

    import {ClassDiagramRepresentation} from "../../../../services/diagrams/Representations";
    import DisplayFrame from "./DisplayFrame.svelte";

    export let representation: ClassDiagramRepresentation;
    export let dragX: number;
    export let dragY: number;
    export let screenCoords;
    export let element = null;
    export let zoom: number;

</script>

<DisplayFrame representation={representation} dragX={dragX} dragY={dragY} screenCoords={screenCoords} zoom={zoom} bind:element>
    <div class="class">
        <div class="class__header">
            {representation.name}</div>
        <div class="class__fields">
            {#each representation.fields as field}
                <div class="class__field">
                    {field}
                </div>
            {/each}
        </div>
        <div class="class__methods">
            {#each representation.methods as method}
                <div class="class__method">
                    {method}
                </div>
            {/each}
        </div>
    </div>

</DisplayFrame>

<style lang="scss">
    @import "../../../theme";


    .class {

        border: 1px solid black;
        background-color: #f5eec4;

        &__header {
            border-bottom: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px 0;
        }

        &__fields {
            border-bottom: 1px solid black;
            padding: 8px;
        }

        &__methods {
            padding: 8px;
        }
    }
</style>