<script lang="ts">
    import {params} from "@roxi/routify";
    import Canvas from "../components/diagrams/editor/Canvas.svelte";
    import {DiagramHandler} from "../components/diagrams/utils/DiagramHandler";
    import SubDrawer from "../ui/SubDrawer.svelte";
    import TreeView from "../ui/TreeView.svelte";

    const demoTree = {
        label: "USA", type:"folder", children: [
            {label: "Cloreida", type:"folder", children: [
                    {label: "Jackdsonville", type:"model"},
                    {label: "Orliando", type:"folder", children: [
                            {label: "Disnney World", type:"model"},
                            {label: "Univversal Studio", type:"model"},
                            {label: "Sea Woporld", type:"folder", children: [
                                    {label: "Cloíyrida", type:"folder", children: [
                                            {label: "Jackbsonville", type:"model"},
                                            {label: "Orlanderdo", type:"folder", children: [
                                                    {label: "Disney vxWorld", type:"model"},
                                                    {label: "Unixvversal Studio", type:"model"},
                                                    {label: "Sea Woerld", type:"folder", children: [
                                                            {label: "Clori3da", type:"folder", children: [
                                                                    {label: "Jackcsonaaville", type:"model"},
                                                                    {label: "Orlangdo", type:"folder", children: [
                                                                            {label: "Disnegy World", type:"model"},
                                                                            {label: "Univers44al Studio", type:"model"},
                                                                            {label: "Sea Wo2rld", type:"model"},
                                                                        ]},
                                                                    {label: "Mfiami"},
                                                                ]}
                                                        ]},
                                                ]},
                                            {label: "Miasami"},
                                        ]}
                                ]},
                        ]},
                    {label: "Miae3mi"},
                ]},
            {label: "Californiua", type:"folder", children: [
                    {label: "Sanfn Francisco", type:"model"},
                    {label: "Los Angz5eles", type:"model"},
                    {label: "Sacramfgento", type:"model"},
                ]},
        ],
    }
</script>

<SubDrawer>
    <div slot="drawer">
        <TreeView tree={demoTree}/>
    </div>
    <Canvas />
</SubDrawer>

<style lang="scss">
    @import "../ui/theme";

</style>