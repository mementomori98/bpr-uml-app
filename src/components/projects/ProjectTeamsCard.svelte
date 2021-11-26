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
    import {checkIfEmpty, sortUserList} from "../../ui/utils/ListItem";
    import getService from "../utils/ServiceFactory";
    import {ProjectService} from "./ProjectService";
    import {ProjectResponse} from "./Models";
    import Checkbox from "../../ui/Checkbox.svelte";

    const projectService = getService(ProjectService);
    let project: ProjectResponse = new ProjectResponse({title: "", users: [], teams: [], _id: "", workspaceId: ""});

    let editVisible: boolean = false;
    let readVisible: boolean = false;
    let chosenTeam: Team = null;

    onMount(async () => {
        project = await projectService.getProject($params.id)
        project.teams = sortUserList(project?.teams);
        if (checkIfEmpty(project.teams)) {
            project.teams = []
        }
    })

    const onEdit = async () => {
        project = await projectService.getProject($params.id)
        project.teams = sortUserList(project?.teams);
        if (checkIfEmpty(project.teams)) {
            project.teams = []
        }
    }

    const handleReadingTeam = (team) => {
        readVisible = true
        chosenTeam = team
    }

</script>

<Card>
    <View>
        <svelte:fragment slot="header">Teams in {project.title}</svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={70}>Name</ListRowItem>
                    <ListRowItem center widthInPercentage={15}>Users</ListRowItem>
                    <ListRowItem center widthInPercentage={15}>Can edit</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each project.teams as team}
                <ListRow on:click={() => handleReadingTeam(team)}>
                    <ListRowItem widthInPercentage={70}>{team.team?.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={15}>{team.team?.users.length}</ListRowItem>
                    <ListRowItem center widthInPercentage={15}>
                        <Checkbox disabled bind:checked={team.isEditor}/>
                    </ListRowItem>
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