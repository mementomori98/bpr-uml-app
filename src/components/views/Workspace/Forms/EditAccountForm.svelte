<script lang="ts">

    import Card from "../../../ui/Card.svelte";
    import Form from "../../../ui/Form.svelte";
    import Input from "../../../ui/Input.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";
    import {goto} from "@roxi/routify";

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

</script>

<Card>
    <Form lockable bind:locked on:submit={handleSubmit}>
        <svelte:fragment slot="header">Edit Account</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <Input label="Email" bind:value={email} {locked}/>
        <Input label="Password" bind:value={password} {locked} {password}/>
        <Input label="Repeat password" bind:value={pwConfirm} {locked} on:enter={handleSubmit} {password} errorMsg="Passwords don't match" />
    </Form>
</Card>

<style lang="scss">
  @import "../../../theme";

</style>