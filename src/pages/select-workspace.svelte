<script>
    import {goto} from "@roxi/routify";
    import SelectWorkspaceView from "../refactor/workspaces/SelectWorkspaceView.svelte";
</script>

<SelectWorkspaceView on:choice={() => $goto('/')}/>