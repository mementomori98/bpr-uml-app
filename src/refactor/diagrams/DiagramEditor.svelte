<script lang="ts">
    import Canvas from "./Canvas.svelte";
    import {DiagramHandler} from "./DiagramHandler";
    import Button from "../../components/ui/Button.svelte";
    import getService from "../utils/Services";
    import {Snackbar} from "../utils/Snackbar";
    import {Colors} from "../../components/utils/Colors";

    export let diagramId: string;
    let diagram = new DiagramHandler();
    let snackbar = getService(Snackbar);
</script>

<Canvas diagramHandler={diagram}/>

<style lang="scss">
    @import "../../components/theme";

</style>