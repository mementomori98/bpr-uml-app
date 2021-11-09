<script lang="ts">
    import Wrapper from "../../../ui/Wrapper.svelte";
    import Card from "../../../ui/Card.svelte";
    import View from "../../../ui/View.svelte";
    import ListRow from "../../../ui/ListRow.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import Button from "../../../ui/Button.svelte";
    import {JoinWorkspaceRequest, WorkspaceInvitation} from "../../../../services/Workspaces/Models";
    import {Colors} from "../../../ui/utils/Colors";
    import ListScrollWrapper from "../../../ui/ListScrollWrapper.svelte";
    import getService from "../../../../services/Services";
    import {WorkspaceService} from "../../../../services/Workspaces/WorkspaceService";

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
  @import "../../../theme";

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>