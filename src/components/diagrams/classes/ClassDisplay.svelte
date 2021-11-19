<script lang="ts">

    import DisplayFrame from "../editor/DisplayFrame.svelte";

    export let representation;

</script>

<div class="class">
    <div class="class__header">
        {representation.model.name}</div>
    <div class="class__fields">
        <!--{#each representation.model.fields as field}-->
        <!--    <div class="class__field">-->
        <!--        {field}-->
        <!--    </div>-->
        <!--{/each}-->
    </div>
    <div class="class__methods">
        <!--{#each representation.model.methods as method}-->
        <!--    <div class="class__method">-->
        <!--        {method}-->
        <!--    </div>-->
        <!--{/each}-->
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