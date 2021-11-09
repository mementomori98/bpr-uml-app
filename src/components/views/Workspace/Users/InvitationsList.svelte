<script lang="ts">
    import ListRow from "../../../ui/ListRow.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import Button from "../../../ui/Button.svelte";
    import {JoinWorkspaceRequest, WorkspaceInvitation} from "../../../../services/Workspaces/Models";
    import {Colors} from "../../../ui/Colors";
    import Text from "../../../ui/Text.svelte";
    import {goto} from "@roxi/routify";
    import ListScrollWrapper from "../../../ui/ListScrollWrapper.svelte";
    import getService from "../../../../services/Services";
    import {WorkspaceService} from "../../../../services/Workspaces/WorkspaceService";

    export let noPadding: boolean = false;
    export let maxHeight: number;
    const workspaceService = getService(WorkspaceService);

    export let workspaces: WorkspaceInvitation[] = []

    const onJoinInvitation = async (workspace: WorkspaceInvitation) => {
        alert("Joining to " + workspace.name + "workspace")
        await workspaceService.join(new JoinWorkspaceRequest({
            invitationId: workspace.id,
            accepted: true
        }));
        $goto('/')
    }

</script>

<Text noPadding={noPadding}>Invitations</Text>
<ListScrollWrapper maxHeight={maxHeight}>
    <svelte:fragment slot="header">
        <ListRow style="padding-top:0; padding-bottom:0;  min-height: 40px" isHeader>
            <ListRowItem widthInPercentage={40}>Name</ListRowItem>
            <ListRowItem widthInPercentage={40}>Invitor</ListRowItem>
            <ListRowItem widthInPercentage={20}></ListRowItem>
        </ListRow>
    </svelte:fragment>
    {#each workspaces as workspace}
        <ListRow noBorder={workspace === workspaces[workspaces.length-1]} style="padding-top:0; padding-bottom:0; min-height: 40px">
            <ListRowItem widthInPercentage={40}>{workspace.name}</ListRowItem>
            <ListRowItem widthInPercentage={40}>{workspace.invitor}</ListRowItem>
            <ListRowItem widthInPercentage={20}>
                <div class="button-wrapper">
                    <Button on:click={() => onJoinInvitation(workspace)} small color={Colors.Green}>Join</Button>
                </div>
            </ListRowItem>
        </ListRow>
    {/each}
</ListScrollWrapper>


<style lang="scss">
  @import "../../../theme";

  .title {
    font: $font-nav;
    padding-top: 16px;
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>