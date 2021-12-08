<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import Button from "../../ui/Button.svelte";
    import {JoinWorkspaceRequest, WorkspaceInvitation} from "../workspaces/Models";
    import {Colors} from "../../ui/utils/Colors";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import getService from "../utils/ServiceFactory";
    import {WorkspaceService} from "../workspaces/WorkspaceService";
    import {onMount} from "svelte";
    import {goto} from "@roxi/routify";
    import {UserService} from "./UserService";

    const workspaceService = getService(WorkspaceService);
    const userService = getService(UserService);

    let invitations: WorkspaceInvitation = WorkspaceInvitation[{}]

    onMount(async () => {
        invitations = await userService.getUserInvitations();
    })

    const onAcceptInvitation = async (workspace: WorkspaceInvitation) => {
        try{
            await workspaceService.join(new JoinWorkspaceRequest({
                invitationId: workspace._id,
                accepted: true
            }));
        }catch (e) {
            console.log("acceptInvitation error occurred, possibly no json object")
        }
    }

    const onDeclineInvitation = async (workspace: WorkspaceInvitation) => {
        try{
            await workspaceService.join(new JoinWorkspaceRequest({
                invitationId: workspace._id,
                accepted: false
            }));
        }catch (e) {
            console.log("acceptInvitation error occurred, possibly no json object")
        }
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
                    <ListRowItem widthInPercentage={35}> </ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#if invitations}
                {#each invitations as invitation}
                    <ListRow>
                        <ListRowItem widthInPercentage={30}>{invitation.workspaceName}</ListRowItem>
                        <ListRowItem widthInPercentage={35}>{invitation.inviterUserName}</ListRowItem>
                        <ListRowItem widthInPercentage={35}>
                            <div class="button-wrapper">
                                <Button on:click={() => onAcceptInvitation(invitation)} color={Colors.Green}>Accept</Button>
                                <Button on:click={() => onDeclineInvitation(invitation)} color={Colors.Red}>Decline</Button>
                            </div>
                        </ListRowItem>
                    </ListRow>
                {/each}
            {/if}

        </ListScrollWrapper>

    </View>
</Card>


<style lang="scss">
  @import "../../ui/theme";

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>