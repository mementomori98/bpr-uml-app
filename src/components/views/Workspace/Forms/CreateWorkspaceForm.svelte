<script lang="ts">

    import Form from "../../../ui/Form.svelte";
    import getService from "../../../../services/Services";
    import {WorkspaceService} from "../../../../services/Workspaces/WorkspaceService";
    import {CreateWorkspaceRequest} from "../../../../services/Workspaces/Models";
    import Input from "../../../ui/Input.svelte";

    const workspaceService = getService(WorkspaceService);

    let name: string;

    const handleSubmit = () => {
        workspaceService.create(new CreateWorkspaceRequest({
            name: name
        })).then().catch();
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