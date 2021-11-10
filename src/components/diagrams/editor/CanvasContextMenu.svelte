<script lang="ts">
    import ContextMenu from "../../../ui/ContextMenu.svelte";
    import {BoxRepresentation, CreateBoxRequest} from "../boxes/Models";
    import Option from "../../../ui/Option.svelte";
    import {DiagramHandler} from "../utils/DiagramHandler";
    import {CreateModelRequest} from "../utils/Models";
    import Dialog from "../../../ui/Dialog.svelte";
    import CreateBoxView from "../boxes/CreateBoxView.svelte";

    export let originX: number;
    export let originY: number;
    export let canvasX: number;
    export let canvasY: number;
    export let visible: boolean = false;
    export let realCoords: (x: number, y: number) => [number, number];
    export let diagramHandler: DiagramHandler;
    export let refreshCallback: () => void;

    let type: string;
    let dialogVisible = false;
    let request: CreateModelRequest<any>;

    $: request = new CreateModelRequest<any>({
        x: realCoords(originX - canvasX, originY - canvasY)[0],
        y: realCoords(originX - canvasX, originY - canvasY)[1],
    });

    $: closingRefreshCallback = () => {
        dialogVisible = false;
        refreshCallback()
    };

    const handleCreateModel = () => {
        type = CreateBoxRequest.name;
        dialogVisible = true;
    }

</script>

<ContextMenu
        bind:left={originX}
        bind:top={originY}
        bind:visible>
    <Option on:click={handleCreateModel}>Create Model</Option>
</ContextMenu>

<Dialog bind:visible={dialogVisible}>
    {#if type === CreateBoxRequest.name}
        <CreateBoxView
                refreshCallback={closingRefreshCallback}
                request={new CreateBoxRequest(request)}
                diagramHandler={diagramHandler}/>
    {/if}
</Dialog>