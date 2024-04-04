<template>
  <a
    :href="href"
    target="_blank"
    class="px-3 py-2 rounded-lg border-2 text-white  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition-colors"
  >
    <slot>YouTube</slot>
  </a>
</template>

<script setup>
const props = defineProps({
  href: String
})
</script>
