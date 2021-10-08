<script lang="ts">

    import Card from "../../../ui/Card.svelte";
    import Form from "../../../ui/Form.svelte";
    import Input from "../../../ui/Input.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";
    import {goto} from "@roxi/routify";
    import Wrapper from "../../../ui/Wrapper.svelte";

    let email: string = 'myemail@email.com';
    let password: string = 'mypassword123';
    let pwConfirm: string = '';
    let locked: boolean = true;
    let showError: boolean = false;

    const handleSubmit = () => {
        // todo implement
        if(pwConfirm !== password){
            showError = true;
            return;
        }

        //.................
        pwConfirm = "";
    }

    const deleteAccount = () => {
        //todo deleteAccount
        alert('Account removed')
    }

</script>
<Wrapper bgColor="ffffff">
    <Card>
        <Form lockable bind:locked on:submit={handleSubmit}>
            <svelte:fragment slot="header">Edit Account</svelte:fragment>
            <svelte:fragment slot="header-actions">
                <Button color={Colors.Red} on:click={deleteAccount}>Delete Account</Button>
            </svelte:fragment>
            <Input label="Email" bind:value={email} {locked}/>
            <Input label="Password" bind:value={password} {locked} {password}/>
            {#if !locked}
                <Input label="Repeat password" bind:value={pwConfirm} {locked} on:enter={handleSubmit} {password} errorMsg="Passwords don't match" />
            {/if}
        </Form>
    </Card>
</Wrapper>


<style lang="scss">
  @import "../../../theme";

</style>