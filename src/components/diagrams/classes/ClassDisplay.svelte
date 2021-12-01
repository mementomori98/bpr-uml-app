<script lang="ts">

    import DisplayFrame from "../editor/DisplayFrame.svelte";

    export let representation;

</script>

<div class="class">
    <div class="class__header">
        {representation.model.attributes.find(a => a.kind === 'name')?.value}</div>
    <div class="class__fields">
        {#each representation.model.attributes.filter(a => a.kind === 'field') as field}
            <div class="class__field">
                {field.accessModifier === 'private' ? '-' : '+'} {field.name} : {field.type}
            </div>
        {/each}
    </div>
    <div class="class__methods">
        {#each representation.model.attributes.filter(a => a.kind === 'method') as method}
            <div class="class__method">
                {method.accessModifier === 'private' ? '-' : '+'} {method.name} (
                {#each method.parameters as param, i}
                    {param.name} : {param.type}
                    {#if i !== method.parameters.length - 1}
                        ,&nbsp;
                    {/if}
                {/each}
                ) : {method.type}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    @import "../../../ui/theme";


    .class {

        border: 1px solid black;
        background-color: #f5eec4;

        &__header {
            border-bottom: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px 0;
        }

        &__fields {
            border-bottom: 1px solid black;
            padding: 8px;
        }

        &__methods {
            padding: 8px;
        }
    }
</style>