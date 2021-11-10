<script lang="ts">
    import {params} from "@roxi/routify";
    import DiagramEditor from "../components/diagrams/editor/DiagramEditor.svelte";
</script>

<DiagramEditor diagramId={$params.id}/>

<style lang="scss">
    @import "../ui/theme";

</style>