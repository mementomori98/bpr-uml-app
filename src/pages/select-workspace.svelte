<script>
    import {goto} from "@roxi/routify";
    import SelectWorkspaceView from "../components/views/Workspace/SelectWorkspaceView.svelte";
</script>

<SelectWorkspaceView on:choice={() => $goto('/')}/>