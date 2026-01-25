<template>
    <div class="lifemap_container">
        <p class="title">✈️勇敢的人先享受世界</p>
        <div class="map_container x_border_box">
            <div ref="mapContainerRef" class="gaode_map"></div>
        </div>
        <div>
            <div class="flex-start-center">
                <FluentIcon name="CaretRight16Filled" v-if="!isExpandTrip" @click="expandUserTripList" />
                <FluentIcon name="CaretDown16Filled" v-else @click="expandUserTripList" />
                <div>迄今为止，我已经踏足过 <span
                        style="font-weight: bolder;color: var(--primary-color);font-size: 1.5rem;cursor: pointer;"
                        @click="showAllTrip">{{ userTripMapData.length }}</span> 个 城市、区县</div>
            </div>
            <div v-if="isExpandTrip" class="trip_box">
                <div class="item" v-for="(item, index) in userTripMapData" :key="'trip' + index">
                    <div class="flex-between-center" style="margin-bottom: 10px;">
                        <span style="font-weight: bolder;">
                            {{ item.name }}
                        </span>
                        <n-tag type="success" size="small" round>
                            {{ item.date }}
                        </n-tag>
                    </div>
                    <p>
                        {{ item.descriptions }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userTripMapData } from '@/data/home/index'
import { initMap, createVectorLayer, createFeature, addFeatures } from '@/utils/ol'
import { getCurrentInstance, ref, shallowRef, h, onMounted, onUnmounted } from 'vue';

const { proxy }: any = getCurrentInstance()

const isExpandTrip = ref(false)
const expandUserTripList = () => {
    isExpandTrip.value = !isExpandTrip.value
}

const showAllTrip = () => {
    const list = userTripMapData.map(item => {
        return h('p', { class: 'text' }, `${item.date}: ${item.name}`)
    })
    // notification.success({
    //     content: () => h('div', {
    //         class: 'text'
    //     }, list),
    //     title: 'Life',
    //     duration: 3000,
    //     keepAliveOnHover: true
    // })
}

const map = shallowRef<any>(null)
const mapContainerRef = ref<any>(null)

const initOlMap = async () => {
    map.value = initMap({
        element: mapContainerRef.value
    })
    const layer = createVectorLayer()
    const features = userTripMapData.map(item => {
        return createFeature({
            coordinates: item.center,
        })
    })
    addFeatures(layer, features)
    map.value.addLayer(layer)
}

onMounted(() => {
    initOlMap()
})

onUnmounted(() => {
    map.value = null
})

</script>

<style lang="scss" scoped>
.lifemap_container {
    margin: var(--space-margin-md) 0;

    .map_container {
        width: 100%;
        height: 500px;
        position: relative;
        margin: var(--space-margin-md) 0;

        .gaode_map {
            width: 100%;
            height: 500px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }
    }

    .trip_box {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        gap: var(--space-margin-md);
        flex-wrap: wrap;

        .item {
            width: calc(50% - 16px - var(--space-margin-md));
            border: 2px solid var(--border-color);
            padding: 8px 10px;
            border-radius: 8px;
            overflow: hidden;

            &:hover {
                border: 2px solid var(--primary-color);
                cursor: pointer;
            }
        }
    }
}
</style>