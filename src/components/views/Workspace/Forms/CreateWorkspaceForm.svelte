<script lang="ts">

    import Form from "../../../ui/Form.svelte";
    import getService from "../../../../services/Services";
    import {WorkspaceService} from "../../../../services/Workspaces/WorkspaceService";
    import {CreateWorkspaceRequest, WorkspaceInvitation} from "../../../../services/Workspaces/Models";
    import Input from "../../../ui/Input.svelte";
    import {goto} from "@roxi/routify";
    import InvitationsList from "../Users/InvitationsList.svelte";
    import View from "../../../ui/View.svelte";
    import Divider from "../../../ui/Divider.svelte";
    import {AppContext} from "../../../../services/utils/AppContext";

    const workspaceService = getService(WorkspaceService);
    const appContext = getService(AppContext);

    let name: string;

    let invitations: WorkspaceInvitation[] = [
        new WorkspaceInvitation({name: 'Rome', invitor: 'Nero', id: 1}),
        new WorkspaceInvitation({name: 'London', invitor: 'Henrik', id: 2}),
        new WorkspaceInvitation({name: 'Constantinople', invitor: 'Constantine', id: 3}),
    ]

    const handleSubmit = async () => { //TODO
        /*const res = await workspaceService.create(new CreateWorkspaceRequest({
            name: name
        }));*/
       // appContext.setWorkspaceId(res._id)
        $goto('/')
    }

</script>

<Form on:submit={handleSubmit}>
    <svelte:fragment slot="header">Create Workspace</svelte:fragment>
    <svelte:fragment slot="header-actions"></svelte:fragment>
    <Input label="Workspace Name" bind:value={name} />
</Form>
{#if invitations.length > 0}
    <Divider/>
    <View noPaddingTop>
        <svelte:fragment slot="header">Join workspace</svelte:fragment>
        <InvitationsList maxHeight={150} workspaces={invitations} noPadding/>
    </View>
{/if}


<style lang="scss">
    @import "../../../theme.scss";

</style>
