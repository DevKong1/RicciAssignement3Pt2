<template>
  <div class="tile" v-on:click="$emit('tileClick', data)">
      <img :style="this.style" :src="'http://localhost:3030/' + data.source" alt=""/>
  </div>
</template>

<script>
export default {
  name: 'Puzzle',
  props: ['data', 'players'],
  methods: {
    getColor(id) {
      return this.players.find(el => el.playerID == id).color
    }
  },
  computed: {
    style() {
      let selectedID = this.data.selectedPlayer
      return selectedID != null ? `border: 7px; box-shadow: 0 5px 20px ${this.getColor(selectedID)}, 0 5px 20px ${this.getColor(selectedID)}` : ''
    }
  }
}
</script>

<style scoped>
  .tile {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tile img {
      width: 100%;
  }
</style>
