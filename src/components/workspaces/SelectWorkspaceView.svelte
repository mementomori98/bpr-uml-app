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
    import {UserService} from "../users/UserService";
    import {Colors} from "../../ui/utils/Colors";

    const dispatch = createEventDispatcher();

    const workspaceService = getService(WorkspaceService);
    const userService = getService(UserService);
    const appContext = getService(AppContext);

    let workspaces = [];
    let invitations = [];

    onMount(async () => {
        const wss = await workspaceService.get();
        workspaces = wss.sort((u1, u2) => u1.name.localeCompare(u2.name));

        invitations = await userService.getUserInvitations();

        if(workspaces.length === 0 && invitations.length === 0){
            $goto('/create-workspace')
        }
    })

    const onclick = async (workspace: Workspace) => {
        appContext.setWorkspaceId(workspace._id)
        $goto('/')
    }

    const handleCancel = () => {
        window.history.back()
    }

</script>

<Wrapper width="480" bgColor="ededed" verticalCentering>
    <Card>
        <View>
            <svelte:fragment slot="header">Select workspace</svelte:fragment>
            <svelte:fragment slot="default">
                <Text noPadding>Your workspaces</Text>
                <ListScrollWrapper>
                    {#each workspaces as workspace}
                        <ListRow on:click={() => onclick(workspace)}> <!-- TODO set workspace by the decision -->
                            <ListRowItem widthInPercentage={100}>{workspace.name}</ListRowItem>
                        </ListRow>
                    {/each}
                </ListScrollWrapper>
                {#if invitations.length > 0}
                    <InvitationsList maxHeight={150} invitations={invitations}/>
                {/if}
            </svelte:fragment>
            <svelte:fragment slot="actions">
                <Button color={Colors.Gray} on:click={handleCancel}>Cancel</Button>
            </svelte:fragment>
        </View>
    </Card>
</Wrapper>

<style lang="scss">
  @import "../../ui/theme";

</style>
