<script lang="ts">

    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import View from "../../ui/View.svelte";
    import {goto} from "@roxi/routify";
    import {Colors} from "../../ui/Colors";
    import Centerer from "../../ui/Centerer.svelte";
    import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

    let username: string;
    let password: string;
    let error: string = '';

    function handleLogin() {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, username, password)
            .then(cred => {
                localStorage.setItem('auth', 'true');
                $goto('/');
            })
            .catch(() => {
                error = 'Login failed'
            });
    }

    function handleGoogleLogin() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(res => {
                localStorage.setItem('auth', 'true');
                $goto('/');
            })
            .catch(() => {
                // ignored
            });
    }


</script>

<Centerer width="480">
    <View>
        <svelte:fragment slot="header">Login</svelte:fragment>
        <Input label="Username" bind:value={username} on:enter={handleLogin} focused/>
        <Input label="Password" bind:value={password} password on:enter={handleLogin}/>
        <p>{error}</p>
        <svelte:fragment slot="actions">
            <Button color="{Colors.Gray}" on:click={$goto('/signup')}>Sign up</Button>
            <Button on:click={handleGoogleLogin}>Login with Google</Button>
            <Button on:click={handleLogin}>Login</Button>
        </svelte:fragment>
    </View>
</Centerer>


<style lang="scss">
  @import "../../theme";

</style>