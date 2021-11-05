<script lang="ts">

    import {createEventDispatcher, onMount} from "svelte";
    import View from "../../ui/View.svelte";
    import Card from "../../ui/Card.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import {CreateWorkspaceRequest, Workspace} from "../../../services/Workspaces/Models";
    import {goto} from "@roxi/routify";
    import Button from "../../ui/Button.svelte";
    import getService from "../../../services/Services";
    import {WorkspaceService} from "../../../services/Workspaces/WorkspaceService";
    import {AppContext} from "../../../services/utils/AppContext";

    const dispatch = createEventDispatcher();

    const workspaceService = getService(WorkspaceService);
    const appContext = getService(AppContext);

    let workspaces = [];

    onMount(async () => {
        const res = await workspaceService.get();
        workspaces = res.sort((u1, u2) => u1.name.localeCompare(u2.name));

    })

    const onclick = async (workspace: Workspace) => {
        const res = await workspaceService.getById(workspace._id);
        appContext.setWorkspaceId(res._id)
        $goto('/')
    }



</script>

<Wrapper width="480" bgColor="ededed" verticalCentering>
    <Card>
        <View>
            <svelte:fragment slot="header">Select workspace</svelte:fragment>
            {#each workspaces as workspace}
                <ListRow on:click={() => onclick(workspace)}> <!-- TODO set workspace by the decision -->
                    <ListRowItem widthInPercentage={100}>{workspace.name}</ListRowItem>
                </ListRow>
            {/each}
        </View>
    </Card>
</Wrapper>

<style lang="scss">
  @import "../../theme.scss";

</style>