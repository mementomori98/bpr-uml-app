<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import DangerItem from "../../ui/DangerItem.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import ConfirmDialog from "./ConfirmDialog.svelte";
    import {goto} from "@roxi/routify";
    import getService from "../utils/ServiceFactory";
    import {TeamService} from "../teams/TeamService";
    import {WorkspaceService} from "./WorkspaceService";
    import {AppContext} from "../utils/AppContext";
    import {AuthenticationService} from "../auth/AuthenticationService";
    import {RemoveWorkspaceUserRequest} from "../users/Models";
    import {user} from "../users/UserSettingsDialog.svelte";
    import {UserService} from "../users/UserService";
    import {onMount} from "svelte";

    const authenticationService = getService(AuthenticationService);
    const workspaceService = getService(WorkspaceService);
    const userService = getService(UserService);
    const appContext = getService(AppContext);
    let hasPermission: boolean = false;

    export const title: string = ""
    let deleteVisible: boolean = false;
    let leaveVisible: boolean = false;

    onMount(async () => {
        hasPermission = await userService.validateWorkspacePermissions('MANAGE_WORKSPACE')
    })

    const onLeaveWorkspace = async () => {
        await workspaceService.deleteCurrentUser(appContext.getWorkspaceId());
        authenticationService.logout()
        $goto('/login');
    }

    const onDeleteWorkspace = async () => {
        await workspaceService.deleteWorkspace(appContext.getWorkspaceId());
        authenticationService.logout()
        $goto('/login');
    }

</script>

<Card borderSize="1" borderColor="ee1111">
    <View noPadding noActions>
        <svelte:fragment slot="header">Danger Zone</svelte:fragment>
        <DangerItem title="Leave Workspace"
                    description="You will permanently leave the workspace. With a new invitation, you can gain access again later.">
            <svelte:fragment slot="actionBtn">
                <Button color="{Colors.Red}" on:click={() => leaveVisible = true}>Leave</Button>
                <!-- TODO functionality -->
            </svelte:fragment>
        </DangerItem>
        {#if hasPermission}
            <DangerItem title="Delete Workspace"
                        description="Your workspace will be removed permanently. This action cannot be reversed!">
                <svelte:fragment slot="actionBtn">
                    <Button color="{Colors.Red}" on:click={() => deleteVisible = true}>Delete</Button>
                </svelte:fragment>
            </DangerItem>
        {/if}

    </View>
</Card>
<ConfirmDialog on:confirm={onDeleteWorkspace} title="Delete Workspace"
               description="Confirm workspace removal. This action cannot be reverted!" bind:visible={deleteVisible}/>
<ConfirmDialog on:confirm={onLeaveWorkspace} title="Leave Workspace"
               description="Confirm leaving workspace. This action cannot be reverted!" bind:visible={leaveVisible}/>

<style lang="scss">
  @import "../../ui/theme";


</style>