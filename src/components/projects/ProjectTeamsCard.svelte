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
    import {Team} from "../teams/Models";
    import EditTeamsDialog from "../teams/EditTeamsDialog.svelte";
    import TeamSettingsDialog from "../teams/TeamSettingsDialog.svelte";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";

    let teams = [
        new Team({name: 'Core', usersAmount: 5, projectsAmount: 3}),
        new Team({name: 'Mercury', usersAmount: 7, projectsAmount: 1}),
        new Team({name: 'Titan', usersAmount: 3, projectsAmount: 2}),
        new Team({name: 'Maverick', usersAmount: 11, projectsAmount: 6}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

    let editVisible: boolean = false;
    let itemViewVisible: boolean = false;
    let chosenTeam: Team = null;


    const handleClick = (team) => {
        // todo
        itemViewVisible = true
        chosenTeam = team
    }

    const removeTeamFromProject = (team) => {
        alert(team.name + " to be removed from project") //TODO implement & if(product owner)
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Teams in {$params.id}</svelte:fragment>
        <!-- TODO disabled if not product owner-->
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={58}>Name</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>Users</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>Projects</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>Remove</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each teams as team}
                <ListRow on:click={() => handleClick(team)}>
                    <ListRowItem widthInPercentage={58}>{team.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>{team.usersAmount}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>{team.projectsAmount}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>
                        <CloseButton on:click={() => removeTeamFromProject(team)}/>
                        <!-- TODO disabled if not product owner --></ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>
        <svelte:fragment slot="actions"> <!-- TODO disabled if not product owner-->
            <Button on:click={() => editVisible = true}>Edit</Button>
        </svelte:fragment>
    </View>
</Card>

<EditTeamsDialog bind:visible={editVisible}/>
<TeamSettingsDialog readonly bind:visible={itemViewVisible} teamName={chosenTeam === null ? "" : chosenTeam.name}/>

<style lang="scss">
  @import "../../ui/theme";

</style>