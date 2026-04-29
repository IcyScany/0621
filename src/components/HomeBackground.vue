<template>
  <div class="home-bg">
    <img :src="urlBottom" alt="" class="layer-bottom">
    <img ref="topEl" :src="urlTop" alt="" class="layer-top" :style="{ opacity: topOpacity }">
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { backgroundImg } from '../common/data';

onMounted(() => {
  showBg()
})

let img_list = backgroundImg
let currentIndex = 0

const urlTop = ref(img_list[0])
const urlBottom = ref(img_list[1])
const topOpacity = ref(1)
const topEl = ref(null)

const showBg = () => {
  const num = img_list.length

  setInterval(() => {
    // 下层已经是下一张，让上层淡出，下层自然浮现
    topOpacity.value = 0

    // 淡出动画结束后，把上层换成再下一张并瞬间恢复不透明备用
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % num
      urlBottom.value = img_list[(currentIndex + 1) % num]
      urlTop.value = img_list[currentIndex]
      // 临时禁用 transition，避免恢复透明度时触发淡入动画
      topEl.value.style.transition = 'none'
      topOpacity.value = 1
      // 下一帧再恢复 transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          topEl.value.style.transition = ''
        })
      })
    }, 2000) // 与 transition 时长一致

  }, 6500)
}
</script>

<style lang="scss" scoped>
.home-bg {
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  min-height: 900px;
  overflow: hidden;
  position: fixed;
  z-index: -10;

  img {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: bottom;
    filter: blur(1px);
  }

  .layer-bottom {
    z-index: 1;
  }

  .layer-top {
    z-index: 2;
    transition: opacity 2s linear;
  }
}
</style>
