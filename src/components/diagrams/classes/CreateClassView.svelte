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
        request.w = 250;
        request.h = 250;
        diagramStore.createModel({
            type: 'class',
            path: '',
            attributes: [
                {
                    kind: 'field',
                    type: 'int',
                    name: 'FieldName',
                    accessModifier: 'private'
                },
                {
                    kind: 'method',
                    type: 'void',
                    name: 'MethodName',
                    accessModifier: 'public',
                    parameters: [
                        {
                            name: 'val',
                            type: 'int'
                        }
                    ]
                },
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

</script>

<View>
    <svelte:fragment slot="header">Create Box</svelte:fragment>
    <svelte:fragment slot="header-actions"/>
    <Input label="Name" bind:value={request.name} focused/>
    <svelte:fragment slot="actions">
        <Button on:click={create}>Create</Button>
    </svelte:fragment>
</View>

<style lang="scss">
    @import "../../../ui/theme.scss";

</style>
