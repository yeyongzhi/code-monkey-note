import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs' // 导入 dayjs 库

const weekList = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] // 星期列表

/**
 * @description: 获取当前时间
 */

export function useTime() {
    let timeInterval: number | NodeJS.Timeout | null = null
    const timestmp = ref<string>("")
    const week = ref<string>("")
    const updateTime = () => {
        timestmp.value = dayjs().format("YYYY-MM-DD HH:mm:ss") // 格式化时间戳为 YYYY-MM-DD HH:mm:ss
        week.value = weekList[dayjs().day()] // 获取当前星期
    }
    timeInterval = setInterval(updateTime, 1000)
    updateTime()
    onUnmounted(() => {
        console.log('清除定时器');
        if (timeInterval) {
            clearInterval(timeInterval)
        }
    })
    return { timestmp, week }
}