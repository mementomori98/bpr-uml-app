<script lang="ts">

    import Card from "../../ui/Card.svelte";
    import Form from "../../ui/Form.svelte";
    import Input from "../../ui/Input.svelte";
    import {onMount} from "svelte";
    import {goto, params} from "@roxi/routify";
    import getService from "../utils/ServiceFactory";
    import {AppContext} from "../utils/AppContext";
    import {ProjectResponse, RenameProjectRequest} from "./Models";
    import {ProjectService} from "./ProjectService";
    import {UserService} from "../users/UserService";

    let projectName: string = '';
    const appContext = getService(AppContext);
    const projectService = getService(ProjectService);
    const userService = getService(UserService);
    let hasPermission: boolean = false;

    let project: ProjectResponse = new ProjectResponse({title: "", users: [], teams: [], _id: "", workspaceId: ""});

    let locked: boolean = true;

    onMount(async () => {
        hasPermission = await userService.validateProjectPermissions($params.id)
        await fetch()
    })

    const fetch = async () => {
        project = await projectService.getProject($params.id)
        projectName = project.title;
    }

    const onEdit = async () => {
        await projectService.renameProject($params.id, new RenameProjectRequest({
            title: projectName
        }));
        await fetch()
    }

    const deleteProject = async () => {
        await projectService.deleteProject($params.id);
        $goto('/projects')
    }

</script>

<Card>
    <Form readonly={!hasPermission} lockable bind:locked cancelButton on:cancel={fetch} on:submit={onEdit}>
        <svelte:fragment slot="header">Project</svelte:fragment>
        <Input label="Project name" bind:value={projectName} {locked}/>
    </Form>
</Card>

<style lang="scss">
  @import "../../ui/theme";

</style>