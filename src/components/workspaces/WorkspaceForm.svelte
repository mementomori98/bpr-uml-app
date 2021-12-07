<script lang="ts">

    import Card from "../../ui/Card.svelte";
    import Form from "../../ui/Form.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import {onMount} from "svelte";
    import {goto} from "@roxi/routify";
    import getService from "../utils/ServiceFactory";
    import {WorkspaceService} from "./WorkspaceService";
    import {AppContext} from "../utils/AppContext";
    import {CreateWorkspaceRequest} from "./Models";
    import {UserService} from "../users/UserService";

    let workspaceName: string = '';
    const workspaceService = getService(WorkspaceService);
    const appContext = getService(AppContext);
    const userService = getService(UserService);
    let hasPermission: boolean = false;

    let locked: boolean = true;

    onMount(async () => {
        hasPermission = await userService.validateWorkspacePermissions('MANAGE_WORKSPACE')
        await fetch()
    })

    const fetch = async () => {
        const res = await workspaceService.getById(appContext.getWorkspaceId());
        workspaceName = res.name;
    }

    const onEdit = async () => {
        await workspaceService.renameWorkspace(appContext.getWorkspaceId(), new CreateWorkspaceRequest({
            name: workspaceName
        }));
        await fetch()
    }

</script>

<Card>
    <Form readonly={!hasPermission} lockable bind:locked cancelButton on:cancel={fetch} on:submit={onEdit}>
        <svelte:fragment slot="header">Workspace</svelte:fragment>
        <Input label="Workspace name" bind:value={workspaceName} {locked}/>
    </Form>
</Card>

<style lang="scss">
  @import "../../ui/theme";

</style>