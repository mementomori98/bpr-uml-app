<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import ProjectUsersCard from "./ProjectUsersCard.svelte";
    import Card from "../../ui/Card.svelte";
    import CardItem from "../../ui/CardItem.svelte";
    import getService from "../utils/ServiceFactory";
    import {ProjectService} from "./ProjectService";
    import {AppContext} from "../utils/AppContext";
    import {ProjectsResponse} from "./Models";
    import {onMount} from "svelte";
    import {goto} from "@roxi/routify";
    import Fab from "../../ui/Fab.svelte";
    import Icon from "../../ui/Icon.svelte";
    import CreateProjectDialog from "./CreateProjectDialog.svelte";
    import View from "../../ui/View.svelte";
    import {IconType} from "../../ui/utils/IconType";
    import {redirectUrl} from "../utils/redirectStore";

    const projectService = getService(ProjectService);
    const appContext = getService(AppContext);

    let createVisible: boolean = false;
    let currentProjectId: number = 5;

    let projects: ProjectsResponse[] = [];

    onMount(async () => {
        projects = await projectService.getWorkspaceProjects(appContext.getWorkspaceId());
    })

    const onCreateProject = async () => {
        projects = await projectService.getWorkspaceProjects(appContext.getWorkspaceId());
    }

</script>

<div class="container">
    <div class="wrapper">
        {#each projects as project}
            <CardItem icon={IconType.Project} title={project.title} on:click={() => $redirectUrl = `/project-open?id=${project._id}`} on:menu={() => $goto('/project', {id: project._id})}/>
        {/each}
    </div>
</div>

<Fab on:click={() => createVisible = true}>
    <Icon icon="add"/>
</Fab>

<CreateProjectDialog on:create={onCreateProject} bind:visible={createVisible}/>

<style lang="scss">
  @import "../../ui/theme";

  .container {
    //background-color: #d8d8d8;
    height: 100%;
    width: 100%;
  }

  .wrapper {
    display: flex;
    flex: auto;
    flex-wrap: wrap;
    height: fit-content;
    justify-content: center;
    padding-top: 24px;
    max-width: 1024px;
    width: 100%;
    background-color: #fafafa;
    margin-left: auto;
    margin-right: auto;
  }

</style>