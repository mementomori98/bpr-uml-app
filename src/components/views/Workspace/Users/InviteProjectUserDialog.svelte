<script lang="ts">
    import Dialog from "../../../ui/Dialog.svelte";
    import Form from "../../../ui/Form.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";
    import Input from "../../../ui/Input.svelte";
    import Select from "../../../ui/Select.svelte";
    import {User} from "../../../../services/users/User";
    import {DataListItem} from "../../../DataListItem";
    import CloseButton from "../../../ui/CloseButton.svelte";

    export let visible: boolean = false;

    let users = [
        new User({name: 'Ralu', email: 'ralu@bpr.com', status: 'Invited', role: 'Developer', canEdit: false, id: 1}),
        new User({name: 'Aron', email: 'aron@bpr.com', status: 'Active', role: 'Developer', canEdit: true, id: 2}),
        new User({name: 'Mate', email: 'mate@bpr.com', status: 'Invited', role: 'Product owner', canEdit: false, id: 3}),
        new User({name: 'Tony', email: 'aron@bpr.com', status: 'Active', role: 'Developer', canEdit: true, id: 4}),
        new User({name: 'Anne', email: 'mate@bpr.com', status: 'Invited', role: 'Product owner', canEdit: false, id: 5}),
        new User({name: 'Signe', email: 'aron@bpr.com', status: 'Active', role: 'Developer', canEdit: true, id: 6}),
        new User({name: 'Allan', email: 'mate@bpr.com', status: 'Invited', role: 'Product owner', canEdit: false, id: 7}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name)).map(person => {
        return new DataListItem(person.id, person.name)
    });

    let usersToAdd = []

    const handleInvite = () => {
        // todo

        visible = false;
    }

    const handleCancel = () => {

        visible = false;
    }

    const pickUser = (e) => {
        usersToAdd.push(e.detail.choice);

        users = users.filter(function(item){
            return item.id != e.detail.choice.id;
        });
        console.log(users,  e.detail.choice.id)
        usersToAdd = usersToAdd;
    }

    const closeUserChoice = (user) => {
        console.log(user)
        users.push(user);
        usersToAdd = usersToAdd.filter(function(item){
            return item.id != user.id;
        });
        users = users.sort((u1, u2) => u1.name.localeCompare(u2.name)).map(person => {
            return new DataListItem(person.id, person.name)
        });
    }

</script>

<Dialog bind:visible>
    <Form on:submit={handleInvite} on:cancel={handleCancel} submitText="Add" cancelButton>
        <svelte:fragment slot="header">Add User</svelte:fragment>
        {#each usersToAdd as user}
            <div class="wrapper">
                {user.name}
                <CloseButton on:click={() => closeUserChoice(user)}/>
            </div>

            <div class="divider"/>

        {/each}
        <Select clearOnChoice label="Users to add" choices={users} on:submit={e => pickUser(e)}/>
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