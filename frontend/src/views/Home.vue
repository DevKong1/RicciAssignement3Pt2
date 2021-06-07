<template>
  <div id="home">
    <div id="background" />
    <Puzzle id="puzzle"/>
  </div>
</template>

<script>
import Puzzle from '@/components/Puzzle.vue'

export default {
  name: 'Home',
  components: {
    Puzzle
  }
}
</script>

<style scoped>
  #home {
      display: flex;
  }

  #puzzle {
    max-width: 60%;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
    min-height: 0;
    margin: 10px 0;
    padding: 20px 20px 0;
    background-color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    border-radius: 10px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    box-shadow: -2px 2px 4px 0 rgba(0,0,0,.3);
    position: relative;
    z-index: 2;
  }
</style>