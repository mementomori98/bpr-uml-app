<script lang="ts">

    import {key, createDiagramStore} from "./diagramStore";
    import {setContext} from "svelte";
    import Canvas from "./Canvas.svelte";
    import {key as associationKey, createAssociationStore} from "./associationStore";

    export let diagramId: string;

    const associationStore = createAssociationStore();
    const diagramStore = createDiagramStore(diagramId);

    const getStore = () => diagramStore;
    setContext(key, getStore);
    setContext(associationKey, associationStore);

    associationStore.subscribe(o => {
        if (o.target === null || o.source === null || o.type === null)
            return;
        console.log(`${o.source} -> ${o.target} (${o.type})`);

        diagramStore.createRelation(o.representationId, {
            source: o.source,
            target: o.target,
            type: o.type,
        });

        associationStore.setSource(null);
        associationStore.setTarget(null);
        associationStore.setType(null);
    });

</script>

<Canvas />

<style lang="scss">

</style>
