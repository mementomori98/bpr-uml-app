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
    import {ProjectService} from "./ProjectService";
    import {CreateProjectRequest, addProjectUsersRequest} from "./Models";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {ProjectUserRequest, User, UserToProject, WorkspaceUsersResponse} from "../users/Models";
    import {createEventDispatcher, onMount} from "svelte";
    import {
        filterPickList,
        formList,
        getItem,
        getUserToProject,
        ListItem
    } from "../../ui/utils/ListItem";
    import {UserService} from "../users/UserService";

    export let visible: boolean = false;
    let projectName: string = "";

    const userService = getService(UserService);
    const projectService = getService(ProjectService);
    const appContext = getService(AppContext);
    const dispatch = createEventDispatcher();

    let users: WorkspaceUsersResponse[] = [];
    let pickList: ListItem[] = [];
    let selectedUsers: UserToProject[] = []

    onMount(async () => {
        const res = await userService.getWorkspaceUsers(appContext.getWorkspaceId());
        users = res.sort((u1, u2) => u1.name.localeCompare(u2.name));
        pickList = formList(users);
    })

    const handleCreate = async () => {
        let project = await projectService.create(new CreateProjectRequest({
            title: projectName,
            workspaceId: appContext.getWorkspaceId()
        }));

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

    const pickUser = (e) => {
        let user = getItem(users, e.detail.choice._id);
        selectedUsers.push(getUserToProject(user, true));
        pickList = filterPickList(pickList, e.detail.choice._id)
        selectedUsers = selectedUsers;
    }

    const closeUserChoice = (u) => {
        let user = getItem(users, u._id);
        pickList.push(user);
        selectedUsers = filterPickList(selectedUsers, user._id);
        pickList = formList(pickList);
    }
</script>

<Dialog bind:visible style="min-width: 600px">
    <Form on:submit={handleCreate} on:cancel={handleCancel} submitText="Create" cancelButton>
        <svelte:fragment slot="header">Create Project</svelte:fragment>
        <Input label="Project name" bind:value={projectName}/>
        <Select clearOnChoice label="Users to add" choices={pickList} on:submit={e => pickUser(e)}/>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={33}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={40}>Email</ListRowItem>
                    <ListRowItem widthInPercentage={10}>Can edit</ListRowItem>
                    <ListRowItem widthInPercentage={7}>Kick</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each selectedUsers as user}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={33}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={40}>{user.email}</ListRowItem>
                    <ListRowItem widthInPercentage={10}>
                        <Checkbox bind:checked={user.isEditor}
                                  on:checkChange={e => user.isEditor =e.detail.state }/>
                    </ListRowItem>
                    <ListRowItem widthInPercentage={7}>
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
