<script lang="ts">

    import {redirectUrl} from "./redirectStore";
    import {goto} from "@roxi/routify";
    import {onMount} from "svelte";

    redirectUrl.subscribe(url => $goto(url))

</script>