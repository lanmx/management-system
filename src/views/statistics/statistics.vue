<template>
  <div class="outer">
    <div class="inner-l">
      <div class="order-title">热榜</div>
      <div class="order-list">
        <div class="order-item" v-for="(item, index) in order" :key="item">
          <div class="left">
            <div
              class="top-icon"
              :class="{
                'top-1': index === 0,
                'top-2': index === 1,
                'top-3': index === 2,
              }"
            >
              {{ index + 1 }}
            </div>
            <div
              class="hot-icon"
              :class="{
                hot: index === 0 || index === 1,
                new: item.new,
              }"
            >
              {{ index === 0 || index === 1 ? "热" : item.new ? '新': '' }}
            </div>
          </div>
          <div class="right" :title="item.text">
            {{ item.text }}
            <span class="hot-tip">
              {{  current === '阅读' ? item.read_count + ' 热度' : item.good + ' 赞'  }}
            </span>
          </div>
          
        </div>
      </div>
    </div>
    <div class="inner-r">
      <div class="top-box">
        <div
          class="tab-item"
          v-for="item in tabs"
          :key="item"
          :class="{
            'tab-item-active': current === item,
          }"
          @click="changeTab(item)"
        >
          {{ item }}
        </div>
      </div>
      <div id="read-bar"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import * as echarts from "echarts";
import { getArticleStatistics } from "@/api/statistics";

import { readOption } from "./option";
import { isDateInLastMonth } from "@/utils/utils";

export default defineComponent({
  setup() {
    const option = ref(readOption);
    const order = ref([]);

    const getArticleBar = async () => {
      const res = await getArticleStatistics();
      const { status, data } = res;
      if (status === 0 && data) {
        const sortData = data.sort(
          (a: any, b: any) => b.read_count - a.read_count
        );
        const top = sortData.slice(0, 10);
        top.forEach((o: any) => {
          o['new'] = isDateInLastMonth(new Date(o.publish_time)) ? true : false
        })
        order.value = top;
        console.log(order.value);
        const xData = sortData.map((o: any) => o.text);
        const seriesData = sortData.map((o: any) => o.read_count);
        option.value.title.text = "博客文章阅读量";
        option.value.xAxis.data = xData || [];
        option.value.series[0].data = seriesData || [];
        init();
        addResize();
      }
    };
    getArticleBar();

    const init = () => {
      var chartDom = document.getElementById("read-bar");
      var myChart = echarts.init(chartDom);
      myChart.setOption(option.value);
      myChart.resize();
    };

    // 切换按钮
    const tabs = ["阅读", "点赞"];
    const current = ref("阅读");
    const changeTab = (e: string) => {
      current.value = e;
      if (e === "阅读") {
        getArticleBar();
      } else {
        getLoveBar();
      }
    };

    // 获取点赞数量
    const getLoveBar = async () => {
      const res = await getArticleStatistics();
      const { status, data } = res;
      if (status === 0 && data) {
        const sortData = data.sort((a: any, b: any) => b.good - a.good);
        const top = sortData.slice(0, 10);
        top.forEach((o: any) => {
          o['new'] = isDateInLastMonth(new Date(o.publish_time)) ? true : false
        })
        order.value = top;
        console.log(order.value);
        const xData = sortData.map((o: any) => o.text);
        const seriesData = sortData.map((o: any) => o.good);
        option.value.title.text = "博客文章点赞量";
        option.value.xAxis.data = xData || [];
        option.value.series[0].data = seriesData || [];
        init();
      }
    };

    // 监听窗口大小重新渲染
    const resize = ref(init);
    const addResize = () => {
      window.addEventListener("resize", resize.value);
    };
    const removeResize = () => {
      window.removeEventListener("resize", resize.value);
    };
    onUnmounted(() => {
      removeResize();
    });
    return {
      getArticleBar,
      option,
      tabs,
      current,
      changeTab,
      getLoveBar,
      order,
    };
  },
});
</script>
<style lang="less" scoped>
@top-1: #fa605d;
@top-2: #f99307;
@top-3: #e3b16f;
@hot-color: #2a6dce;
@hot-bg: #e6ecfe;
@new-color: #fa605d;
@new-bg: #fee9eb;
@font-size-mini: 12px;
@left-width: 280px;

.outer {
  display: flex;
  width: 100%;
  color: var(--el-text-color-regular);
}
.inner-l {
  width: @left-width;
}
.inner-r {
  width: calc(100% - @left-width);
}
#read-bar {
  width: 100%;
  height: 300px;
}
.order-title {
  padding: 20px 20px 10px 20px;
}
.order-list {
  margin: 10px 10px 20px 15px;
  height: 300px;
  overflow-y: scroll;
}
.order-item {
  padding: 5px;
  display: flex;
  height: 36px;
}
.new {
  color: @new-color;
  background-color: @new-bg;
  border-style: 1px solid @new-color;
  padding: 2px;
  color: 10px;
  border-radius: 3px;
}
.hot {
  color: @hot-color;
  background-color: @hot-bg;
  border-color: @hot-color;
  border-style: 1px solid @hot-color;
  padding: 2px;
  border-radius: 3px;
}
.top-1 {
  background-color: @top-1;
  color: #fff !important;
}
.top-2 {
  color: #fff !important;
  background-color: @top-2;
}
.top-3 {
  color: #fff !important;
  background-color: @top-3;
}
.left {
  font-size: @font-size-mini;

}
.right {
  padding-left: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: var(--el-text-color-regular);
  font-size: 14px;
}
.hot-tip {
  display: block;
  font-size: @font-size-mini;
  color: #a5a5a5;
  padding-top: 5px;
}
.top-icon {
  padding: 3px 5px;
  border-radius: 2px;
  color: @top-2;
}
.top-box {
  display: flex;
  padding: 10px 15px;
  color: var(--el-text-color-regular);
}
.tab-item {
  padding: 10px 10px;
  margin-right: 10px;
  cursor: pointer;
  white-space: nowrap;
}
.tab-item-active {
  border-bottom: 3px solid var(--el-color-primary);
  font-weight: 700;
  color: var(--el-color-primary);
}

// 滚动条样式
.order-list::-webkit-scrollbar {
  /*滚动条整体部分，其中的属性有width,height,background,border等*/
  width: 6px;
  // height:10px;
  // display: none;
}
.order-list::-webkit-scrollbar-track {
  /*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
  background: #f5f7fa;
}
.order-list::-webkit-scrollbar-track-piece {
  /*内层轨道，滚动条中间部分）*/
  background: #f5f7fa;
}
.order-list::-webkit-scrollbar-thumb {
  /*滚动条里面可以拖动的那部分*/
  background: #65656533;
  border-radius: 3px;
}
.order-list::-webkit-scrollbar-corner {
  /*边角*/
  background: #dfdfdf;
}
</style>
