<template>
  <div id="playerList">
      <span> Currently online: </span> 
      <div class="playerRow" v-for="player in this.players" :key="player._id">
          <span>{{ player._id }}</span> 
          <div class="colorBox" :style="getStyle(player.color)" />
      </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerList',
  props: ['players'],
  methods: {
    getStyle(color) {
      return `background: ${color}`
    }
  }
}
</script>

<style scoped>
    #playerList {
        align-items: center;
    }

    .playerRow {
        height: 40px;
    }

    .colorBox {
        float: left;
        width: 20px;
        height: 20px;
        margin: 5px;
        border: 1px solid rgba(0, 0, 0, .2);
    }
</style>
