<script>
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import Input from "../../../ui/Input.svelte";
    import {Colors} from "../../../ui/utils/Colors";
    import {getContext} from "svelte";
    import {key as diagramKey} from "../editor/diagramStore";
    import {key as inputKey} from "../editor/callbackRegister";

    export let request;

    $: representation = request;

    const getDiagramStore = getContext(diagramKey);
    $: diagramStore = getDiagramStore();
    const inputStore = getContext(inputKey);

    const update = () => {
        let req = {};
        req.kind = 'text';
        req.modelId = representation.modelId;
        req.attributeId = representation.model.attributes.find(a => a.kind === 'text')?._id
        req.value = request.value;
        diagramStore.updateAttribute(req);
        inputStore.raise('done', null);
    }

</script>

<View>
    <svelte:fragment slot="header">Edit Box</svelte:fragment>
    <svelte:fragment slot="header-actions"/>
    <Input label="Text" bind:value={request.value} focused/>
    <svelte:fragment slot="actions">
        <Button on:click={update}>Edit</Button>
    </svelte:fragment>
</View>