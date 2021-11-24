<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import UserSettingsDialog from "../users/UserSettingsDialog.svelte";
    import InviteProjectUserDialog from "../users/EditProjectUsersDialog.svelte";
    import Checkbox from "../../ui/Checkbox.svelte";
    import CloseButton from "../../ui/CloseButton.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import {goto, params} from "@roxi/routify";
    import {Team, TeamResponse} from "../teams/Models";
    import EditTeamsDialog from "../teams/EditTeamsDialog.svelte";
    import TeamSettingsDialog from "../teams/TeamSettingsDialog.svelte";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {onMount} from "svelte";
    import {sortUserList} from "../../ui/utils/ListItem";
    import getService from "../utils/ServiceFactory";
    import {UserService} from "../users/UserService";
    import {AppContext} from "../utils/AppContext";
    import {TeamService} from "../teams/TeamService";

    const teamsService = getService(TeamService);
    const appContext = getService(AppContext);

    let editVisible: boolean = false;
    let readVisible: boolean = false;
    let chosenTeam: Team = null;
    let teams = []

    onMount(async () => {
        teams = await teamsService.getProjectTeams($params.id)
    })

    const handleClick = (team) => {
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
                <ListRow on:click={() => handleClick(team)}>
                    <ListRowItem widthInPercentage={72}>{team.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>{team.usersAmount}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>{team.projectsAmount}</ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>
        <svelte:fragment slot="actions"> <!-- TODO disabled if not product owner-->
            <Button on:click={() => editVisible = true}>Edit</Button>
        </svelte:fragment>
    </View>
</Card>

<EditTeamsDialog bind:visible={editVisible}/>
<TeamSettingsDialog readonly bind:visible={readVisible} teamName={chosenTeam === null ? "" : chosenTeam.name}/>

<style lang="scss">
  @import "../../ui/theme";

</style>