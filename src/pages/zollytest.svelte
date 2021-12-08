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
  }

  #cell1{
    height: 100%;
    padding: 20px 10px 20px 20px;
  }
  #cell2{
    height: 100%;
    padding: 20px 20px 20px 10px;
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

    #cell1{
      height: 25%;
      padding: 20px 20px 10px 20px;
    }

    #cell2{
      padding: 10px 20px 20px 20px;
    }
  }

  @media only screen and (min-width: 1200px) {
    .container {
      position: relative;
    }

    #cell1 {
      flex: 0 0 50%;
    }

    #cell2 {
      width: 50%;
    }


  }
</style>