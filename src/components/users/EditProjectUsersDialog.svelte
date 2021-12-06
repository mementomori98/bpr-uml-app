<script lang="ts">
    import Form from "../../ui/Form.svelte";
    import Select from "../../ui/Select.svelte";
    import CloseButton from "../../ui/CloseButton.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import Dialog from "../../ui/Dialog.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import Checkbox from "../../ui/Checkbox.svelte";
    import {AppContext} from "../utils/AppContext";
    import getService from "../utils/ServiceFactory";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {ProjectUserRequest, UserToProject, WorkspaceUsersResponse} from "../users/Models";
    import {createEventDispatcher} from "svelte";
    import {
        filterListById, filterListByList,
        formList,
        getItem,
        getUserToProject,
        ListItem, sortList
    } from "../../ui/utils/ListItem";
    import {UserService} from "../users/UserService";
    import {ProjectService} from "../projects/ProjectService";
    import {AddProjectUsersRequest, ProjectResponse} from "../projects/Models";
    import {params} from "@roxi/routify";

    export let visible: boolean = false;

    const userService = getService(UserService);
    const projectService = getService(ProjectService);
    const appContext = getService(AppContext);
    const dispatch = createEventDispatcher();

    let project: ProjectResponse = new ProjectResponse({title: "", users: [], teams: [], _id: "", workspaceId: ""});

    let workspaceUsers: WorkspaceUsersResponse[] = [];
    let pickList: ListItem[] = [];
    let selectedUsers: UserToProject[] = [];
    let currentUser;

    export async function open() {
        project = await projectService.getProject($params.id)
        project.users.forEach(function(o) {
            Object.defineProperty(o, '_id',
                Object.getOwnPropertyDescriptor(o, 'userId'));
            delete o['userId'];
        });
        const res = await userService.getWorkspaceUsers(appContext.getWorkspaceId());
        workspaceUsers = sortList(res);
        pickList = formList(workspaceUsers);
        await handleOccurrence();
    }

    const handleOccurrence = async () => {
        currentUser = await userService.getCurrentUser();
        pickList = filterListByList(pickList, project.users)
        project.users.forEach(user => {
            selectedUsers.push(getUserToProject(user.user, user.isEditor));
        })
        selectedUsers = sortList(selectedUsers);
    }

    const handleEdit = async () => {
        await projectService.manageProjectUsers(project._id, new AddProjectUsersRequest({
            users: selectedUsers.map(person => {
                return new ProjectUserRequest({userId: person._id, isEditor: person.isEditor})
            })
        }));

        visible = false;
        resetDialog()
        dispatch('edit')
    }

    const handleCancel = () => {
        visible = false;
        resetDialog()
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

    const resetDialog = () => {
        project = new ProjectResponse({title: "", users: [], teams: [], _id: "", workspaceId: ""});
        workspaceUsers = [];
        pickList = [];
        selectedUsers = [];
        currentUser = null;
    }

</script>

<Dialog on:clickedOut={handleCancel} bind:visible style="min-width: 600px">
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
            {#each selectedUsers as user}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={40}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={40}>{user.email}</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <Checkbox disabled={user._id === currentUser?._id} bind:checked={user.isEditor}
                                  on:checkChange={e => user.isEditor =e.detail.state }/>
                    </ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <CloseButton disabled={user._id === currentUser?._id} on:click={() => closeUserChoice(user)}/>
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
