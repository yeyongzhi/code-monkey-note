<script setup lang="ts">

import { ref } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed'

const pdfSrc = ref("/article/pdf/example.pdf")

</script>

<template>
    <div class="app_container">
        <VuePdfEmbed :source="pdfSrc" />
    </div>
</template>

<style scoped lang="scss"></style>
