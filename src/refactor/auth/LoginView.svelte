<script lang="ts">

    import Input from "../../components/ui/Input.svelte";
    import Button from "../../components/ui/Button.svelte";
    import View from "../../components/ui/View.svelte";
    import {Colors} from "../../components/utils/Colors";
    import Wrapper from "../../components/ui/Wrapper.svelte";
    import {AuthenticationService} from "./AuthenticationService";
    import Card from "../../components/ui/Card.svelte";
    import getService from "../utils/Services";
    import {createEventDispatcher} from "svelte";

    const authenticationService = getService(AuthenticationService);
    const dispatch = createEventDispatcher();

    let username: string;
    let password: string;
    let error: string = '';

    if (authenticationService.isLoggedIn())
        dispatch('login');

    function handleLogin() {
        authenticationService.login(username, password)
            .then(() => dispatch('login'))
            .catch((err) => {
                console.log(err);
                error = `Login failed (${err.code})`
            });
    }

    function handleGoogleLogin() {
        authenticationService.loginGoogle()
            .then(() => dispatch('login'))
            .catch(err => {
                console.log(err);
                error = `Login failed (${err.code})`;
            });
    }

</script>

<Wrapper width="480" bgColor="ededed" verticalCentering>
    <Card>
        <View>
            <svelte:fragment slot="header">Login</svelte:fragment>
            <Input label="Email" bind:value={username} on:enter={handleLogin} focused/>
            <Input label="Password" bind:value={password} password on:enter={handleLogin} showError errorMessage={error}/>
            <svelte:fragment slot="actions">
                <Button color="{Colors.Gray}" on:click={() => dispatch('signup')}>Sign up</Button>
                <Button on:click={handleGoogleLogin}>Login with Google</Button>
                <Button on:click={handleLogin}>Login</Button>
            </svelte:fragment>
        </View>
    </Card>
</Wrapper>


<style lang="scss">
    @import "../../components/theme";

</style>
