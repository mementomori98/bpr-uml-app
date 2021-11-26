<script lang="ts">

    import {redirectUrl} from "./redirectStore";
    import {goto} from "@roxi/routify";
    import {onMount} from "svelte";

    onMount(() => redirectUrl.subscribe(url => {
        if (url)
            $goto(url);
    }));



</script>