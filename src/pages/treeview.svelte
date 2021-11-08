<script lang="ts">
    import TreeView from "../components/views/TreeView.svelte";
    import TreeViewSample from "../components/views/TreeViewSample.svelte";

    const tree = {
        label: "USA", type:"folder", children: [
            {label: "Florida", type:"folder", children: [
                    {label: "Jacksonville", type:"model"},
                    {label: "Orlando", type:"folder", children: [
                            {label: "Disney World", type:"model"},
                            {label: "Universal Studio", type:"model"},
                            {label: "Sea World", type:"model"},
                        ]},
                    {label: "Miami"},
                ]},
            {label: "California", type:"folder", children: [
                    {label: "San Francisco", type:"model"},
                    {label: "Los Angeles", type:"model"},
                    {label: "Sacramento", type:"model"},
                ]},
        ],
    }
</script>

<div style="padding-left: 50px">
    <TreeView tree={tree}/>

</div>
<!--<div style="min-height: 40px"></div>-->
<!--<TreeViewSample {tree}/>-->

<style lang="scss">
  @import "../components/theme.scss";

</style>