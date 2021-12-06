<script lang="ts">
    import Dialog from "../../ui/Dialog.svelte";
    import {RemoveWorkspaceUserRequest, UserInvitationRequest, WorkspaceUsersResponse} from "./Models";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import Form from "../../ui/Form.svelte";
    import {DataListItem} from "../../ui/utils/DataListItem";
    import getService from "../utils/ServiceFactory";
    import {UserService} from "./UserService";
    import {createEventDispatcher, onMount} from "svelte";
    import {WorkspaceService} from "../workspaces/WorkspaceService";
    import ConfirmDialog from "../workspaces/ConfirmDialog.svelte";
    import {AppContext} from "../utils/AppContext";
    import Checkbox from "../../ui/Checkbox.svelte";
    import Text from "../../ui/Text.svelte";
    import {UpdateUserPermissions} from "../workspaces/Models";

    export let visible: boolean = false;
    let locked: boolean = true;
    export let user: WorkspaceUsersResponse = new WorkspaceUsersResponse();
    let receivedPermissions: string[] = [];
    let perm_teams: boolean = false;
    let perm_perms: boolean = false;
    let perm_works: boolean = false;
    let perm_users: boolean = false;

    const userService = getService(UserService);
    const workspaceService = getService(WorkspaceService);
    let loggedUser: WorkspaceUsersResponse = new WorkspaceUsersResponse();

    const dispatch = createEventDispatcher();
    const appContext = getService(AppContext);

    let deleteVisible: boolean = false;

    onMount(async () => {
        await fetch()
    })

    export const open = (permissions) => {
        receivedPermissions = permissions;
        perm_teams = permissions.includes("MANAGE_TEAMS");
        perm_perms = permissions.includes("MANAGE_PERMISSIONS");
        perm_works = permissions.includes("MANAGE_WORKSPACE");
        perm_users = permissions.includes("MANAGE_USERS");
    }

    const fetch = async () => {
        loggedUser = await userService.getCurrentUser();
        perm_teams = receivedPermissions.includes("MANAGE_TEAMS");
        perm_perms = receivedPermissions.includes("MANAGE_PERMISSIONS");
        perm_works = receivedPermissions.includes("MANAGE_WORKSPACE");
        perm_users = receivedPermissions.includes("MANAGE_USERS");
    }

    const deleteUser = async () => {
        await workspaceService.deleteUser(new RemoveWorkspaceUserRequest({
            userId: user._id,
            workspaceId: appContext.getWorkspaceId()
        }));
        visible = false
        dispatch('delete')
    }

    const handleSubmit = async () => {
        let newPerms: string[] = [];
        if(perm_teams) newPerms.push("MANAGE_TEAMS")
        if(perm_perms) newPerms.push("MANAGE_PERMISSIONS")
        if(perm_works) newPerms.push("MANAGE_WORKSPACE")
        if(perm_users) newPerms.push("MANAGE_USERS")
        console.log(newPerms)
        await workspaceService.updateUserPermissions(appContext.getWorkspaceId(), user._id, new UpdateUserPermissions({
            permissions:  newPerms,
        }));

        dispatch('submit')
    }

    const handleCancel = async () => {
        locked = true;
        await fetch();
    }
</script>

<Dialog on:clickedOut={handleCancel} bind:visible>
    <Form readonly={false} lockable bind:locked on:submit={handleSubmit} on:cancel={handleCancel} submitText="Update" cancelButton>
        <svelte:fragment slot="header">User profile</svelte:fragment>
        <svelte:fragment slot="header-actions">
            {#if user._id !== loggedUser._id}
                <Button color={Colors.Red} on:click={() => deleteVisible = true}>Remove user</Button>
            {/if}

        </svelte:fragment>

        <div class="wrapper">
            <Input label="Name" bind:value={user.name} locked/>
            <Input label="Email" bind:value={user.email} locked/>
        </div>
        <div class="wrapper" style="padding-bottom: 8px; font-weight: 700; font-size: 14px">
            <div class="aligned">Edit Teams</div>
            <div class="aligned">Edit Perms.</div>
            <div class="aligned">Edit WS's.</div>
            <div class="aligned">Edit Users</div>
        </div>
        <div class="wrapper">
            <Checkbox aligned disabled={locked} bind:checked={perm_teams}/>
            <Checkbox aligned disabled={user._id !== loggedUser._id ? locked : true} bind:checked={perm_perms}/>
            <Checkbox aligned disabled={locked} bind:checked={perm_works}/>
            <Checkbox aligned disabled={locked} bind:checked={perm_users}/>
        </div>

    </Form>
</Dialog>
<ConfirmDialog on:confirm={deleteUser} title="Delete User"
               description="Confirm user removal. This action cannot be reverted!" bind:visible={deleteVisible}/>


<style lang="scss">
  @import "../../ui/theme";


  .wrapper {
    display: flex;
    justify-content: space-between;
  }

  .aligned{
    width: 25%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>