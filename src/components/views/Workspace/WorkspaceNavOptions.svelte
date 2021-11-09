<script lang="ts">

    import {Workspace} from "../../../services/Workspaces/Models";
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import {goto} from "@roxi/routify";
    import getService from "../../../services/Services";
    import {WorkspaceService} from "../../../services/Workspaces/WorkspaceService";
    import {createEventDispatcher, onMount} from "svelte";
    import {AppContext} from "../../../services/utils/AppContext";

    const workspaceService = getService(WorkspaceService);
    const appContext = getService(AppContext);
    const dispatch = createEventDispatcher()

    let workspaces = [];

    onMount(async () => {
        const res = await workspaceService.get();
        workspaces = res.sort((u1, u2) => u1.name.localeCompare(u2.name));
    })

</script>

{#each workspaces as workspace}
    <ListRow on:click={() => dispatch('switch', {workspaceId: workspace._id})} noBorder={workspace === workspaces[workspaces.length-1]}> <!-- TODO set workspace by the decision -->
        <ListRowItem widthInPercentage={100}>{workspace.name}</ListRowItem>
    </ListRow>
{/each}

<style lang="scss">
  @import "../../theme.scss";

</style>
