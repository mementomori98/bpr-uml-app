<script lang="ts">


    import Wrapper from "../../../ui/Wrapper.svelte";
    import Card from "../../../ui/Card.svelte";
    import View from "../../../ui/View.svelte";
    import ListRow from "../../../ui/ListRow.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import Button from "../../../ui/Button.svelte";
    import {WorkspaceInvitation} from "../../../../services/Workspaces/Models";
    import {Colors} from "../../../ui/Colors";

    let workspaces = [
        new WorkspaceInvitation({name: 'Rome', invitor: 'Nero', id: 1}),
        new WorkspaceInvitation({name: 'London', invitor: 'Henrik', id: 1}),
        new WorkspaceInvitation({name: 'Constantinople', invitor: 'Constantine', id: 1}),
    ]
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Workspace invitations</svelte:fragment>
        <ListRow isHeader>
            <ListRowItem widthInPercentage={30}>Name</ListRowItem>
            <ListRowItem widthInPercentage={35}>Invitor</ListRowItem>
            <ListRowItem widthInPercentage={35}></ListRowItem>
        </ListRow>
        {#each workspaces as workspace}
            <ListRow>
                <ListRowItem widthInPercentage={30}>{workspace.name}</ListRowItem>
                <ListRowItem widthInPercentage={35}>{workspace.invitor}</ListRowItem>
                <ListRowItem widthInPercentage={35}>
                    <div class="button-wrapper">
                        <Button color={Colors.Green}>Accept</Button>
                        <Button color={Colors.Red}>Reject</Button>
                    </div>
                </ListRowItem>
            </ListRow>
        {/each}
    </View>
</Card>


<style lang="scss">
  @import "../../../theme";
  .button-wrapper{
    display: flex;
    justify-content: flex-end;
  }
</style>