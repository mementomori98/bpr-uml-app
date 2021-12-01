<script lang="ts">
    import Dialog from "../../ui/Dialog.svelte";
    import {RemoveWorkspaceUserRequest, User, WorkspaceUsersResponse} from "./Models";
    import Input from "../../ui/Input.svelte";
    import Select from "../../ui/Select.svelte";
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

    export let visible: boolean = false;
    export let user: WorkspaceUsersResponse = new WorkspaceUsersResponse();
    const userService = getService(UserService);
    const workspaceService = getService(WorkspaceService);
    let loggedUser: WorkspaceUsersResponse = new WorkspaceUsersResponse();

    const dispatch = createEventDispatcher();
    const appContext = getService(AppContext);
    let roles = [new DataListItem(1, "Admin"), new DataListItem(2, "Product owner"), new DataListItem(3, "Developer")]

    let deleteVisible: boolean = false;

    onMount(async () => {
        loggedUser = await userService.getCurrentUser();
    })

    const deleteUser = async () => {
        await workspaceService.deleteUser(new RemoveWorkspaceUserRequest({
            userId: user._id,
            workspaceId: appContext.getWorkspaceId()
        }));
        visible = false
        dispatch('delete')
    }
</script>

<Dialog bind:visible>
    <Form readonly>
        <svelte:fragment slot="header">User profile</svelte:fragment>
        <svelte:fragment slot="header-actions">
            {#if user._id === loggedUser._id}
                <Button color={Colors.Red} on:click={() => deleteVisible = true}>Remove user</Button>
            {/if}

        </svelte:fragment>

        <div class="wrapper">
            <Input label="Name" bind:value={user.name} locked/>
            <Input label="Email" bind:value={user.email} locked/>
            <!--            <div>-->
            <!--                <Input label="Status" bind:value={user.status} locked/>-->
            <!--                <Select hasButton label="Role" defaultChoice={user.role} on:submit={e => pickRole(e)} choices={roles} btnText="Update"/>-->
            <!--            </div>-->
        </div>

    </Form>
</Dialog>
<ConfirmDialog on:confirm={deleteUser} title="Delete User" description="Confirm user removal. This action cannot be reverted!" bind:visible={deleteVisible}/>


<style lang="scss">
  @import "../../ui/theme";


  .wrapper {
    display: flex;

  }
</style>