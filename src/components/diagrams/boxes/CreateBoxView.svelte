<script lang="ts">
import View from "../../../ui/View.svelte";
import Button from "../../../ui/Button.svelte";
import Input from "../../../ui/Input.svelte";

let text: string;

</script>

<View>
    <svelte:fragment slot="header">Create Model</svelte:fragment>
    <svelte:fragment slot="header-actions"/>
        <Input label="Text" bind:value={text}/>
    <svelte:fragment slot="actions">
        <Button>Create</Button>
        <Button>Cancel</Button>
    </svelte:fragment>
</View>

<style lang="scss">
    @import "../../../ui/theme.scss";

</style>
