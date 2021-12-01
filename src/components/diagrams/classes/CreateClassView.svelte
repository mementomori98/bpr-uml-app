<script lang="ts">
    import View from "../../../ui/View.svelte";
    import Button from "../../../ui/Button.svelte";
    import Input from "../../../ui/Input.svelte";
    import {Colors} from "../../../ui/utils/Colors";
    import {getContext} from "svelte";
    import {key as diagramKey} from "../editor/diagramStore";
    import {key as inputKey} from "../editor/callbackRegister";
    import ClassAttributeInput from "./ClassAttributeInput.svelte";

    export let request;

    const getDiagramStore = getContext(diagramKey);
    $: diagramStore = getDiagramStore();
    const inputStore = getContext(inputKey);

    const create = () => {
        if (!request.fields)
            request.fields = [];
        if (!request.methods)
            request.methods = [];

        request.w = 250;
        request.h = 250;
        const fields = request.fields.map(f => {
            return {kind: 'field', type: f.type, name: f.name, accessModifier: f.accessModifier}
        });
        const methods = request.methods.map(m => {
            return {
                kind: 'method', type: m.type, name: m.name, accessModifier: m.accessModifier, parameters: [
                    {name: 'val', type: 'int'}
                ]
            }
        })
        diagramStore.createModel({
            type: 'class',
            path: '',
            attributes: [
                ...fields,
                ...methods,
                {
                    kind: 'name',
                    value: request.name
                }
            ],
            relations: []
        }, {
            x: request.x,
            y: request.y,
            w: request.w,
            h: request.h,
        });
        inputStore.raise('done', null);
    }

    const handleAddAttribute = (field) => {
        if (!request.fields)
            request.fields = [];
        request.fields = [...request.fields, field];
    }

    const handleAddMethod = (method) => {
        if (!request.methods)
            request.methods = [];
        request.methods = [...request.methods, method];
    }

</script>

<View>
    <svelte:fragment slot="header">Create Box</svelte:fragment>
    <svelte:fragment slot="header-actions"/>
    <Input label="Name" bind:value={request.name} focused/>
    {#each request.fields ?? [] as field}
        {JSON.stringify(field)}<br/>
    {/each}
    <ClassAttributeInput on:add={e => handleAddAttribute(e.detail)}/>
    <svelte:fragment slot="actions">
        <Button on:click={create}>Create</Button>
    </svelte:fragment>
</View>

<style lang="scss">
    @import "../../../ui/theme.scss";

</style>
