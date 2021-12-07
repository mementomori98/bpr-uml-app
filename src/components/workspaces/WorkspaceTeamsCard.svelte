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
    import {AppContext} from "../utils/AppContext";
    import {UserService} from "../users/UserService";


    let teams = [];

    const userService = getService(UserService);
    const teamsService = getService(TeamService);
    const appContext = getService(AppContext);
    let hasPermissions: boolean = false;
    let child;

    let createVisible: boolean = false;
    let editVisible: boolean = false;
    let chosenTeam: Team = null;

    onMount(async () => {
        hasPermissions = await userService.validateWorkspacePermissions('MANAGE_TEAMS')
        teams = await teamsService.getWorkspaceTeams(appContext.getWorkspaceId())
    })

    const fetch = async () => {
        teams = await teamsService.getWorkspaceTeams(appContext.getWorkspaceId())
    }

    const handleEdit = (team) => {
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
                    <ListRowItem widthInPercentage={90}>Name</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Users</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each teams as team}
                <ListRow on:click={() => handleEdit(team)}>
                    <ListRowItem widthInPercentage={90}>{team.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>{team.users.length}</ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>

        <svelte:fragment slot="actions">
            {#if hasPermissions}
                <Button on:click={() =>
                {
                    createVisible = true;
                    child.open()
                }}>Create
                </Button>
            {/if}

        </svelte:fragment>
    </View>
</Card>
<TeamSettingsDialog lockable on:edit={fetch} teamId={chosenTeam === null ? "" : chosenTeam._id}
                    bind:visible={editVisible}/>
<TeamSettingsDialog bind:this={child} bind:visible={createVisible} on:create={fetch}/>
<style lang="scss">
  @import "../../ui/theme";

</style>