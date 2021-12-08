<script lang="ts">
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import {goto} from "@roxi/routify";
    import getService from "../utils/ServiceFactory";
    import {WorkspaceService} from "./WorkspaceService";
    import {createEventDispatcher, onMount} from "svelte";
    import {AppContext} from "../utils/AppContext";
    import Option from "../../ui/Option.svelte";
    import Divider from "../../ui/Divider.svelte";

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
    <ListRow on:click={() => dispatch('switch', {workspaceId: workspace._id})} noBorder={workspace === workspaces[workspaces.length-1]} style="padding: 14px 16px">
        <ListRowItem widthInPercentage={100}>{workspace.name}</ListRowItem>
    </ListRow>
{/each}
<Divider noPadding/>
<Option style="background-color: rgba(247,247,247,0.64)" on:click={$goto('/create-workspace')}>Create WS</Option>

<style lang="scss">
  @import "../../ui/theme";

</style>
