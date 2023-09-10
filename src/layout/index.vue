<template>
  <div class="h-100vh w-100vw">
    <el-container>
      <el-header class="header"><span>实验室内控系统</span></el-header>
      <el-container class="h-100% w-100%">
        <el-aside style="width: 230px; height: 100%">
          <NavigationBar />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import NavigationBar from './components/navigation.vue'
</script>

<style scoped>
.header {
  height: 70px;
  background-color: #3b74c8;
  border-style: solid;
  border-color: #cacaca;
  border-width: 0 0 1px 0;
  display: flex;
  align-items: center;
  font-family: 'SourceHanSansCN-Medium';
  font-size: 20px;
  color: #ffffff;
}
</style>
