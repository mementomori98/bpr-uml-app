<script lang="ts">

import CardItem from "../ui/CardItem.svelte";
import {IconType} from "../ui/utils/IconType";
import CardItemTest from "../ui/CardItemTest.svelte";
</script>


<CardItemTest icon={IconType.Project} title="Apollo" collapsible/>
<!--<CardItem icon={IconType.Project} title="Mercury"/>-->

<style lang="scss">
  @import "../ui/theme";


</style>