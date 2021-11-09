<script lang="ts">
    import Canvas from "../../tests/Canvas.svelte";
    import {DiagramHandler} from "../../../services/diagrams/DiagramHandler";
    import Button from "../../ui/Button.svelte";
    import getService from "../../../services/Services";
    import {Snackbar} from "../../../services/utils/Snackbar";
    import {Colors} from "../../ui/utils/Colors";

    export let diagramId: string;
    let diagram = new DiagramHandler();
    let snackbar = getService(Snackbar);
</script>

<Canvas diagramHandler={diagram}/>

<style lang="scss">
    @import "../../theme.scss";

</style>