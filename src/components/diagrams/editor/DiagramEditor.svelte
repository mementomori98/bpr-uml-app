<script lang="ts">

    import {key, createDiagramStore} from "./diagramStore";
    import {setContext} from "svelte";
    import Canvas from "./Canvas.svelte";

    export let diagramId: string;

    const diagramStore = createDiagramStore(diagramId);

    const getStore = () => diagramStore;
    setContext(key, getStore);

</script>


<Canvas />


<style lang="scss">

</style>