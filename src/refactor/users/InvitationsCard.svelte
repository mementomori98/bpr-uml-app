<script lang="ts">
    import Wrapper from "../../components/ui/Wrapper.svelte";
    import Card from "../../components/ui/Card.svelte";
    import View from "../../components/ui/View.svelte";
    import ListRow from "../../components/ui/ListRow.svelte";
    import ListRowItem from "../../components/ui/ListRowItem.svelte";
    import Button from "../../components/ui/Button.svelte";
    import {JoinWorkspaceRequest, WorkspaceInvitation} from "../workspaces/Models";
    import {Colors} from "../../components/utils/Colors";
    import ListScrollWrapper from "../../components/ui/ListScrollWrapper.svelte";
    import getService from "../utils/Services";
    import {WorkspaceService} from "../workspaces/WorkspaceService";

    const workspaceService = getService(WorkspaceService);

    let workspaces = [
        new WorkspaceInvitation({name: 'Rome', invitor: 'Nero', id: 1}),
        new WorkspaceInvitation({name: 'London', invitor: 'Henrik', id: 1}),
        new WorkspaceInvitation({name: 'Constantinople', invitor: 'Constantine', id: 1}),
    ]

    const onAcceptInvitation = async (workspace: WorkspaceInvitation) => {
        alert("Accept invitation to " + workspace.name)
        await workspaceService.join(new JoinWorkspaceRequest({
            invitationId: workspace.id,
            accepted: true
        }));
    }

    const onDeclineInvitation = async (workspace: WorkspaceInvitation) => {
        alert("Decline invitation to " + workspace.name)
        await workspaceService.join(new JoinWorkspaceRequest({
            invitationId: workspace.id,
            accepted: false
        }));
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Workspace invitations</svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={30}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={35}>Invitor</ListRowItem>
                    <ListRowItem widthInPercentage={35}></ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each workspaces as workspace}
                <ListRow noBorder={workspace === workspaces[workspaces.length-1]}>
                    <ListRowItem widthInPercentage={30}>{workspace.name}</ListRowItem>
                    <ListRowItem widthInPercentage={35}>{workspace.invitor}</ListRowItem>
                    <ListRowItem widthInPercentage={35}>
                        <div class="button-wrapper">
                            <Button on:click={() => onAcceptInvitation(workspace)} color={Colors.Green}>Accept</Button>
                            <Button on:click={() => onDeclineInvitation(workspace)} color={Colors.Red}>Decline</Button>
                        </div>
                    </ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>

    </View>
</Card>


<style lang="scss">
  @import "../../components/theme";

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>