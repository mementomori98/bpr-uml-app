<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import InviteUserDialog from "../users/InviteUserDialog.svelte";
    import UserSettingsDialog from "../users/UserSettingsDialog.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import {Team} from "../teams/Models";
    import CloseButton from "../../ui/CloseButton.svelte";
    import TeamSettingsDialog from "../teams/TeamSettingsDialog.svelte";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {onMount} from "svelte";
    import getService from "../utils/ServiceFactory";
    import {UserService} from "../users/UserService";


    let teams = [].sort((u1, u2) => u1.name.localeCompare(u2.name));

    const userService = getService(UserService);

    let createVisible: boolean = false;
    let itemSettingsVisible: boolean = false;
    let chosenTeam: Team = null;

    onMount(async () => {
        const res = await userService.getUserTeams();
    })

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
                <ListRow on:click={() => handleClick(team)}>
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
            <Button on:click={() => createVisible = true}>Create</Button>
        </svelte:fragment>
    </View>
</Card>
<TeamSettingsDialog lockable teamName={chosenTeam === null ? "" : chosenTeam.name} bind:visible={itemSettingsVisible}/>
<TeamSettingsDialog bind:visible={createVisible}/>
<style lang="scss">
  @import "../../ui/theme";

</style>