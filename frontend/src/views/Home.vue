<template>
  <div class="home">
    <Puzzle/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Puzzle from '@/components/Puzzle.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    Puzzle,
  },
});
</script>
