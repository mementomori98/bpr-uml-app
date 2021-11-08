<script lang="ts">
    import Form from "../../../ui/Form.svelte";
    import Select from "../../../ui/Select.svelte";
    import {User} from "../../../../services/users/User";
    import {DataListItem} from "../../../../services/DataListItem";
    import CloseButton from "../../../ui/CloseButton.svelte";
    import ListRow from "../../../ui/ListRow.svelte";
    import Dialog from "../../../ui/Dialog.svelte";
    import ListRowItem from "../../../ui/ListRowItem.svelte";
    import Checkbox from "../../../ui/Checkbox.svelte";
    import Input from "../../../ui/Input.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";
    import {UserToTeam} from "../../../../services/users/UserToTeam";
    import ListScrollWrapper from "../../../ui/ListScrollWrapper.svelte";

    export let visible: boolean = false;
    export let readonly: boolean = false;
    export let lockable: boolean = readonly;
    export let teamName: string = "";

    let locked: boolean = true;

    let testUsers = [
        new User({name: 'Ralu', email: 'ralu@bpr.com', id: 1}),
        new User({name: 'Aron', email: 'aron@bpr.com', id: 2}),
        new User({
            name: 'Mate',
            email: 'mate@bpr.com',
            id: 3
        }),
        new User({name: 'Tom', email: 'aron@bpr.com', id: 4}),
        new User({
            name: 'Anne',
            email: 'mate@bpr.com',
            id: 5
        }),
        new User({name: 'Signe', email: 'aron@bpr.com', id: 6}),
        new User({
            name: 'Allan',
            email: 'mate@bpr.com',
            id: 7
        }),
    ];

    let listUsers = testUsers.sort((u1, u2) => u1.name.localeCompare(u2.name)).map(person => {
        return new DataListItem(person.id, person.name)
    });

    let teamUsers: UserToTeam[] = [
        new UserToTeam({name: "Zuzanne", email: "susanne@bpr.com", id: 8}),
        new UserToTeam({name: "Bala", email: "balatoni1@langos.hu", id: 9}),
        new UserToTeam({name: "Tony", email: "balatoni2@langos.hu", id: 10}),
    ] //DUMMYOFDUMMY

    const handleCreate = () => {
        // todo
        visible = false;
        alert("Team " + teamName + " has been created")
    }

    const handleUpdate = () => {
        // todo
        alert("Team " + teamName + " has been updated")
    }

    const handleCancel = () => {
        if (lockable) {
            if (!locked) {
                visible = false;
                locked = true;
            }
        } else {
            visible = false;
        }
    }

    const handleClose = () => {
        visible = false;
        locked = true
    }

    const pickUser = (e) => {
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

    const closeUserChoice = (u) => {
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

<Dialog on:clickedOut={() => locked = true} bind:visible style="min-width: 600px">
    <Form readonly={readonly} bind:locked lockable={lockable}
          on:submit={() => lockable ? handleUpdate() : handleCreate()} cancelButton={!lockable} on:cancel={handleCancel}
          submitText={lockable ? "Update" : "Create"}>
        <svelte:fragment slot="header">{locked ? "Team" : "Edit team"}</svelte:fragment>
        <Input locked={locked && lockable} label="Team name" bind:value={teamName}/>
        {#if !locked || !lockable}
            <Select clearOnChoice label="Users to add" choices={listUsers} on:submit={e => pickUser(e)}/>
        {/if}
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={43}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={50}>Email</ListRowItem>
                    {#if !locked || !lockable}
                        <ListRowItem widthInPercentage={7}>Kick</ListRowItem>
                    {/if}
                </ListRow>
            </svelte:fragment>
            {#each teamUsers as user}
                <ListRow noBorder={user === teamUsers[teamUsers.length-1]} noFunction>
                    <ListRowItem widthInPercentage={43}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={50}>{user.email}</ListRowItem>
                    {#if !locked || !lockable}
                        <ListRowItem widthInPercentage={7}>
                            <CloseButton on:click={() => closeUserChoice(user)}/>
                        </ListRowItem>
                    {/if}
                </ListRow>
            {/each}
        </ListScrollWrapper>
        <svelte:fragment slot="footer-actions">
            {#if lockable}
                <Button color={Colors.Gray} on:click={handleClose}>Close</Button>
            {/if}
        </svelte:fragment>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../../theme.scss";

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