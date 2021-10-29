<script lang="ts">

    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import View from "../../ui/View.svelte";
    import {Colors} from "../../ui/Colors";
    import Wrapper from "../../ui/Wrapper.svelte";
    import {AuthenticationService} from "../../../services/AuthenticationService";
    import Card from "../../ui/Card.svelte";
    import getService from "../../../services/Services";
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
            <Input label="Username" bind:value={username} on:enter={handleLogin} focused/>
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
    @import "../../theme";

</style>
