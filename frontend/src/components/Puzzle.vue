<template>
  <div id="puzzle">
    <h1>Concurrent Puzzle</h1>
    <p>Combine your skills with other players and solve the puzzle.</p>
    <div tag="div" class="container">
      <div v-for="tile in puzzle" :key="tile._id" class="tile">
        <img :src="'http://localhost:3030/' + tile.source" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Puzzle',
  data() {
    return {
      self: null,
      players: [],
      puzzle: []
    }
  },
  sockets: {
      self(data) {
          this.self = data
      },
      players(data) {
          this.players = data
      },
      puzzle(data) {
          this.puzzle = data
      },
      selectedTile(data) {
          this.puzzle[this.puzzle.findIndex(el => el._id === data._id)].selectedPlayer = data.selectedPlayer
      },
      deselectedTile(data) {
          delete this.puzzle[this.puzzle.findIndex(el => el._id === data._id)].selectedPlayer
      },
      complete(data) {
          console.log("complete" + data)
      },
      error(data) {
          console.log("error" + data)
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
#puzzle {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 1vmin;
  grid-row-gap: 1vmin;
}
.tile {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
