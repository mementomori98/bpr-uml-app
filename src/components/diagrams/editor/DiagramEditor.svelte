<script lang="ts">

    import {key, createDiagramStore} from "./diagramStore";
    import {setContext} from "svelte";
    import Canvas from "./Canvas.svelte";

    export let diagramId: string;

    const diagramStore = createDiagramStore(diagramId);
    setContext(key, diagramStore);

</script>


<Canvas />


<style lang="scss">

</style>