<script lang="ts">
    import Dialog from "../../../ui/Dialog.svelte";
    import Form from "../../../ui/Form.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/utils/Colors";
    import Input from "../../../ui/Input.svelte";
    import Select from "../../../ui/Select.svelte";
    import {User} from "../../../../services/users/User";
    import {DataListItem} from "../../../../services/DataListItem";
    import CloseButton from "../../../ui/CloseButton.svelte";
    import ListRow from "../../../ui/ListRow.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import {Team} from "../../../../services/teams/Team";
    import ListScrollWrapper from "../../../ui/ListScrollWrapper.svelte";

    export let visible: boolean = false;
    let teams = [
        new Team({name: 'Core', usersAmount: 5, projectsAmount: 3, id: 1}),
        new Team({name: 'Mercury', usersAmount: 7, projectsAmount: 1, id: 2}),
        new Team({name: 'Titan', usersAmount: 3, projectsAmount: 2, id: 3}),
        new Team({name: 'Maverick', usersAmount: 11, projectsAmount: 6, id: 4}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name)).map(team => {
        return new DataListItem(team.id, team.name)
    });

    let teamsToAdd = []

    const handleInvite = () => {
        // todo
        alert("Invite")
        visible = false;
    }

    const handleCancel = () => {
        visible = false;
    }

    const pickTeam = (e) => {
        teamsToAdd.push(e.detail.choice);

        teams = teams.filter(function(item){
            return item.id != e.detail.choice.id;
        });
        console.log(teams,  e.detail.choice.id)
        teamsToAdd = teamsToAdd;
    }

    const closeTeamChoice = (team) => {
        console.log(team)
        teams.push(team);
        teamsToAdd = teamsToAdd.filter(function(item){
            return item.id != team.id;
        });
        teams = teams.sort((u1, u2) => u1.name.localeCompare(u2.name)).map(team => {
            return new DataListItem(team.id, team.name)
        });
    }

</script>

<Dialog bind:visible>
    <Form on:submit={handleInvite} on:cancel={handleCancel} submitText="Add" cancelButton>
        <svelte:fragment slot="header">Add Team</svelte:fragment>
        <Select clearOnChoice label="Teams to add" choices={teams} on:submit={e => pickTeam(e)}/>
        <ListScrollWrapper>
            {#each teamsToAdd as team}
                <ListRow noBorder={team === teamsToAdd[teamsToAdd.length-1]} style="justify-content: space-between; padding: 12px 32px">
                    {team.name}
                    <CloseButton on:click={() => closeTeamChoice(team)}/>
                </ListRow>
            {/each}
        </ListScrollWrapper>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../../theme.scss";

  .wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 45px;
  }
  .divider {
    border-bottom: .5px solid rgba(0, 0, 0, .2);
  }


</style>