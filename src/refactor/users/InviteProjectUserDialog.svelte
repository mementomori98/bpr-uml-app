<script lang="ts">
    import Dialog from "../../components/ui/Dialog.svelte";
    import Form from "../../components/ui/Form.svelte";
    import Button from "../../components/ui/Button.svelte";
    import {Colors} from "../../components/utils/Colors";
    import Input from "../../components/ui/Input.svelte";
    import Select from "../../components/ui/Select.svelte";
    import {User} from "./User";
    import {DataListItem} from "../../components/utils/DataListItem";
    import CloseButton from "../../components/ui/CloseButton.svelte";
    import ListRow from "../../components/ui/ListRow.svelte";
    import ListRowItem from "../../components/ui/ListRowItem.svelte";
    import ListScrollWrapper from "../../components/ui/ListScrollWrapper.svelte";

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
        alert("Invite")
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
        <Select clearOnChoice label="Users to add" choices={users} on:submit={e => pickUser(e)}/>
        <ListScrollWrapper>
            {#each usersToAdd as user}
                <ListRow noBorder={user === usersToAdd[usersToAdd.length-1]} style="justify-content: space-between; padding: 12px 32px">
                    {user.name}
                    <CloseButton on:click={() => closeUserChoice(user)}/>
                </ListRow>
            {/each}
        </ListScrollWrapper>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../components/theme";

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