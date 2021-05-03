<template>
  <div id="sudoku-demo" class="demo">
      <h1>Concurrent Puzzle</h1>
      <p>Combine your skills with other players and solve the puzzle.</p>
      <transition-group name="cell" tag="div" class="container">
        <div v-for="cell in cells" :key="cell.id" class="cell">
          {{ cell }}
        </div>
      </transition-group>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  sockets: {
      self: function (data) {
          console.log("self" + data)
      },
      players: function (data) {
          console.log("players" + data)
      },
      puzzle: function (data) {
          console.log("puzzle" + data)
      },
      selectedTile: function (data) {
          console.log("selectedTile" + data)
      },
      deselectedTile: function (data) {
          console.log("deselectedTile" + data)
      },
      complete: function (data) {
          console.log("complete" + data)
      },
      error: function (data) {
          console.log("error" + data)
      }
  },
  props: {
    msg: String,
  },
  data() {
    return {
      cells: [4,8,14,16,23,42]
    }
  },
  methods: {
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 238px;
  margin-top: 10px;
}
.cell {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaa;
  margin-right: -1px;
  margin-bottom: -1px;
}
.cell-move {
  transition: transform 1s;
}
</style>
