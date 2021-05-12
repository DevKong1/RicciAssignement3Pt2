<template>
  <div id="puzzle">
    <h1>Concurrent Puzzle</h1>
    <p>Combine your skills with other players and solve the puzzle.</p>
    <div tag="div" class="container">
      <Tile v-for="tile in puzzle" :key="tile._id" :data="tile" :players="players" v-on:tileClick="tileClick"/>
    </div>
    <PlayerList :players="players" />
  </div>
</template>

<script>
import Tile from '@/components/Tile.vue'
import PlayerList from '@/components/PlayerList.vue'

export default {
  name: 'Puzzle',
  components: {
    Tile,
    PlayerList
  },
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
      this.puzzle = this.puzzle.map(el => el._id === data[0]._id ? {...el, selectedPlayer: data[0].selectedPlayer} : el)
    },
    deselectedTile(data) {
      this.puzzle = this.puzzle.map(({selectedPlayer, ...el}) => el._id === data[0]._id ? el : ({selectedPlayer, ...el}))
    },
    complete(data) {
      console.log("Complete " + data)
    },
    error(data) {
      console.log("Error " + data)
    }
  },
  methods: {
    tileClick(tile) {
      switch(tile.selectedPlayer) {
        case undefined: 
          if(this.puzzle.find(el => el.selectedPlayer != null && el.selectedPlayer === this.self.playerID))
            this.$socket.emit("swapTile", tile._id)
          else 
            this.$socket.emit("selectTile", tile._id)        
          break;
        case this.self.playerID:
          this.$socket.emit("deselectTile", tile._id)
          break;
        default: 
          alert("Tile selected by another player")
          break;
      }  
    }
  }
}
</script>

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
