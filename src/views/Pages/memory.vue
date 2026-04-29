<template>
  <div class="memory">
    <memory-album v-for="(index) in Math.ceil(content.length/rowNum)"  :content="content.slice(rowNum * (index-1), rowNum * index)"/>
  </div>
</template>

<script setup>
import MemoryAlbum from '../../components/MemoryAlbum.vue'
import { computed, reactive, ref } from 'vue'
import { albumList } from '../../common/data'

const resize = (width) => {
  if (width > 1200) return 6
  if (width > 900 && width < 1200) return 5
  if (width > 600 && width < 900) return 4
  if (width <600) return 3
}

let content = reactive([])
let rowNum = computed(() => {
  return resize(document.body.clientWidth)
})

// 获取并拼接图片url
const getData= async ()=>{
  content = albumList
  content.forEach((item, index)=>{
    item.actived = index % rowNum.value === 0
  })
}
getData()
</script>

<style lang="scss" scoped>
.memory {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>