<template>
  <div class="home">
    <home-background />
    <time-counter />
  </div>
</template>

<script setup>
import TimeCounter from '../../components/TimeCounter.vue'
import HomeBackground from '../../components/HomeBackground.vue'

</script>

<style scoped>
.home{
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
