<template>
  <div class="tile">
      <img :src="'http://localhost:3030/' + data.source" alt=""/>
  </div>
</template>

<script>
export default {
  name: 'Puzzle',
  props: ["data"]
}
</script>

<style scoped>
  .tile {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
