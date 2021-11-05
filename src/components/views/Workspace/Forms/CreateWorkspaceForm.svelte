<script lang="ts">

    import Form from "../../../ui/Form.svelte";
    import getService from "../../../../services/Services";
    import {WorkspaceService} from "../../../../services/Workspaces/WorkspaceService";
    import {CreateWorkspaceRequest} from "../../../../services/Workspaces/Models";
    import Input from "../../../ui/Input.svelte";
    import {goto} from "@roxi/routify";
    import {AppContext} from "../../../../services/utils/AppContext";

    const workspaceService = getService(WorkspaceService);
    const appContext = getService(AppContext);

    let name: string;

    const handleSubmit = async () => { //TODO
        const res = await workspaceService.create(new CreateWorkspaceRequest({
            name: name
        }));
        appContext.setWorkspaceId(res._id)
        $goto('/')
    }

</script>

<Form on:submit={handleSubmit}>
    <svelte:fragment slot="header">Create Workspace</svelte:fragment>
    <svelte:fragment slot="header-actions"></svelte:fragment>
    <Input label="Workspace Name" bind:value={name} />
</Form>

<style lang="scss">
    @import "../../../theme.scss";

</style>