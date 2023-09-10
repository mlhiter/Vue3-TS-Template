<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition :duration="200" name="fade-top" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup></script>

<style scoped></style>
