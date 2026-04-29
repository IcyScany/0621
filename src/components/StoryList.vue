<template>
  <div class="slider-container" ref="slider">
    <!-- 左侧图 -->
    <div class="left-slide" :style="{ transform: 'translateY(-' + distance + 'px)' }">
      <div v-for="(item, index) in props.content" :style="{ backgroundImage: `url('${item.url}')` }"></div>
    </div>

    <!-- 右侧图 -->
    <div class="right-slide" :style="{ transform: 'translateY(' + distance + 'px)', top: -(props.content.length - 1) * 100 + 'vh' }">
      <div v-for="(item, index) in props.content" :style="{ backgroundColor: props.content[content.length-index-1].color }">
        <div class="right-slide-inner">
          <h1>{{ props.content[content.length-index-1].title }}</h1>
          <p class="text" v-html="props.content[content.length-index-1].text"></p>
        </div>
      </div>
    </div>

    <!-- 图片切换按钮 -->
    <div class="action-buttons">
      <button class="up-button" @click="changeSlide('up')">
        <n-icon :component='ArrowUp' size="20" color="black"></n-icon>
      </button>
      <button class="down-button" @click="changeSlide('down')">
        <n-icon :component='ArrowDown' size="20" color="black"></n-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { ArrowUp, ArrowDown } from "@vicons/ionicons5";

const props = defineProps({
  content:{
    title: '',
    text: '',
    url: '',
    color: ''
  }
})

// 获取sliderContainer元素
let slider = ref('')
let distance = ref(0)
let activeSlideIndex = 0

// 图片切换实现
const changeSlide = (direction) => {
  let sliderHeight = slider.value.clientHeight
  if (direction === 'down') {
    activeSlideIndex++
    if (activeSlideIndex > props.content.length - 1) {
      activeSlideIndex = 0
    }
  } else if (direction === 'up') {
    activeSlideIndex--
    if (activeSlideIndex < 0) {
      activeSlideIndex = props.content.length - 1
    }
  }
  distance.value = activeSlideIndex * sliderHeight
}
</script>

<style lang="scss" scoped>
.slider-container {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  .left-slide {
    height: 100%;
    position: absolute;
    top: 0;
    width: 65%;
    left: 0;
    transition: transform 0.5s ease-in-out;
  }

  .right-slide {
    height: 100%;
    left: 65%;
    width: 35%;
    position: absolute;
    top: 0;
    transition: transform 0.5s ease-in-out;

    h1 {
      font-size: 40px;
      margin-bottom: 10px;
      margin-top: 0;
      padding: 0 30px;
      text-align: center;
    }

    .text {
      padding: 0 30px;
      margin: 0;
      font-family: serif;
      color: #fff;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.8;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

.right-slide>div {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  overflow: hidden; /* 外层不滚动，由内层处理 */
}

.right-slide-inner {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  box-sizing: border-box;

  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 2px;
  }
}

.left-slide>div {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 100%;
}

button {
  background-color: #fff;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
  padding: 15px;
}

button:hover {
  color: #222;
}

button:focus {
  outline: none;
}

.slider-container .action-buttons button {
  position: absolute;
  left: 65%;
  top: 50%;
  z-index: 100;
}

.slider-container .action-buttons .down-button {
  transform: translateY(100%);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.slider-container .action-buttons .up-button {
  transform: translateX(-100%);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

// 响应式优化：小屏幕时调整布局和文字间距
@media (max-width: 768px) {
  .slider-container {
    .left-slide {
      width: 50%;
    }

    .right-slide {
      left: 50%;
      width: 50%;

      h1 {
        font-size: 28px;
        margin-top: -20px;
      }

      .text {
        margin: 0 20px;
        font-size: 14px;
      }
    }
  }

  .slider-container .action-buttons button {
    left: 50%;
  }
}

@media (max-width: 480px) {
  .slider-container {
    .left-slide {
      width: 40%;
    }

    .right-slide {
      left: 40%;
      width: 60%;

      h1 {
        font-size: 24px;
        margin-top: -10px;
        padding: 0 10px;
      }

      .text {
        margin: 0 15px;
        font-size: 13px;
        line-height: 1.5;
      }
    }
  }

  .slider-container .action-buttons button {
    left: 40%;
    padding: 12px;
  }
}
</style>