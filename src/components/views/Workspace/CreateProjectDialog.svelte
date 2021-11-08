<script lang="ts">
    import Form from "../../ui/Form.svelte";
    import Select from "../../ui/Select.svelte";
    import {User} from "../../../services/users/User";
    import {DataListItem} from "../../../services/DataListItem";
    import CloseButton from "../../ui/CloseButton.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import Dialog from "../../ui/Dialog.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import Checkbox from "../../ui/Checkbox.svelte";
    import {UserToProject} from "../../../services/users/UserToProject";
    import Input from "../../ui/Input.svelte";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";

    export let visible: boolean = false;
    let projectName: string = "";

    let testUsers = [
        new User({name: 'Ralu', email: 'ralu@bpr.com', status: 'Invited', role: 'Developer', canEdit: false, id: 1}),
        new User({name: 'Aron', email: 'aron@bpr.com', status: 'Active', role: 'Developer', canEdit: true, id: 2}),
        new User({
            name: 'Mate',
            email: 'mate@bpr.com',
            status: 'Invited',
            role: 'Product owner',
            canEdit: false,
            id: 3
        }),
        new User({name: 'Tony', email: 'aron@bpr.com', status: 'Active', role: 'Developer', canEdit: true, id: 4}),
        new User({
            name: 'Anne',
            email: 'mate@bpr.com',
            status: 'Invited',
            role: 'Product owner',
            canEdit: false,
            id: 5
        }),
        new User({name: 'Signe', email: 'aron@bpr.com', status: 'Active', role: 'Developer', canEdit: true, id: 6}),
        new User({
            name: 'Allan',
            email: 'mate@bpr.com',
            status: 'Invited',
            role: 'Product owner',
            canEdit: false,
            id: 7
        }),
    ];

    let listUsers = testUsers.sort((u1, u2) => u1.name.localeCompare(u2.name)).map(person => {
        return new DataListItem(person.id, person.name)
    });

    let projectUsers: UserToProject[] = []

    const handleCreate = () => {
        // todo
        alert("Project " + projectName + " has been created")
        console.log(projectUsers)
        visible = false;
    }

    const handleCancel = () => {

        visible = false;
    }

    function findUser(user, id) {
        return user.id === id;
    }


    const pickUser = (e) => {
        let user = testUsers.filter(function (item) {
            return item.id == e.detail.choice.id;
        })[0]
        projectUsers.push(new UserToProject({
            name: user.name,
            email: user.email,
            id: user.id,
            canEdit: true,
            role: "Developer"
        }));

        listUsers = listUsers.filter(function (item) {
            return item.id != e.detail.choice.id;
        });
        projectUsers = projectUsers;
    }

    const closeUserChoice = (u) => {
        let user = testUsers.filter(function (item) {
            return item.id == u.id;
        })[0]
        listUsers.push(user);
        projectUsers = projectUsers.filter(function (item) {
            return item.id != user.id;
        });
        listUsers = listUsers.sort((u1, u2) => u1.name.localeCompare(u2.name)).map(person => {
            return new DataListItem(person.id, person.name)
        });
    }

</script>

<Dialog bind:visible style="min-width: 600px">
    <Form on:submit={handleCreate} on:cancel={handleCancel} submitText="Create" cancelButton>
        <svelte:fragment slot="header">Create Project</svelte:fragment>
        <Input label="Project name" bind:value={projectName}/>
        <Select clearOnChoice label="Users to add" choices={listUsers} on:submit={e => pickUser(e)}/>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={20}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={30}>Email</ListRowItem>
                    <ListRowItem widthInPercentage={33}>Role</ListRowItem>
                    <ListRowItem widthInPercentage={10}>Can edit</ListRowItem>
                    <ListRowItem widthInPercentage={7}>Kick</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each projectUsers as user}
                <ListRow noBorder={user === projectUsers[projectUsers.length-1]} noFunction>
                    <ListRowItem widthInPercentage={20}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={30}>{user.email}</ListRowItem>
                    <ListRowItem widthInPercentage={33}>{user.role}</ListRowItem>
                    <ListRowItem widthInPercentage={10}>
                        <Checkbox bind:checked={user.canEdit}
                                  on:checkChange={e => console.log("")}/>
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
  @import "../../theme.scss";

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