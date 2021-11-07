<script lang="ts">
    import ListRow from "../../../ui/ListRow.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import Button from "../../../ui/Button.svelte";
    import {WorkspaceInvitation} from "../../../../services/Workspaces/Models";
    import {Colors} from "../../../ui/Colors";
    import Text from "../../../ui/Text.svelte";
    import {goto} from "@roxi/routify";

    export let noPadding: boolean = false;

    let workspaces = [
        new WorkspaceInvitation({name: 'Rome', invitor: 'Nero', id: 1}),
        new WorkspaceInvitation({name: 'London', invitor: 'Henrik', id: 1}),
        new WorkspaceInvitation({name: 'Constantinople', invitor: 'Constantine', id: 1}),
    ]

    const onJoinInvitation = (workspace: WorkspaceInvitation) => {
        alert("Joining to " + workspace.name + "workspace")
        $goto('/')
    }

</script>

<Text noPadding={noPadding}>Invitations</Text>
<ListRow style="padding: 0 0 0 14px; min-height: 40px" isHeader>
    <ListRowItem widthInPercentage={40}>Name</ListRowItem>
    <ListRowItem widthInPercentage={40}>Invitor</ListRowItem>
    <ListRowItem widthInPercentage={20}></ListRowItem>
</ListRow>
{#each workspaces as workspace}
    <ListRow style="padding: 0 0 0 14px; min-height: 40px">
        <ListRowItem widthInPercentage={40}>{workspace.name}</ListRowItem>
        <ListRowItem widthInPercentage={40}>{workspace.invitor}</ListRowItem>
        <ListRowItem widthInPercentage={20}>
            <div class="button-wrapper">
                <Button on:click={() => onJoinInvitation(workspace)} small color={Colors.Green}>Join</Button>
            </div>
        </ListRowItem>
    </ListRow>
{/each}

<style lang="scss">
  @import "../../../theme";

  .title {
    font: $font-nav;
    padding-top: 16px;
  }

  .button-wrapper{
    display: flex;
    justify-content: flex-end;
  }
</style>