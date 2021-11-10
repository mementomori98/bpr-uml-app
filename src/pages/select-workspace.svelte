<script>
    import {goto} from "@roxi/routify";
    import SelectWorkspaceView from "../components/workspaces/SelectWorkspaceView.svelte";
</script>

<SelectWorkspaceView on:choice={() => $goto('/')}/>