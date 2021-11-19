<script lang="ts">
    import Form from "../../ui/Form.svelte";
    import Select from "../../ui/Select.svelte";
    import {DataListItem} from "../../ui/utils/DataListItem";
    import CloseButton from "../../ui/CloseButton.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import Dialog from "../../ui/Dialog.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import Checkbox from "../../ui/Checkbox.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {User, UserToTeam} from "../users/Models";
    import {CreateProjectRequest} from "../projects/Models";
    import getService from "../utils/ServiceFactory";
    import {ProjectService} from "../projects/ProjectService";
    import {TeamService} from "./TeamService";
    import {CreateTeamRequest} from "./Models";
    import {AppContext} from "../utils/AppContext";

    export let visible: boolean = false;

    const teamService = getService(TeamService);
    const appContext = getService(AppContext);

    let teams = [].sort((u1, u2) => u1.name.localeCompare(u2.name)).map(team => {
        return new DataListItem(team.id, team.name)
    });

    let teamsToAdd = []

    const handleEdit = () => {
        // todo
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
        teamsToAdd = teamsToAdd;
    }

    const closeTeamChoice = (team) => {
        teams.push(team);
        teamsToAdd = teamsToAdd.filter(function(item){
            return item.id != team.id;
        });
        teams = teams.sort((u1, u2) => u1.name.localeCompare(u2.name)).map(team => {
            return new DataListItem(team.id, team.name)
        });
    }

</script>

<Dialog bind:visible style="min-width: 600px">
    <Form
            on:submit={handleEdit} cancelButton on:cancel={handleCancel}
            submitText="Edit">
        <svelte:fragment slot="header">Edit teams</svelte:fragment>
        <Select clearOnChoice label="Teams to add" choices={teams} on:submit={e => pickTeam(e)}/>

        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={90}>Name</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Kick</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each teamsToAdd as team}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={90}>{team.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <CloseButton on:click={() => closeTeamChoice(team)}/>
                    </ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../ui/theme";

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 45px;
  }

  .divider {
    border-bottom: .5px solid rgba(0, 0, 0, .2);
  }


</style>