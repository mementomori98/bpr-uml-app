<script lang="ts">
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import Button from "../../ui/Button.svelte";
    import {JoinWorkspaceRequest, WorkspaceInvitation} from "../workspaces/Models";
    import {Colors} from "../../ui/utils/Colors";
    import Text from "../../ui/Text.svelte";
    import {goto} from "@roxi/routify";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import getService from "../utils/ServiceFactory";
    import {WorkspaceService} from "../workspaces/WorkspaceService";

    export let noPadding: boolean = false;
    export let maxHeight: number;
    const workspaceService = getService(WorkspaceService);

    export let invitations: WorkspaceInvitation[] = []

    const onJoinInvitation = async (workspace: WorkspaceInvitation) => {
        try{
            const res = await workspaceService.join(new JoinWorkspaceRequest({
                invitationId: workspace._id,
                accepted: true
            }));
        }catch (e) {
            console.log("joinInvitation error occurred, possibly no json object")
        }

        $goto('/')
    }

</script>

<Text noPadding={noPadding}>Invitations</Text>
<ListScrollWrapper maxHeight={maxHeight}>
    <svelte:fragment slot="header">
        <ListRow style="padding-top:0; padding-bottom:0;  min-height: 40px" isHeader>
            <ListRowItem widthInPercentage={40}>Name</ListRowItem>
            <ListRowItem widthInPercentage={40}>Invitor</ListRowItem>
            <ListRowItem widthInPercentage={20}> </ListRowItem>
        </ListRow>
    </svelte:fragment>
    {#each invitations as invitation}
        <ListRow style="padding-top:0; padding-bottom:0; min-height: 40px">
            <ListRowItem widthInPercentage={40}>{invitation.workspaceName}</ListRowItem> <!--TODO workspaceName-->
            <ListRowItem widthInPercentage={40}>{invitation.inviterUserName}</ListRowItem> <!--TODO inviterName-->
            <ListRowItem widthInPercentage={20}>
                <div class="button-wrapper">
                    <Button on:click={() => onJoinInvitation(invitation)} small color={Colors.Green}>Join</Button>
                </div>
            </ListRowItem>
        </ListRow>
    {/each}
</ListScrollWrapper>


<style lang="scss">
  @import "../../ui/theme";

  .title {
    font: $font-nav;
    padding-top: 16px;
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>