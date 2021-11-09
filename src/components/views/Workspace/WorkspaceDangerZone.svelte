<script lang="ts">
import Card from "../../ui/Card.svelte";
import View from "../../ui/View.svelte";
import WorkspaceDangerItem from "./WorkspaceDangerItem.svelte";
import Button from "../../ui/Button.svelte";
import {Colors} from "../../ui/utils/Colors";
import WorkspaceDangerDialog from "./WorkspaceDangerDialog.svelte";

export let title: string = ""
let dangerVisible: boolean = false;

const deleteWorkspace = () => {
    //todo deleteWorkspace
    alert('Workspace removed')
}
</script>

<Card borderSize="1" borderColor="ee1111">
    <View noPadding noActions>
        <svelte:fragment slot="header">Danger Zone</svelte:fragment>
        <WorkspaceDangerItem title="Leave Workspace" description="You will permanently leave the workspace. With a new invitation, you can gain access again later.">
            <svelte:fragment slot="actionBtn">
                <Button color="{Colors.Red}" on:click={() => dangerVisible = true}>Leave</Button> <!-- TODO functionality -->
            </svelte:fragment>
        </WorkspaceDangerItem>
        <WorkspaceDangerItem title="Delete Workspace" description="Your workspace will be removed permanently. This action cannot be reversed!">
            <svelte:fragment slot="actionBtn">
                <Button color="{Colors.Red}" on:click={() => dangerVisible = true}>Delete</Button>
            </svelte:fragment>
        </WorkspaceDangerItem>
    </View>
</Card>
<WorkspaceDangerDialog bind:visible={dangerVisible}/>

<style lang="scss">
  @import "../../theme.scss";


</style>