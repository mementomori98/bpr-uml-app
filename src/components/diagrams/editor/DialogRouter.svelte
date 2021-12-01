<script lang="ts">

    import Dialog from "../../../ui/Dialog.svelte";
    import {getContext} from "svelte";
    import {key} from "./callbackRegister";
    import getService from "../../utils/ServiceFactory";
    import {Snackbar} from "../../utils/Snackbar";
    import CreateBoxView from "../boxes/CreateBoxView.svelte";
    import CreateClassView from "../classes/CreateClassView.svelte";
    import EditBoxView from "../boxes/EditBoxView.svelte";

    const snackbar = getService(Snackbar);
    const inputRegister = getContext(key);

    let action: string;
    let request: any;
    let visible: boolean;

    const handleCreateBox = e => {
        request = e;
        action = 'create_box';
        visible = true;
    }

    const handleCreateClass = e => {
        request = e;
        action = 'create_class';
        visible = true;
    }

    const handleCancel = e => {
        visible = false;
    }

    const handleUpdateTextBox = e => {
        request = e;
        action = 'update_textBox';
        visible = true;
    }

    inputRegister.add('create_box', handleCreateBox);
    inputRegister.add('create_class', handleCreateClass);
    inputRegister.add('cancel', handleCancel)
    inputRegister.add('done', handleCancel);

    inputRegister.add('update_textBox', handleUpdateTextBox);

</script>

<Dialog bind:visible>
    {#if action === 'create_box'}
        <CreateBoxView {request}/>
    {:else if action === 'create_class'}
        <CreateClassView {request}/>
    {:else if action === 'update_textBox'}
        <EditBoxView {request}/>
    {/if}
</Dialog>