<script lang="ts">

    import {Representation} from "../../services/diagrams/Representations";
    import BoxDisplay from "./BoxDisplay.svelte";

    export let representation: Representation<any>;
    export let screenCoords: (x: number, y: number) => [number, number];
    export let dragX: number;
    export let dragY: number;
    export let element: HTMLElement;

</script>

<BoxDisplay box={representation} screenCoords={screenCoords} dragX={dragX} dragY={dragY} bind:element/>

<style lang="scss">
    @import "../theme.scss";

</style>