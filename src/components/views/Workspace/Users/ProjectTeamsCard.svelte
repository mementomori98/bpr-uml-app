<script lang="ts">
    import Card from "../../../ui/Card.svelte";
    import {User} from "../../../../services/users/User";
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import UserSettingsDialog from "./UserSettingsDialog.svelte";
    import InviteProjectUserDialog from "./InviteProjectUserDialog.svelte";
    import Checkbox from "../../../ui/Checkbox.svelte";
    import CloseButton from "../../../ui/CloseButton.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import ListRow from "../../../ui/ListRow.svelte";
    import {goto, params} from "@roxi/routify";
    import {Team} from "../../../../services/teams/Team";
    import InviteTeamDialog from "./InviteTeamDialog.svelte";
    import TeamSettingsDialog from "./TeamSettingsDialog.svelte";
    import ListScrollWrapper from "../../../ui/ListScrollWrapper.svelte";

    let teams = [
        new Team({name: 'Core', usersAmount: 5, projectsAmount: 3}),
        new Team({name: 'Mercury', usersAmount: 7, projectsAmount: 1}),
        new Team({name: 'Titan', usersAmount: 3, projectsAmount: 2}),
        new Team({name: 'Maverick', usersAmount: 11, projectsAmount: 6}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

    let addVisible: boolean = false;
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
                    <ListRowItem widthInPercentage={64}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={12}>Users</ListRowItem>
                    <ListRowItem widthInPercentage={12}>Projects</ListRowItem>
                    <ListRowItem widthInPercentage={12}>Remove</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each teams as team}
                <ListRow noBorder={team === teams[teams.length-1]} on:click={() => handleClick(team)}>
                    <ListRowItem widthInPercentage={64}>{team.name}</ListRowItem>
                    <ListRowItem widthInPercentage={12}>{team.usersAmount}</ListRowItem>
                    <ListRowItem widthInPercentage={12}>{team.projectsAmount}</ListRowItem>
                    <ListRowItem widthInPercentage={12}>
                        <CloseButton on:click={() => removeTeamFromProject(team)}/>
                        <!-- TODO disabled if not product owner --></ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>
        <svelte:fragment slot="actions"> <!-- TODO disabled if not product owner-->
            <Button on:click={() => addVisible = true}>Add</Button>
        </svelte:fragment>
    </View>
</Card>

<InviteTeamDialog bind:visible={addVisible}/>
<TeamSettingsDialog readonly bind:visible={itemViewVisible} teamName={chosenTeam === null ? "" : chosenTeam.name}/>

<style lang="scss">
  @import "../../../theme";

</style>