<template>
  <router-view v-slot="{ Component }">
    <transition>
      <main>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </main>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
</script>
