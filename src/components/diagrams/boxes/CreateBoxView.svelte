<script lang="ts">
import View from "../../../ui/View.svelte";
import Button from "../../../ui/Button.svelte";
import Input from "../../../ui/Input.svelte";
import {Colors} from "../../../ui/utils/Colors";
import {CreateModelRequest} from "../utils/Models";
import {BoxRepresentation, CreateBoxRequest} from "./Models";
import {DiagramHandler} from "../utils/DiagramHandler";
import diagram from "../../../pages/diagram.svelte";

export let refreshCallback: () => void;
export let request: CreateBoxRequest
export let diagramHandler: DiagramHandler;

const create = () => {
    request.w = 100;
    request.h = 50;
    diagramHandler.create(request);
    refreshCallback();
}

</script>

<View>
    <svelte:fragment slot="header">Create Box</svelte:fragment>
    <svelte:fragment slot="header-actions"/>
        <Input label="Text" bind:value={request.text} focused/>
    <svelte:fragment slot="actions">
        <Button on:click={refreshCallback} color={Colors.Gray}>Cancel</Button>
        <Button on:click={create}>Create</Button>
    </svelte:fragment>
</View>

<style lang="scss">
    @import "../../../ui/theme.scss";

</style>
