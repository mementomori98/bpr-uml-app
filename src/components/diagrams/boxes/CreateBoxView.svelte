<script lang="ts">
import View from "../../../ui/View.svelte";
import Button from "../../../ui/Button.svelte";
import Input from "../../../ui/Input.svelte";
import {Colors} from "../../../ui/utils/Colors";
import {getContext} from "svelte";
import {key as diagramKey} from "../editor/diagramStore";
import {key as inputKey} from "../editor/callbackRegister";

export let request;

const getDiagramStore = getContext(diagramKey);
$: diagramStore = getDiagramStore();
const inputStore = getContext(inputKey);

const create = () => {
    request.w = 100;
    request.h = 50;
    diagramStore.createModel({
        type: 'textBox',
        path: '',
        attributes: [
            {
                kind: 'text',
                value: request.text
            }
        ],
        relations: []
    }, {
        x: request.x,
        y: request.y,
        w: 200,
        h: 100,
    });
    inputStore.raise('done', null);
}

</script>

<View>
    <svelte:fragment slot="header">Create Box</svelte:fragment>
    <svelte:fragment slot="header-actions"/>
        <Input label="Text" bind:value={request.text} focused/>
    <svelte:fragment slot="actions">
        <Button on:click={create}>Create</Button>
    </svelte:fragment>
</View>

<style lang="scss">
    @import "../../../ui/theme.scss";

</style>
