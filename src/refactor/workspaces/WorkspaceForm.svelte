<script lang="ts">

    import Card from "../../ui/Card.svelte";
    import Form from "../../ui/Form.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";

    let workspaceName: string = 'My Workspace';

    let locked: boolean = true;



</script>

<Card>
    <Form lockable bind:locked>
        <svelte:fragment slot="header">Workspace</svelte:fragment>
        <Input label="Workspace name" bind:value={workspaceName} {locked}/>
    </Form>
</Card>

<style lang="scss">
    @import "../../ui/theme";

</style>