<script lang="ts">
    import Form from "../../ui/Form.svelte";
    import Select from "../../ui/Select.svelte";
    import CloseButton from "../../ui/CloseButton.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import Dialog from "../../ui/Dialog.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {TeamUserRequest, UserToTeam, WorkspaceUsersResponse} from "../users/Models";
    import getService from "../utils/ServiceFactory";
    import {TeamService} from "./TeamService";
    import {AddTeamUsersRequest, CreateTeamRequest, RenameTeamRequest, TeamResponse} from "./Models";
    import {AppContext} from "../utils/AppContext";
    import {createEventDispatcher} from "svelte";
    import {
        checkIfEmpty,
        filterListById,
        filterListByList,
        formList, getItem,
        getUserToProject,
        getUserToTeam,
        ListItem,
        sortList
    } from "../../ui/utils/ListItem";
    import {params} from "@roxi/routify";
    import {UserService} from "../users/UserService";
    import ConfirmDialog from "../workspaces/ConfirmDialog.svelte";

    export let visible: boolean = false;
    export let readonly: boolean = false;
    export let lockable: boolean = readonly;
    let teamName: string = "";
    export let teamId: string = "";

    let locked: boolean = true;
    let deleteVisible: boolean = false;

    const userService = getService(UserService);
    const teamService = getService(TeamService);
    const appContext = getService(AppContext);
    const dispatch = createEventDispatcher();
    let hasPermission: boolean = false;

    let team: TeamResponse = new TeamResponse({_id: "", name: "", users: [], workspaceId: ""});

    let workspaceUsers: WorkspaceUsersResponse[] = [];
    let pickList: ListItem[] = [];
    let selectedUsers: UserToTeam[] = [];

    $: onEditMount(teamId);

    export async function open() {
        const res = await userService.getWorkspaceUsers(appContext.getWorkspaceId());
        workspaceUsers = sortList(res);
        pickList = formList(workspaceUsers);
    }

    const onEditMount = async (id: string) => {
        hasPermission = await userService.validateWorkspacePermissions('MANAGE_TEAMS')
        if (id === "") return
        team = await teamService.getTeam(id)
        teamName = team.name
        if (!checkIfEmpty(team.users)) {
            team.users.forEach(function (o) {
                Object.defineProperty(o, '_id',
                    Object.getOwnPropertyDescriptor(o, 'userId'));
                delete o['userId'];
            });
        }

        const res = await userService.getWorkspaceUsers(appContext.getWorkspaceId());
        workspaceUsers = sortList(res);
        pickList = formList(workspaceUsers);
        await handleOccurrence();
    }

    const handleOccurrence = async () => {
        pickList = filterListByList(pickList, team.users)
        if (!checkIfEmpty(team.users)) {
            team.users.forEach(user => {
                selectedUsers.push(getUserToTeam(user.user));
            })
        }
        selectedUsers = sortList(selectedUsers);
    }


    const handleCreate = async () => {
        const res = await teamService.create(new CreateTeamRequest({
            name: teamName,
            workspaceId: appContext.getWorkspaceId()
        }));

        await teamService.manageTeamUsers(res._id, new AddTeamUsersRequest({
            users: selectedUsers.map(person => {
                return new TeamUserRequest({userId: person._id})
            })
        }));

        visible = false;
        resetDialog()
        dispatch('create')
    }

    const handleEdit = async () => {
        await teamService.manageTeamUsers(team._id, new AddTeamUsersRequest({
            users: selectedUsers.map(person => {
                return new TeamUserRequest({userId: person._id})
            })
        }));

        await teamService.renameTeam(team._id, new RenameTeamRequest({
            name: teamName
        }));

        visible = false;
        resetDialog()
        dispatch('edit')
    }

    const handleCancelDialog = () => {
        let tId = teamId;
        resetDialog()
        onEditMount(tId)
    }

    const handleCloseDialog = () => {
        visible = false;
        locked = true
        resetDialog()
    }

    const resetDialog = () => {
        teamName = "";
        teamId = "";
        team = new TeamResponse({_id: "", name: "", users: [], workspaceId: ""});
        workspaceUsers = [];
        pickList = [];
        selectedUsers = [];
    }

    const pickUser = (_id) => {
        let user = getItem(workspaceUsers, _id);
        selectedUsers.push(getUserToProject(user, true));
        pickList = filterListById(pickList, _id)
        selectedUsers = sortList(selectedUsers);
    }

    const closeUserChoice = (u) => {
        let user = getItem(workspaceUsers, u._id);
        pickList.push(user);
        selectedUsers = filterListById(selectedUsers, user._id);
        pickList = formList(pickList);
    }

    const deleteTeam = async () => {
        await teamService.deleteTeam(team._id);
        visible = false;
        resetDialog()
        dispatch('edit')
    }

</script>

<Dialog on:clickedOut={handleCloseDialog} bind:visible style="min-width: 600px">
    <Form readonly={readonly || !hasPermission} bind:locked lockable={lockable}
          on:submit={() => lockable ? handleEdit() : handleCreate()} cancelButton={!lockable}
          on:cancel={handleCancelDialog}
          submitText={lockable ? "Update" : "Create"}>
        <svelte:fragment slot="header">{locked ? "Team" : "Edit team"}</svelte:fragment>
        <svelte:fragment slot="header-actions">
            {#if hasPermission && !readonly}
                <Button small color={Colors.Red} on:click={() => deleteVisible = true}>Delete Team</Button>
            {/if}
        </svelte:fragment>
        <Input locked={locked && lockable} label="Team name" bind:value={teamName}/>
        {#if !locked || !lockable}
            <Select clearOnChoice label="Users to add" choices={pickList}
                    on:submit={e => pickUser(e.detail.choice._id)}/>
        {/if}
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={43}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={50}>Email</ListRowItem>
                    {#if !locked || !lockable}
                        <ListRowItem center widthInPercentage={7}>Kick</ListRowItem>
                    {/if}
                </ListRow>
            </svelte:fragment>
            {#each selectedUsers as user}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={43}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={50}>{user.email}</ListRowItem>
                    {#if !locked || !lockable}
                        <ListRowItem center widthInPercentage={7}>
                            <CloseButton on:click={() => closeUserChoice(user)}/>
                        </ListRowItem>
                    {/if}
                </ListRow>
            {/each}
        </ListScrollWrapper>
        <svelte:fragment slot="footer-actions">
            {#if lockable}
                <Button color={Colors.Gray} on:click={handleCloseDialog}>Close</Button>
            {/if}
        </svelte:fragment>
    </Form>
</Dialog>
<ConfirmDialog on:confirm={deleteTeam} title="Delete Team" description="Confirm team removal. This action cannot be reverted!" bind:visible={deleteVisible}/>


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