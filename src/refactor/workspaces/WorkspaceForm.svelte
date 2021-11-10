<script lang="ts">

    import Card from "../../components/ui/Card.svelte";
    import Form from "../../components/ui/Form.svelte";
    import Input from "../../components/ui/Input.svelte";
    import Button from "../../components/ui/Button.svelte";
    import {Colors} from "../../components/utils/Colors";

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
    @import "../../components/theme";

</style>