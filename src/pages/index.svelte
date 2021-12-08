<script lang="ts">
import Card from "../ui/Card.svelte";
</script>

<div class="container">
    <div class="cell" id="cell1">
        <Card noMargin></Card>
    </div>
    <div class="cell" id="cell2">
        <Card noMargin></Card>
    </div>
    <div class="cell" id="cell3">
            <Card noMargin style="height: 100%"></Card>
    </div>
</div>

<style lang="scss">
  @import "../ui/theme";
  div {
    box-sizing: border-box;
    width: 100%;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    height: 100%;
  }

  .cell {
    display: flex;
    flex: 50%;
    padding: 20px;
  }

  #cell1{
    height: 25%;
    padding-right: 0;
  }
  #cell2{
    height: 75%;
    padding-top: 0;
    padding-right: 0;
  }
  #cell3{
    height: 100%;
  }

  @media only screen and (max-width: 1200px) {

    .container {
      flex-direction: row;
      flex-wrap: wrap;
      display: flex;
    }

    .cell {
      flex: 100%;
    }

    #cell1 {
      padding-right: 20px;
    }

    #cell2 {
      display: none;
    }
  }

  @media only screen and (min-width: 1200px) {
    .container {
      position: relative;
    }

    #cell1 {
      flex: 0 0 51%;
    }

    #cell2 {
      flex:  0 0 51%;
    }

    #cell3 {
      flex-direction: column;
      right: 10px;
      position: absolute;
      width: 48%;
    }

  }
</style>