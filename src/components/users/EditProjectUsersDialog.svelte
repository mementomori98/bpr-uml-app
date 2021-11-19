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
    import {AppContext} from "../utils/AppContext";
    import getService from "../utils/ServiceFactory";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {ProjectUserRequest, User, UserToProject, WorkspaceUsersResponse} from "../users/Models";
    import {createEventDispatcher, onMount} from "svelte";
    import {
        filterList,
        formList,
        getItem,
        getUserToProject,
        ListItem, sortList
    } from "../../ui/utils/ListItem";
    import {UserService} from "../users/UserService";
    import {ProjectService} from "../projects/ProjectService";
    import {addProjectUsersRequest} from "../projects/Models";

    export let visible: boolean = false;

    const userService = getService(UserService);
    const projectService = getService(ProjectService);
    const appContext = getService(AppContext);
    const dispatch = createEventDispatcher();

    let users: WorkspaceUsersResponse[] = [];
    let pickList: ListItem[] = [];
    let selectedUsers: UserToProject[] = [];
    let currentUser;

    onMount(async () => {
        const res = await userService.getWorkspaceUsers(appContext.getWorkspaceId());
        users = sortList(res);
        pickList = formList(users);
        await handleOccurrence();
    })

    const handleOccurrence = async () => {
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        currentUser = await userService.getCurrentUser();
        pickList = filterList(pickList, currentUser._id)
    }

    const handleEdit = async () => {
        let project; //TODO DODODODODODODODODODODODO TODO

        await projectService.addProjectUsers(project._id, new addProjectUsersRequest({
            users: selectedUsers.map(person => {
                return new ProjectUserRequest({userId: person._id, isEditor: person.isEditor})
            })
        }));

        visible = false;
        dispatch('create')
    }

    const handleCancel = () => {
        visible = false;
    }

    const pickUser = (_id) => {
        let user = getItem(users, _id);
        selectedUsers.push(getUserToProject(user, true));
        pickList = filterList(pickList, _id)
        selectedUsers = sortList(selectedUsers);
    }

    const closeUserChoice = (u) => {
        let user = getItem(users, u._id);
        pickList.push(user);
        selectedUsers = filterList(selectedUsers, user._id);
        pickList = formList(pickList);
    }

</script>

<Dialog bind:visible style="min-width: 600px">
    <Form on:submit={handleEdit} on:cancel={handleCancel} submitText="Edit" cancelButton>
        <svelte:fragment slot="header">Edit project users</svelte:fragment>
        <Select clearOnChoice label="Users to add" choices={pickList} on:submit={e => pickUser(e.detail.choice._id)}/>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={40}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={40}>Email</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Can edit</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Kick</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#if currentUser}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={40}>{currentUser.name}</ListRowItem>
                    <ListRowItem widthInPercentage={40}>{currentUser.email}</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <Checkbox disabled checked/>
                    </ListRowItem>
                </ListRow>
            {/if}
            {#each selectedUsers as user}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={40}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={40}>{user.email}</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <Checkbox bind:checked={user.isEditor}
                                  on:checkChange={e => user.isEditor =e.detail.state }/>
                    </ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <CloseButton on:click={() => closeUserChoice(user)}/>
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
