<script lang="ts">
    import Form from "../../ui/Form.svelte";
    import Select from "../../ui/Select.svelte";
    import CloseButton from "../../ui/CloseButton.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import Dialog from "../../ui/Dialog.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import Checkbox from "../../ui/Checkbox.svelte";
    import Input from "../../ui/Input.svelte";
    import {AppContext} from "../utils/AppContext";
    import getService from "../utils/ServiceFactory";
    import {ProjectService} from "./ProjectService";
    import {CreateProjectRequest, AddProjectUsersRequest} from "./Models";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {ProjectUserRequest, UserToProject, WorkspaceUsersResponse} from "../users/Models";
    import {createEventDispatcher, onMount} from "svelte";
    import {
        filterListById,
        formList,
        getItem,
        getUserToProject,
        ListItem, sortList
    } from "../../ui/utils/ListItem";
    import {UserService} from "../users/UserService";

    export let visible: boolean = false;
    let projectName: string = "";

    const userService = getService(UserService);
    const projectService = getService(ProjectService);
    const appContext = getService(AppContext);
    const dispatch = createEventDispatcher();

    let workspaceUsers: WorkspaceUsersResponse[] = [];
    let pickList: ListItem[] = [];
    let selectedUsers: UserToProject[] = [];
    let currentUser;

    onMount(async () => {
        await fetch()
    })

    const fetch = async () => {
        const res = await userService.getWorkspaceUsers(appContext.getWorkspaceId());
        workspaceUsers = sortList(res);
        pickList = formList(workspaceUsers);
        await handleOccurrence();
    }

    const handleOccurrence = async () => {
        currentUser = await userService.getCurrentUser();
        pickList = filterListById(pickList, currentUser._id)
        selectedUsers.push(getUserToProject(currentUser, true, true));
        selectedUsers = sortList(selectedUsers);
    }

    const handleCreate = async () => {
        let project = await projectService.create(new CreateProjectRequest({
            title: projectName,
            workspaceId: appContext.getWorkspaceId()
        }));

        await projectService.manageProjectUsers(project._id, new AddProjectUsersRequest({
            users: selectedUsers.map(person => {
                return new ProjectUserRequest({userId: person._id, isEditor: person.isEditor, isProjectManager: person.isProjectManager})
            })
        }));

        visible = false;
        clean()
        dispatch('create')
    }

    const handleCancel = () => {
        visible = false;
        clean()
    }

    const clean = () => {
        projectName = "";
        workspaceUsers = [];
        pickList = [];
        selectedUsers = [];
        fetch()
    }

    const pickUser = (_id) => {
        let user = getItem(workspaceUsers, _id);
        selectedUsers.push(getUserToProject(user, true, false));
        pickList = filterListById(pickList, _id)
        selectedUsers = sortList(selectedUsers);
    }

    const closeUserChoice = (u) => {
        let user = getItem(workspaceUsers, u._id);
        pickList.push(user);
        selectedUsers = filterListById(selectedUsers, user._id);
        pickList = formList(pickList);
    }

</script>

<Dialog bind:visible style="min-width: 600px">
    <Form on:submit={handleCreate} on:cancel={handleCancel} submitText="Create" cancelButton>
        <svelte:fragment slot="header">Create Project</svelte:fragment>
        <Input label="Project name" bind:value={projectName}/>
        <Select clearOnChoice label="Users to add" choices={pickList} on:submit={e => pickUser(e.detail.choice._id)}/>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={35}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={35}>Email</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Is PM</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Can edit</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Kick</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each selectedUsers as user}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={35}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={35}>{user.email}</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <Checkbox disabled={user._id === currentUser?._id} bind:checked={user.isProjectManager}
                                  on:checkChange={e => user.isProjectManager =e.detail.state }/>
                    </ListRowItem>
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
