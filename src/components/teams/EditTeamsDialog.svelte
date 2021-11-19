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

    let testUsers = [];

    let listUsers = testUsers.sort((u1, u2) => u1.name.localeCompare(u2.name)).map(person => {
        return new DataListItem(person.id, person.name)
    });

    let teamUsers: UserToTeam[] = []

    const handleCreate = async () => {


        visible = false;
    }

    const handleEdit = () => {

    }

    const handleCancel = () => {
        visible = false;
    }

    const pickTeam = (e) => {
        let user = testUsers.filter(function (item) {
            return item.id == e.detail.choice.id;
        })[0]
        teamUsers.push(new UserToTeam({
            name: user.name,
            email: user.email,
            id: user.id,
            canEdit: true,
            role: "Developer"
        }));
        teamUsers.sort((u1, u2) => u1.name.localeCompare(u2.name))

        listUsers = listUsers.filter(function (item) {
            return item.id != e.detail.choice.id;
        });

        teamUsers = teamUsers;
    }

    const closeTeamChoice = (u) => {
        let user = testUsers.filter(function (item) {
            return item.id == u.id;
        })[0]
        listUsers.push(user);
        teamUsers = teamUsers.filter(function (item) {
            return item.id != user.id;
        });
        listUsers = listUsers.sort((u1, u2) => u1.name.localeCompare(u2.name)).map(person => {
            return new DataListItem(person.id, person.name)
        });
    }

</script>

<Dialog bind:visible style="min-width: 600px">
    <Form
            on:submit={handleEdit} cancelButton on:cancel={handleCancel}
            submitText="Edit">
        <svelte:fragment slot="header">Edit team</svelte:fragment>
        <Select clearOnChoice label="Users to add" choices={listUsers} on:submit={e => pickTeam(e)}/>

        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={43}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={50}>Email</ListRowItem>
                    <ListRowItem center widthInPercentage={7}>Kick</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each teamUsers as user}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={43}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={50}>{user.email}</ListRowItem>
                    <ListRowItem center widthInPercentage={7}>
                        <CloseButton on:click={() => closeTeamChoice(user)}/>
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