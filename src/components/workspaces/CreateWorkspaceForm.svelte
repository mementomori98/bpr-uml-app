<script lang="ts">

    import Form from "../../ui/Form.svelte";
    import getService from "../utils/ServiceFactory";
    import {WorkspaceService} from "./WorkspaceService";
    import {CreateWorkspaceRequest, WorkspaceInvitation} from "./Models";
    import Input from "../../ui/Input.svelte";
    import {goto} from "@roxi/routify";
    import InvitationsList from "../users/InvitationsList.svelte";
    import View from "../../ui/View.svelte";
    import Divider from "../../ui/Divider.svelte";
    import {AppContext} from "../utils/AppContext";
    import {onMount} from "svelte";
    import {UserService} from "../users/UserService";

    const workspaceService = getService(WorkspaceService);
    const userService = getService(UserService);
    const appContext = getService(AppContext);

    let name: string;

    let invitations: WorkspaceInvitation[] = [];

    const handleSubmit = async () => {
        const res = await workspaceService.create(new CreateWorkspaceRequest({
            name: name
        }));
        appContext.setWorkspaceId(res._id)
        $goto('/')
    }

    const handleCancel = () => {
        window.history.back()
    }

    onMount(async () => {
        invitations = await userService.getUserInvitations();
    })

</script>

<Form cancelButton on:cancel={handleCancel} on:submit={handleSubmit}>
    <svelte:fragment slot="header">Create Workspace</svelte:fragment>
    <Input label="Workspace Name" bind:value={name} />
</Form>
{#if invitations.length > 0}
    <Divider/>
    <View noPaddingTop>
        <svelte:fragment slot="header">Join workspace</svelte:fragment>
        <InvitationsList maxHeight={150} invitations={invitations} noPadding/>
    </View>
{/if}

<style lang="scss">
    @import "../../ui/theme";

</style>
