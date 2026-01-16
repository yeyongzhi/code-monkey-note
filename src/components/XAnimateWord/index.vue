<template>
    <div class="x-animate-word" :class="{ completed: isCompleted }">
        {{ displayedText }}
        <span v-if="!isCompleted" class="cursor"></span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps<{
    text: string
    duration?: number // total seconds
}>()

const displayedText = ref('')
const isCompleted = ref(false)
let intervalId: number | null = null

function startTyping() {
    if (intervalId) clearInterval(intervalId)
    displayedText.value = ''
    isCompleted.value = false

    const text = props.text || ''
    const len = text.length
    if (len === 0) {
        isCompleted.value = true
        return
    }

    const totalTime = (props.duration ?? 3) * 1000
    const interval = totalTime / len

    let i = 0
    intervalId = setInterval(() => {
        if (i <= len) {
            displayedText.value = text.substring(0, i)
            if (i === len) {
                isCompleted.value = true
                clearInterval(intervalId!)
                intervalId = null
            }
            i++
        }
    }, interval) as unknown as number
}

watch(() => props.text, startTyping, { immediate: true })

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.x-animate-word {
    height: 100%;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
}

.cursor {
    display: inline-block;
    width: 2px;
    height: 100%;
    background: currentColor;
    margin-left: 2px;
    animation: blink 1s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}
</style>