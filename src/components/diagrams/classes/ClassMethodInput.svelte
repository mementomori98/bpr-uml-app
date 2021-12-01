<script lang="ts">

    import Button from "../../../ui/Button.svelte";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    let visibility = 'private';
    let name;
    let type;
    let params = [];

    const changeVisibility = () => {
        if (visibility === 'private')
            visibility = 'public';
        else
            visibility = 'private';
    }

    const handleAdd = () => {
        dispatch('add', {accessModifier: visibility, name: name, type: type, params: params});
        params = [];
    }

</script>

<div class="method-input">
    <div class="visibility" on:click={changeVisibility}>{visibility}</div>
    <div class="name">
        <input class="input" bind:value={name}/>
        <div class="colon">:</div>
    </div>
    <div class="type">
        <input class="input" bind:value={type}/>
    </div>
    <div class="add">
        <Button on:click={handleAdd}>Add</Button>
    </div>
</div>
{#each params as param}
    <div class="parameter-input">
        <input class="param-name" bind:value={param.name}/>
        <div class="colon">:</div>
        <input class="param-type" bind:value={param.type}/>
    </div>
{/each}
<Button on:click={() => {params.push({}); params = params;}}>+</Button>


<style lang="scss">
    @import "../../../ui/theme.scss";

    .method-input {
        display: flex;
        width: 100%;
    }

    .visibility {
        display: flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        padding: 4px;
        flex: 1 0 0;
        width: 30px;

        &:hover {
            background-color: #efefef;
        }
    }

    .name {
        display: flex;
        align-items: center;
        flex: 3 0 0;
    }

    .type {
        flex: 2 0 0;
        display: flex;
        align-items: center;
    }

    .colon {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 4px;
    }

    input {
        width: 100%;
        max-width: 100%;
        margin: 0;
        outline: none;
    }

    .parameter-input {
        display: flex;

    }

    .param-name {
        flex: 2 0 0;
    }

    .param-type {
        flex: 1 0 0;
    }

</style>