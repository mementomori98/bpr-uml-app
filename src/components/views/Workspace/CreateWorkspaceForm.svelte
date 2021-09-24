<script lang="ts">
    import View from "../../ui/View.svelte";
    import Input from "../../ui/Input.svelte";

    let workspaceName: string;
    let username: string;
    let password: string;
</script>

<View>
    <svelte:fragment slot="header">Create Workspace</svelte:fragment>
    <svelte:fragment slot="header-actions"></svelte:fragment>
    <Input label="Workspace Name" bind:value={workspaceName}/>
    <Input label="Username" bind:value={username}/>
    <Input label="Password" bind:value={password} password/>
    <svelte:fragment slot="actions"></svelte:fragment>
</View>

<style lang="scss">
    @import "../../theme.scss";

</style>