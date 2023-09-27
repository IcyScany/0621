<template>
  <div class="story">
    <story-list :content="content"/>
  </div>
</template>

<script setup>
import StoryList from '../../components/StoryList.vue'
import { storyList } from '../../common/data'

// 页面数据
const content = storyList
</script>

<style lang="scss" scoped>
.memory {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>