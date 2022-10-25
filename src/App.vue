<template>
  <NavBar />
  <router-view />
  <v-layout>
    <v-footer class="d-flex flex-column">
      <div class="px-4 py-2 text-center w-100">
        {{ new Date().getFullYear() }} (c) — <strong>Iraic</strong>
      </div>
    </v-footer>
  </v-layout>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
