<script lang="ts">

    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {factory} from "../../../services/Factory";
    import {AuthenticationService} from "../../../services/AuthenticationService";
    import View from "../../ui/View.svelte";
    import Card from "../../ui/Card.svelte";
    import {goto} from "@roxi/routify";
    import {Colors} from "../../ui/Colors";
    import Centerer from "../../ui/Centerer.svelte";

    let authenticationService = factory.get<AuthenticationService>();

    let username: string;
    let password: string;

    function handleLogin() {
        authenticationService.login(username, password);
        $goto('/');
    }


</script>

<Centerer width="400">
    <View>
        <svelte:fragment slot="header">Login</svelte:fragment>
        <Input label="Username" bind:value={username} on:enter={handleLogin} focused/>
        <Input label="Password" bind:value={password} password on:enter={handleLogin}/>
        <svelte:fragment slot="actions">
            <Button color="{Colors.Gray}" on:click={$goto('/create-workspace')}>Sign up</Button>
            <Button on:click={handleLogin}>Login</Button>
        </svelte:fragment>
    </View>
</Centerer>


<style lang="scss">
    @import "../../theme";


</style>