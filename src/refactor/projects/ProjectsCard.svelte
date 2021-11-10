<script lang="ts">
    import Card from "../../components/ui/Card.svelte";
    import View from "../../components/ui/View.svelte";
    import Button from "../../components/ui/Button.svelte";
    import ListRow from "../../components/ui/ListRow.svelte";
    import ListRowItem from "../../components/ui/ListRowItem.svelte";
    import CloseButton from "../../components/ui/CloseButton.svelte";
    import CreateProjectDialog from "../workspaces/CreateProjectDialog.svelte";
    import {goto} from "@roxi/routify";
    import {onMount} from "svelte";
    import getService from "../utils/Services";
    import {UserService} from "../users/UserService";
    import {AppContext} from "../utils/AppContext";
    import {ProjectService} from "./ProjectService";
    import ListScrollWrapper from "../../components/ui/ListScrollWrapper.svelte";
    import {Team} from "../teams/Team";
    import {Project} from "../workspaces/Project";

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

    onMount(async () => {
        const res = await projectService.getWorkspaceProjects(appContext.getWorkspaceId());
        console.log(res)
    })

    const formatProjectList = (projects: Project[]) => {
        projects.sort((u1, u2) => u1.name.localeCompare(u2.name));
        let currentProject = projects.filter(item => item.id === currentProjectId)[0]
        let remaining = projects.filter(item => item.id !== currentProjectId)
        remaining.unshift(currentProject)
        return remaining
    }

    let projects = formatProjectList(received);

    const leaveProject = (project) => {
        alert("Leaving project " + project.name)
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Projects in workspace</svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={93}>Name</ListRowItem>
                    <ListRowItem center widthInPercentage={7}>Leave</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each projects as project}
                <ListRow noBorder={project === projects[projects.length-1]}
                         on:click={() => $goto('/project', {id: project.name})}> <!-- TODO pass id in goto--> <!-- TODO isHighlighted = currentProject...-->
                    <ListRowItem widthInPercentage={93}>{project.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={7}>
                        <CloseButton on:click={() => leaveProject(project)}/>
                        <!-- TODO disabled if not product owner--></ListRowItem>
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
  @import "../../components/theme";

</style>
