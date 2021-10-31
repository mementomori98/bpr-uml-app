<script lang="ts">

    import LoginView from "./LoginView.svelte";
    import SignupView from "./SignupView.svelte";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    let login: boolean = true;

</script>

{#if login}
    <LoginView on:login={() => dispatch('login')} on:signup={() => login = false}/>
{:else}
    <SignupView on:login={() => login = true} on:signup={() => dispatch('login')}/>
{/if}

<style lang="scss">
    @import "../../theme.scss";

</style>