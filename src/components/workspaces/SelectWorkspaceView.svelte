<script lang="ts">

    import {createEventDispatcher, onMount} from "svelte";
    import View from "../../ui/View.svelte";
    import Card from "../../ui/Card.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import {Workspace, WorkspaceInvitation} from "./Models";
    import {goto} from "@roxi/routify";
    import Button from "../../ui/Button.svelte";
    import InvitationsList from "../users/InvitationsList.svelte";
    import Text from "../../ui/Text.svelte";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import getService from "../utils/ServiceFactory";
    import {WorkspaceService} from "./WorkspaceService";
    import {AppContext} from "../utils/AppContext";

    const dispatch = createEventDispatcher();

    const workspaceService = getService(WorkspaceService);
    const appContext = getService(AppContext);

    let workspaces = [];

    let invitations: WorkspaceInvitation[] = [
         // new WorkspaceInvitation({name: 'Rome', invitor: 'Nero', id: 1}),
        // new WorkspaceInvitation({name: 'London', invitor: 'Henrik', id: 2}),
        // new WorkspaceInvitation({name: 'Constantinople', invitor: 'Constantine', id: 3}),
    ]

    onMount(async () => {
        const res = await workspaceService.get();
        workspaces = res.sort((u1, u2) => u1.name.localeCompare(u2.name));
//TODO getInvitations

        if(workspaces.length === 0 && invitations.length === 0){
            $goto('/create-workspace')
        }
    })

    const onclick = async (workspace: Workspace) => {
        // if(workspace._id == null){
        //     $goto('/select-workspace')
        //     return;
        // }
        const res = await workspaceService.getById(workspace._id);
        appContext.setWorkspaceId(res._id)
        $goto('/')
    }

</script>

<Wrapper width="480" bgColor="ededed" verticalCentering>
    <Card>
        <View noActions>
            <svelte:fragment slot="header">Select workspace</svelte:fragment>
            <Text noPadding>Your workspaces</Text>
            <ListScrollWrapper>
                {#each workspaces as workspace}
                    <ListRow noBorder={workspace === workspaces[workspaces.length-1]} on:click={() => $goto('/')}> <!-- TODO set workspace by the decision -->
                        <ListRowItem widthInPercentage={100}>{workspace.name}</ListRowItem>
                    </ListRow>
                {/each}
            </ListScrollWrapper>
            {#if invitations.length > 0}
                <InvitationsList maxHeight={150} workspaces={invitations}/>
            {/if}

        </View>
    </Card>
</Wrapper>

<style lang="scss">
  @import "../../ui/theme";

</style>
