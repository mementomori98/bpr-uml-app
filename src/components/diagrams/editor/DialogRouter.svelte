<script lang="ts">

import Dialog from "../../../ui/Dialog.svelte";
import {getContext} from "svelte";
import {key} from "./callbackRegister";
import getService from "../../utils/ServiceFactory";
import {Snackbar} from "../../utils/Snackbar";
import CreateBoxView from "../boxes/CreateBoxView.svelte";

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

const handleCancel = e => {
    visible = false;
}

inputRegister.add('create_box', handleCreateBox);
inputRegister.add('cancel', handleCancel)
inputRegister.add('done', handleCancel);

</script>

<Dialog bind:visible>
    {#if action === 'create_box'}
        <CreateBoxView {request}/>
    {/if}
</Dialog>