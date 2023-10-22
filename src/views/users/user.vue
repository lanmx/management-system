<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="date" label="注册时间" width="180" />
    <el-table-column prop="name" label="用户名" width="180" />
    <el-table-column prop="address" label="邮箱" />
  </el-table>
</template>

<script lang="ts" setup>
const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
