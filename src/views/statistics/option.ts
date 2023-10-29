import * as echarts from 'echarts';

export const readOption = {
  title: {
    text: '-',
    left: '1%',
    top: '1%',
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
    name: '阅读量',
  },
  series: [
    {
      data: [],
      type: 'bar',
      name: '阅读量',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#09164f' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
    }
  ],
  dataZoom: [
    {
      show: true,
      start: 0,
      end: 100
    },
    {
      type: 'inside',
      start: 0,
      end: 100
    },
  ],
  grid: {
    top: '22%',
    left: '2%',
    right: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      label: {
        show: true
      }
    }
  },
};


