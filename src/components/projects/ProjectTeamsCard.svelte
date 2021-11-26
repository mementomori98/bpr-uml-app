<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import {goto, params} from "@roxi/routify";
    import {Team} from "../teams/Models";
    import EditProjectTeamsDialog from "../teams/EditTeamsDialog.svelte";
    import TeamSettingsDialog from "../teams/TeamSettingsDialog.svelte";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {onMount} from "svelte";
    import {sortUserList} from "../../ui/utils/ListItem";
    import getService from "../utils/ServiceFactory";
    import {ProjectService} from "./ProjectService";
    import {ProjectResponse} from "./Models";

    const projectService = getService(ProjectService);
    let project: ProjectResponse = new ProjectResponse({title: "", users: [], teams: [], _id: "", workspaceId: ""});

    let editVisible: boolean = false;
    let readVisible: boolean = false;
    let chosenTeam: Team = null;
    let teams = []

    onMount(async () => {
        project = await projectService.getProject($params.id)
        project.teams = sortUserList(project?.teams);
    })

    const onEdit = async () => {
        project = await projectService.getProject($params.id)
    }

    const handleReadingTeam = (team) => {
        readVisible = true
        chosenTeam = team
    }

</script>

<Card>
    <View>
        <svelte:fragment slot="header">Teams in {$params.id}</svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={72}>Name</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>Users</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>Projects</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each teams as team}
                <ListRow on:click={() => handleReadingTeam(team)}>
                    <ListRowItem widthInPercentage={72}>{team.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>{team.usersAmount}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>{team.projectsAmount}</ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>
        <svelte:fragment slot="actions">
            <Button on:click={() => editVisible = true}>Edit</Button>
        </svelte:fragment>
    </View>
</Card>

<EditProjectTeamsDialog bind:visible={editVisible} on:edit={onEdit}/>
<TeamSettingsDialog readonly bind:visible={readVisible} teamName={chosenTeam === null ? "" : chosenTeam.name}/>

<style lang="scss">
  @import "../../ui/theme";

</style>