<template>
  <div class="time-counter">
    <!-- title -->
    <div class="title">
      <span>这是冰洁和灿宇</span><span>一起走过的</span>
    </div>

    <!-- 上面：年月日 -->
    <div class="timer timer-top">
      <div>
        <div class="title">{{ count_time.Years }}</div>
        <div class="font1">Years</div>
      </div>
      <div>
        <div class="title">{{ count_time.Months }}</div>
        <div class="font1">Months</div>
      </div>
      <div>
        <div class="title">{{ count_time.Days }}</div>
        <div class="font1">Days</div>
      </div>
      <div>
        <div class="title">{{ count_time.Hours }}</div>
        <div class="font1">Hours</div>
      </div>
      <div>
        <div class="title">{{ count_time.Minutes }}</div>
        <div class="font1">Minutes</div>
      </div>
    </div>

    <!-- 下面：天时分秒（一行格式） -->
    <div class="timer-bottom-line">
      {{ total_days }} 天 {{ count_time.Hours }} 时 {{ count_time.Minutes }} 分 {{ count_time.Seconds }} 秒
    </div>

    <!-- 导航 -->
    <p class="font2" style="text-align: center;">&emsp;&emsp;这是灿宇和冰洁的小站,<br>在这里记录了我们一起走过的时光</p>
    <div class="btn-group">
      <div v-for="page in pages" :key="page.href">
        <n-button :color=page.color size="large" @click="GotoPage(page)">
          <p class="font2">{{ page.name }}</p>
        </n-button>
      </div>
    </div>

    <!-- 尾注 -->
    <div class="font1" style="position:absolute; bottom: 15px;">
      powered by
      <n-icon :component="Heart" size="20" color="#E91E63"></n-icon>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { Heart } from "@vicons/ionicons5";
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  timer()
})

let count_time = reactive({
  Years: 0,
  Months: 0,
  Days: 0,
  Hours: 0,
  Minutes: 0,
  Seconds: 0
})

let total_days = 0

const timer = () => {
  setInterval(() => {
    const startDate = new Date('2019/06/21 00:00:00');
    const nowDate = new Date();
    
    // 计算年数
    let years = nowDate.getFullYear() - startDate.getFullYear();
    let months = nowDate.getMonth() - startDate.getMonth();
    let days = nowDate.getDate() - startDate.getDate();
    
    // 调整月份和年份
    if (days < 0) {
      months--;
      const prevMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    count_time.Years = years;
    count_time.Months = months;
    count_time.Days = days;

    // 计算总毫秒，直接取模得到时分秒（不依赖近似值）
    const totalMs = nowDate.getTime() - startDate.getTime();
    total_days = Math.floor(totalMs / (24 * 3600 * 1000));

    const remainMs = totalMs % (24 * 3600 * 1000);
    count_time.Hours = Math.floor(remainMs / (3600 * 1000));
    const leave2 = remainMs % (3600 * 1000);
    count_time.Minutes = Math.floor(leave2 / (60 * 1000));
    const leave3 = leave2 % (60 * 1000);
    count_time.Seconds = Math.floor(leave3 / 1000);
  }, 1000)
}

let pages = [
  { name: '我们的故事', color: "#E91E63", href: '/story' },
  { name: '我们的回忆', color: "", href: '/memory' }
]

const GotoPage = (page) => {
  router.push(page.href)
}

</script>

<style lang="scss" scoped>
.time-counter {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.timer {
  padding: 1em;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;

  div {
    margin: 0.2em 0.7em;
  }
}

.timer-top {
  margin-bottom: 15px;
}

.timer-bottom {
  margin-bottom: 30px;
}

.timer-bottom-line {
  color: #fff;
  font-size: 1.2em;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 30px;
  letter-spacing: 0.5px;
}

.title-small {
  color: #fff;
  font-size: 1.2em;
  line-height: 1.2rem;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.5px;
}

.total-days-info {
  color: #fff;
  font-size: 0.9em;
  opacity: 0.7;
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
}

.days-number {
  font-weight: 600;
  color: #E91E63;
  font-size: 1.1em;
}

.title {
  color: #fff;
  font-size: 3.6em;
  line-height: 3.125rem;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  margin: 1em 0px;
  letter-spacing: 2px;
  margin-top: 5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 480px) {
  .title{
    font-size: 2.1rem;
  }
}
.btn-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 30px 0 70px 0;

  div {
    margin: 10px 20px;
  }
}
</style>
