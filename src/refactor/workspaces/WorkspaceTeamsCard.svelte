<script lang="ts">
    import Card from "../../components/ui/Card.svelte";
    import {User} from "../users/User";
    import View from "../../components/ui/View.svelte";
    import Button from "../../components/ui/Button.svelte";
    import InviteUserDialog from "../users/InviteUserDialog.svelte";
    import UserSettingsDialog from "../users/UserSettingsDialog.svelte";
    import ListRowItem from "../../components/ui/ListRowItem.svelte";
    import ListRow from "../../components/ui/ListRow.svelte";
    import {Team} from "../teams/Team";
    import CloseButton from "../../components/ui/CloseButton.svelte";
    import TeamSettingsDialog from "../teams/TeamSettingsDialog.svelte";
    import ListScrollWrapper from "../../components/ui/ListScrollWrapper.svelte";


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
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={56}>Name</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>Users</ListRowItem>
                    <ListRowItem center widthInPercentage={16}>Projects</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>Remove</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each teams as team}
                <ListRow noBorder={team === teams[teams.length-1]} on:click={() => handleClick(team)}>
                    <ListRowItem widthInPercentage={56}>{team.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>{team.usersAmount}</ListRowItem>
                    <ListRowItem center widthInPercentage={16}>{team.projectsAmount}</ListRowItem>
                    <ListRowItem center widthInPercentage={14}>
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
  @import "../../components/theme";

</style>