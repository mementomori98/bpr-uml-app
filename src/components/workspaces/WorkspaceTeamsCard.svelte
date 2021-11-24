<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import {Team} from "../teams/Models";
    import TeamSettingsDialog from "../teams/TeamSettingsDialog.svelte";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {onMount} from "svelte";
    import getService from "../utils/ServiceFactory";
    import {params} from "@roxi/routify";
    import {TeamService} from "../teams/TeamService";


    let teams = [];

    const teamsService = getService(TeamService);

    let createVisible: boolean = false;
    let editVisible: boolean = false;
    let chosenTeam: Team = null;

    onMount(async () => {
       // teams = await teamsService.getWorkspaceTeams($params.id)
    })

    const handleEdit = (team) => {
        // todo
        chosenTeam = team
        editVisible = true
    }

</script>

<Card>
    <View>
        <svelte:fragment slot="header">Teams</svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={72}>Name</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>Users</ListRowItem>
                    <ListRowItem center widthInPercentage={16}>Projects</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each teams as team}
                <ListRow on:click={() => handleEdit(team)}>
                    <ListRowItem widthInPercentage={72}>{team.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>{team.usersAmount}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>{team.projectsAmount}</ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>

        <svelte:fragment slot="actions">
            <Button on:click={() => createVisible = true}>Create</Button>
        </svelte:fragment>
    </View>
</Card>
<TeamSettingsDialog lockable teamName={chosenTeam === null ? "" : chosenTeam.name} bind:visible={editVisible}/>
<TeamSettingsDialog bind:visible={createVisible}/>
<style lang="scss">
  @import "../../ui/theme";

</style>