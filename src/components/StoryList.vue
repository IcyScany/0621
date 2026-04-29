<template>
  <div class="slider-container" :class="{ 'portrait-mode': isPortrait }" ref="slider">
    <!-- 横屏模式：左右分离布局 -->
    <template v-if="!isPortrait">
      <!-- 左侧图 -->
      <div class="left-slide" :style="slideTransform.left">
        <div v-for="(item, index) in props.content" :key="'left-' + index" 
             class="left-image-wrapper">
          <!-- 内部滚动容器，添加 key 以重置动画 -->
          <div class="left-image-scroll" :key="'left-scroll-' + index + '-' + animationKey">
            <!-- 使用 images 数组中的图片 -->
            <div v-for="(imgUrl, imgIndex) in item.images" 
                 :key="'left-img-' + index + '-' + imgIndex"
                 class="left-image" 
                 :style="{ backgroundImage: `url('${imgUrl}')` }">
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧文字 -->
      <div class="right-slide" :style="slideTransform.right">
        <div v-for="(item, index) in props.content" :key="'right-' + index" :style="{ backgroundColor: props.content[content.length-index-1].color }">
          <div class="right-slide-inner">
            <h1>{{ props.content[content.length-index-1].title }}</h1>
            <p class="text" v-html="props.content[content.length-index-1].text"></p>
          </div>
        </div>
      </div>
    </template>

    <!-- 竖屏模式：上下配套布局 -->
    <template v-else>
      <!-- 图片容器 -->
      <div class="portrait-images" :style="slideTransform.portraitImages">
        <div v-for="(item, index) in props.content" :key="'portrait-img-' + index" 
             class="portrait-image-wrapper">
          <!-- 内部滚动容器，添加 key 以重置动画 -->
          <div class="portrait-image-scroll" :key="'portrait-scroll-' + index + '-' + animationKey">
            <!-- 使用 images 数组中的图片 -->
            <div v-for="(imgUrl, imgIndex) in item.images" 
                 :key="'portrait-img-' + index + '-' + imgIndex"
                 class="portrait-image" 
                 :style="{ backgroundImage: `url('${imgUrl}')` }">
            </div>
          </div>
        </div>
      </div>
      
      <!-- 文字容器 -->
      <div class="portrait-texts" :style="slideTransform.portraitTexts">
        <div v-for="(item, index) in [...props.content].reverse()" :key="'portrait-text-' + index" 
             class="portrait-text" 
             :style="{ backgroundColor: item.color }">
          <div class="portrait-text-inner">
            <h1>{{ item.title }}</h1>
            <p class="text" v-html="item.text"></p>
          </div>
        </div>
      </div>
    </template>

    <!-- 图片切换按钮 -->
    <div class="action-buttons">
      <button class="up-button" @click="changeSlide('up')">
        <n-icon :component='isPortrait ? ArrowBack : ArrowUp' size="20" color="black"></n-icon>
      </button>
      <button class="down-button" @click="changeSlide('down')">
        <n-icon :component='isPortrait ? ArrowForward : ArrowDown' size="20" color="black"></n-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue';
import { ArrowUp, ArrowDown, ArrowBack, ArrowForward } from "@vicons/ionicons5";

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
let activeSlideIndex = ref(0)  // 改为响应式
let isPortrait = ref(false)
let animationKey = ref(0)  // 用于重置动画

// 检测屏幕方向
const checkOrientation = () => {
  isPortrait.value = window.innerHeight > window.innerWidth
}

// 计算滑动变换样式
const slideTransform = computed(() => {
  const sliderHeight = slider.value?.clientHeight || window.innerHeight
  const sliderWidth = slider.value?.clientWidth || window.innerWidth
  
  if (isPortrait.value) {
    // 竖屏模式：图片向左移动，文字向右移动
    const offset = activeSlideIndex.value * sliderWidth
    return {
      portraitImages: { transform: `translateX(-${offset}px)` },
      portraitTexts: { 
        transform: `translateX(${offset}px)`,
        left: `${-(props.content.length - 1) * 100}vw`
      }
    }
  } else {
    // 横屏模式：图片向上移动，文字向下移动（原来的逻辑）
    const offset = activeSlideIndex.value * sliderHeight
    return {
      left: { transform: `translateY(-${offset}px)` },
      right: { 
        transform: `translateY(${offset}px)`, 
        top: `${-(props.content.length - 1) * 100}vh` 
      }
    }
  }
})

// 图片切换实现
const changeSlide = (direction) => {
  if (direction === 'down') {
    activeSlideIndex.value++
    if (activeSlideIndex.value > props.content.length - 1) {
      activeSlideIndex.value = 0
    }
  } else if (direction === 'up') {
    activeSlideIndex.value--
    if (activeSlideIndex.value < 0) {
      activeSlideIndex.value = props.content.length - 1
    }
  }
  distance.value = activeSlideIndex.value * (slider.value?.clientHeight || window.innerHeight)
  
  // 重置动画，让图片从头开始播放
  animationKey.value++
}

onMounted(() => {
  checkOrientation()
  window.addEventListener('resize', checkOrientation)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation)
})
</script>

<style lang="scss" scoped>
.slider-container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;

  .left-slide {
    height: 100%;
    position: absolute;
    top: 0;
    width: 65%;
    left: 0;
    transition: transform 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
  }

  .left-image-wrapper {
    width: 100%;
    height: 100vh;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .left-image-scroll {
    display: flex;
    flex-direction: column;
    animation: scrollImagesVertical 15s linear infinite;
  }

  .left-image {
    width: 100%;
    height: 100vh;
    flex-shrink: 0;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    
    /* 胶卷框效果 - 完整胶卷图片覆盖在上层 */
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('/src/assets/img/story/film1.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      pointer-events: none;
      z-index: 1;
    }
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

  // 竖屏模式：上下配套布局
  &.portrait-mode {
    .portrait-images {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 40%;
      display: flex;
      flex-direction: row;
      transition: transform 0.5s ease-in-out;
    }

    .portrait-texts {
      position: absolute;
      top: 40%;
      left: 0;
      width: 100%;
      height: 60%;
      display: flex;
      flex-direction: row;
      transition: transform 0.5s ease-in-out;
    }

    .portrait-image-wrapper {
      width: 100vw;
      height: 100%;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }

    .portrait-image-scroll {
      display: flex;
      flex-direction: row;
      animation: scrollImages 15s linear infinite;
    }

    .portrait-image {
      width: 100vw;
      height: 40vh;
      flex-shrink: 0;
      position: relative;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      
      /* 胶卷框效果 - 完整胶卷图片覆盖在上层 */
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('/src/assets/img/story/film1.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        pointer-events: none;
        z-index: 1;
      }
    }

    .portrait-text {
      width: 100vw;
      height: 100%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      color: #fff;
      overflow: hidden;
    }

    .portrait-text-inner {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 40px 20px;
      box-sizing: border-box;

      /* 自定义滚动条 */
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.5);
        border-radius: 3px;
        
        &:hover {
          background: rgba(255, 255, 255, 0.7);
        }
      }

      h1 {
        font-size: 32px;
        margin-bottom: 20px;
        margin-top: 0;
        padding: 0 20px;
        text-align: center;
        flex-shrink: 0;
      }

      .text {
        padding: 0 20px;
        margin: 0;
        font-family: serif;
        color: #fff;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        width: 100%;
        box-sizing: border-box;
        flex-shrink: 0;
      }
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
  overflow: hidden;
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

// 竖屏模式下的按钮位置
.slider-container.portrait-mode .action-buttons button {
  left: auto;
  top: 40%;
}

.slider-container.portrait-mode .action-buttons .down-button {
  right: 20px;
  transform: translateY(-50%);
  border-radius: 5px;
}

.slider-container.portrait-mode .action-buttons .up-button {
  left: 20px;
  transform: translateY(-50%);
  border-radius: 5px;
}

// 响应式优化：小屏幕时调整布局和文字间距
@media (max-width: 768px) {
  .slider-container:not(.portrait-mode) {
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

  .slider-container:not(.portrait-mode) .action-buttons button {
    left: 50%;
  }
}

@media (max-width: 480px) {
  .slider-container:not(.portrait-mode) {
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

  .slider-container:not(.portrait-mode) .action-buttons button {
    left: 40%;
    padding: 12px;
  }
}

// 竖屏模式图片滚动动画（横向）
@keyframes scrollImages {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-200vw); /* 滚动两张图片的宽度，第三张用于无缝衔接 */
  }
}

// 横屏模式图片滚动动画（纵向）
@keyframes scrollImagesVertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-200vh); /* 滚动两张图片的高度，第三张用于无缝衔接 */
  }
}
</style>