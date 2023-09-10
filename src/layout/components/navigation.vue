<template>
  <el-menu unique-opened class="menu">
    <el-sub-menu index="1">
      <template #title>
        <span>资源中心</span>
      </template>
      <router-link :to="{ name: 'resource-paper' }">
        <el-menu-item index="1-1">论文管理</el-menu-item>
      </router-link>
    </el-sub-menu>
  </el-menu>
</template>
<script setup></script>
<style scoped></style>
