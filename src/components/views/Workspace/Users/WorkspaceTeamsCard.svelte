<script lang="ts">
    import Card from "../../../ui/Card.svelte";
    import {User} from "../../../../services/users/User";
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import InviteUserDialog from "./InviteUserDialog.svelte";
    import UserSettingsDialog from "./UserSettingsDialog.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import ListRow from "../../../ui/ListRow.svelte";
    import {Team} from "../../../../services/teams/Team";
    import CloseButton from "../../../ui/CloseButton.svelte";
    import TeamSettingsDialog from "./TeamSettingsDialog.svelte";
    import ListScrollWrapper from "../../../ui/ListScrollWrapper.svelte";


    let teams = [
        new Team({name: 'Core', usersAmount: 5, projectsAmount: 3}),
        new Team({name: 'Mercury', usersAmount: 7, projectsAmount: 1}),
        new Team({name: 'Titan', usersAmount: 3, projectsAmount: 2}),
        new Team({name: 'Maverick', usersAmount: 11, projectsAmount: 6}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

    let createVisible: boolean = false;
    let itemSettingsVisible: boolean = false;
    let chosenTeam: Team = null;


    const handleClick = (team) => {
        // todo
        chosenTeam = team
        itemSettingsVisible = true
    }

    const removeTeam = (team: Team) => {
        // todo
        alert(team.name + " to be removed")
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Teams</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <ListRow isHeader>
            <ListRowItem widthInPercentage={64}>Name</ListRowItem>
            <ListRowItem widthInPercentage={12}>Users</ListRowItem>
            <ListRowItem widthInPercentage={12}>Projects</ListRowItem>
            <ListRowItem widthInPercentage={12}>Remove</ListRowItem>
        </ListRow>
        <ListScrollWrapper>
            {#each teams as team}
                <ListRow noBorder={team === teams[teams.length-1]} on:click={() => handleClick(team)}>
                    <ListRowItem widthInPercentage={64}>{team.name}</ListRowItem>
                    <ListRowItem widthInPercentage={12}>{team.usersAmount}</ListRowItem>
                    <ListRowItem widthInPercentage={12}>{team.projectsAmount}</ListRowItem>
                    <ListRowItem widthInPercentage={12}>
                        <CloseButton on:click={() => removeTeam(team)}/>
                        <!-- TODO disabled if not admin, or not created by the user--></ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>

        <svelte:fragment slot="actions">
            <Button on:click={() => createVisible = true}>Invite</Button>
        </svelte:fragment>
    </View>
</Card>
<TeamSettingsDialog lockable teamName={chosenTeam === null ? "" : chosenTeam.name} bind:visible={itemSettingsVisible}/>
<TeamSettingsDialog bind:visible={createVisible}/>
<style lang="scss">
  @import "../../../theme";

</style>