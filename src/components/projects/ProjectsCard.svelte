<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import CloseButton from "../../ui/CloseButton.svelte";
    import CreateProjectDialog from "./CreateProjectDialog.svelte";
    import {goto} from "@roxi/routify";
    import {onMount} from "svelte";
    import getService from "../utils/ServiceFactory";
    import {UserService} from "../users/UserService";
    import {AppContext} from "../utils/AppContext";
    import {ProjectService} from "./ProjectService";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {Team} from "../teams/Models";
    import {Project, ProjectsResponse} from "./Models";

    const projectService = getService(ProjectService);
    const appContext = getService(AppContext);

    let createVisible: boolean = false;
    let currentProjectId: number = 5;
    let received = [
        new Project({name: 'Pegasus', id: 1}),
        new Project({name: 'Casino', id: 2}),
        new Project({name: 'Spectre', id: 3}),
        new Project({name: 'Skyfall', id: 4}),
        new Project({name: 'Syndicate', id: 5}),
    ]
    let projects: ProjectsResponse[] = [];
    onMount(async () => {
        projects = await projectService.getWorkspaceProjects(appContext.getWorkspaceId());
    })

    /*const formatProjectList = (projects: Project[]) => {
        projects.sort((u1, u2) => u1.name.localeCompare(u2.name));
        let currentProject = projects.filter(item => item.id === currentProjectId)[0]
        let remaining = projects.filter(item => item.id !== currentProjectId)
        remaining.unshift(currentProject)
        return remaining
    }
    let projects = formatProjectList(received);

    const leaveProject = (project) => {
        alert("Leaving project " + project.name)
    }*/
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Projects in workspace</svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={100}>Name</ListRowItem>
<!--                    <ListRowItem center widthInPercentage={7}>Leave</ListRowItem>-->
                </ListRow>
            </svelte:fragment>
            {#each projects as project}
                <ListRow noBorder={project === projects[projects.length-1]}
                         on:click={() => $goto('/project', {id: project._id})}> <!-- TODO pass id in goto--> <!-- TODO isHighlighted = currentProject...-->
                    <ListRowItem widthInPercentage={100}>{project.title}</ListRowItem>
<!--                    <ListRowItem center widthInPercentage={7}>-->
<!--                        <CloseButton on:click={() => leaveProject(project)}/>-->
<!--                        &lt;!&ndash; TODO disabled if not product owner&ndash;&gt;</ListRowItem>-->
                </ListRow>
            {/each}
        </ListScrollWrapper>

        <svelte:fragment slot="actions"> <!-- TODO disabled if not product owner-->
            <Button on:click={() => createVisible = true}>Create Project</Button>
        </svelte:fragment>
    </View>
</Card>

<CreateProjectDialog bind:visible={createVisible}/>

<style lang="scss">
  @import "../../ui/theme";

</style>
