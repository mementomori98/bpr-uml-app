<script lang="ts">
    import Canvas from "./Canvas.svelte";
    import {DiagramHandler} from "../utils/DiagramHandler";
    import Button from "../../../ui/Button.svelte";
    import getService from "../../utils/ServiceFactory";
    import {Snackbar} from "../../utils/Snackbar";
    import {Colors} from "../../../ui/utils/Colors";

    export let diagramId: string;
    let diagram = new DiagramHandler();
    let snackbar = getService(Snackbar);
</script>

<Canvas diagramHandler={diagram}/>

<style lang="scss">
    @import "../../../ui/theme";

</style>