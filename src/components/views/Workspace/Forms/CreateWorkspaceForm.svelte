<script lang="ts">
    import View from "../../../ui/View.svelte";
    import Input from "../../../ui/Input.svelte";
    import Centerer from "../../../ui/Centerer.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";
    import {goto} from "@roxi/routify";
    import {factory} from "../../../../services/Factory";
    import {AuthenticationService} from "../../../../services/AuthenticationService";

    let username: string;
    let password: string;
    let pwConfirm: string;
    let showError: boolean = false;

    const authenticationService = factory.get<AuthenticationService>();

    const handleCreate = () => {
        // todo implement
        if(pwConfirm !== password){
            showError = true;
            return;
        }

        authenticationService.login('', '');
        $goto('/');
    }

</script>

<Centerer>
    <View>
        <svelte:fragment slot="header">Sign up</svelte:fragment>
        <Input label="Username" bind:value={username}/>
        <Input label="Password" bind:value={password} password/>
        <Input label="Password" bind:value={pwConfirm} password errorMsg="Passwords don't match" showError={showError}/>
        <svelte:fragment slot="actions">
            <Button color={Colors.Gray} on:click={$goto('/login')}>Login</Button>
            <Button on:click={handleCreate}>Create</Button>
        </svelte:fragment>
    </View>
</Centerer>


<style lang="scss">
    @import "../../../theme";
</style>