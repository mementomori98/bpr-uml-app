<script lang="ts">

    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {factory} from "../../../services/Factory";
    import {AuthenticationService} from "../../../services/AuthenticationService";
    import View from "../../ui/View.svelte";
    import Card from "../../ui/Card.svelte";

    export let loggedIn: boolean;

    let authenticationService = factory.get<AuthenticationService>();

    function handleLogin() {
        authenticationService.login("Hello", "Hello");
        loggedIn = authenticationService.isLoggedIn();
    }


</script>

<div class="login">
    <div class="login__container">
        <Card>
            <View>
                <svelte:fragment slot="header">Login</svelte:fragment>
                <Input label="Username" on:enter={handleLogin} focused/>
                <Input label="Password" password on:enter={handleLogin}/>
                <svelte:fragment slot="actions">
                    <Button on:click={handleLogin}>Login</Button>
                </svelte:fragment>
            </View>
        </Card>
    </div>
</div>


<style lang="scss">
    @import "../../theme";

    .login {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ededed;

        &__container {
            max-width: 80%;
            width: 400px;
        }
    }

</style>