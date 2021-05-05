<template>
  <div id="sudoku-demo" class="demo">
    <h1>Concurrent Puzzle</h1>
    <p>Combine your skills with other players and solve the puzzle.</p>
    <div name="cell" tag="div" class="container">
      <div v-for="cell in cells" :key="cell.id" class="cell">
        {{ cell }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Puzzle',
  sockets: {
      self(data) {
          console.log("self" + data)
      },
      players(data) {
          console.log("players" + data)
      },
      puzzle(data) {
          console.log("puzzle" + data)
      },
      selectedTile(data) {
          console.log("selectedTile" + data)
      },
      deselectedTile(data) {
          console.log("deselectedTile" + data)
      },
      complete(data) {
          console.log("complete" + data)
      },
      error(data) {
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
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
</style>
