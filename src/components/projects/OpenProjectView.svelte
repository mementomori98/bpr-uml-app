<script lang="ts">

    import {params} from "@roxi/routify";
    import TreeView from "../../ui/TreeView.svelte";
    import {onMount} from "svelte";
    import getService from "../utils/ServiceFactory";
    import {ProjectService} from "./ProjectService";
    import DiagramEditor from "../diagrams/editor/DiagramEditor.svelte";

    const projectService = getService(ProjectService);

    let content;

    const createFolders = (tree, path) => {
        // remove starting /
        if (path.startsWith('/'))
            path = path.substring(1);

        let folders = path.split('/');
        let f = folders.shift();
        let subTree = tree.children.find(c => c.label == f);
        if (!subTree) {
            subTree = {label: f, type: 'folder', children: []};
            tree.children.push(subTree);
        }
        if (folders.length <= 1)
            return;
        createFolders(subTree, folders.join('/'));
    }

    const addItems = (tree, items, path = '/') => {
        items.filter(i => i.path == (path)).forEach(i => {
            tree.children.push({label: i.name, type: i.type, id: i.id});
        });
        tree.children.filter(c => c.type === 'folder').forEach(c => {
            addItems(c, items, path + c.label + '/')
        });
    };

    const mapContentToTree = content => {
        let tree = {
            label: 'Project',
            type: 'folder',
            children: []
        }; // label, type, children
        if (content) {
            content.items.forEach(item => {
                content.items.map(i => i.path).filter(p => p !== '/').forEach(path =>
                    createFolders(tree, path));
            });

            addItems(tree, content.items.filter(i => i.type !== 'folder'));
        }

        return tree;
    };

    $: tree = mapContentToTree(content);

    onMount(async () => {
        content = await projectService.getContent($params.id);
    });

</script>

<div class="wrapper">
    <TreeView {tree}
      on:click={e => console.log(`selected ${e.detail.id}`)}
      on:dblclick={e => console.log(`double ${e.detail.id}`)}
    />
    <div class="editor-wrapper">
        <DiagramEditor diagramId="61a0d2fa28f1167d4bbb87de"/>
    </div>

</div>

<style lang="scss">
    @import '../../ui/theme.scss';

    .wrapper {
        height: calc(100vh - 64px);
        display: flex;
    }

    .editor-wrapper {
        flex: 1;
        border: 1px solid #c5c5c5;
        margin: 8px 8px 8px 0;
        border-radius: $border-radius-medium;
        box-shadow: inset 0 0 8px -2px rgba(0, 0, 0, .1);
    }
</style>
