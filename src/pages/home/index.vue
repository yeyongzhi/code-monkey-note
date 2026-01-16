<script setup lang="ts">
import { getCurrentInstance, h, onMounted, ref, onUnmounted, shallowRef } from 'vue';
import XBorderBox from '@/components/XBorderBox/index.vue'
import { ArrowRight16Filled, CaretRight16Filled, CaretDown16Filled } from '@vicons/fluent'
import { Icon } from '@vicons/utils'
import { userKnowledge, userTripMapData } from '@/data/home/index'
import { openTab } from '@/utils/index'
import { useNotification } from 'naive-ui'
import { initMap, createVectorLayer, createFeature, addFeatures } from '@/utils/ol'
import Header from './components/Header.vue'
import Description from './components/Description.vue'
import TechStack from './components/TechStack.vue'

const { proxy }: any = getCurrentInstance()
const notification = useNotification()

const emits = defineEmits(['changeComponent'])
const { theme } = defineProps(['theme'])

const gotoPersonWorks = (item: any) => {
    if (item.routePath) {
        // gotoPage(item.routePath)
        emits('changeComponent', item.routePath.replace("/", ""))
    } else {
        openTab(item.link)
    }
}

const gotoKonwledge = (item: any) => {
    emits('changeComponent', item.link.url.replace("/", ""))
}

const isExpandTrip = ref(false)
const expandUserTripList = () => {
    isExpandTrip.value = !isExpandTrip.value
}

const showAllTrip = () => {
    const list = userTripMapData.map(item => {
        return h('p', { class: 'text' }, `${item.date}: ${item.name}`)
    })
    notification.success({
        content: () => h('div', {
            class: 'text'
        }, list),
        title: 'Life',
        duration: 3000,
        keepAliveOnHover: true
    })
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

<template>
    <div class="home_container app_container">
        <!-- 头部 -->
        <Header :theme="theme" />
        <!-- 介绍 -->
        <div class="page_hover_title">关于</div>
        <Description />
        <Divider :margin="50" />
        <!-- 技术栈 -->
        <div class="page_hover_title">技术栈</div>
        <TechStack />
        <!-- 知识库 -->
        <div class="page_hover_title" style="margin-bottom: 20px;">知识库</div>
        <div class="knowledge flex-start-center">
            <n-grid :x-gap="20" :y-gap="20" :cols="3">
                <n-grid-item v-for="(item, index) in userKnowledge" :key="'knowledge' + index">
                    <XBorderBox>
                        <div class="box" @click="gotoKonwledge(item)">
                            <div class="icon flex-center-center">
                                {{ item.icon }}
                            </div>
                            <div class="title">
                                {{ item.title }}
                            </div>
                            <div class="descriptions">
                                <n-ellipsis :line-clamp="3" style="max-width: 240px">
                                    {{ item.descriptions }}
                                </n-ellipsis>
                            </div>
                            <div class="link flex-start-center">
                                <span>{{ item.link.text }}</span>
                                <Icon :size="20">
                                    <ArrowRight16Filled />
                                </Icon>
                            </div>
                        </div>
                    </XBorderBox>
                </n-grid-item>
            </n-grid>
        </div>
        <Divider :margin="50" />
        <!-- 人生地图 -->
        <div class="page_hover_title" style="margin-bottom: 20px;">人生地图</div>
        <div class="map_container x_border_box">
            <div ref="mapContainerRef" class="gaode_map"></div>
        </div>
        <div style="margin: 20px 0;">
            <div class="flex-start-center">
                <Icon :size="25" style="margin-top: 5px;cursor: pointer;" @click="expandUserTripList">
                    <CaretRight16Filled v-if="!isExpandTrip" />
                    <CaretDown16Filled v-else />
                </Icon>
                <div>迄今为止，我已经踏足过 <span
                        style="font-weight: bolder;color: var(--primary-color);font-size: 1.8rem;cursor: pointer;"
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
            <p style="margin-top: 20px;">✈️勇敢的人先享受世界</p>
        </div>
        <Divider :margin="50" />
        <!-- 个人作品 -->
        <div class="page_hover_title">个人作品</div>
        <div class="person_works">
            <div class="work_box" v-for="(item, index) in proxy.globalData.personalWorks" :key="'works' + index">
                <div class="title hover_color_text" @click="gotoPersonWorks(item)">📌 {{ item.name }}</div>
                <div class="descriptions">
                    {{ item.descriptions }}
                </div>
            </div>
        </div>
        <!-- 底部文字 -->
        <div class="alert flex-center-center movie_font" v-if="false">
            <n-alert style="width: 100%;font-size: 20px;" type="info" :bordered="true" :show-icon="false">
                你在不开心的时候一般听谁的歌？——薛之谦<br>
                可是你每天都在听薛之谦
            </n-alert>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home_container {
    width: 60%;
    margin: 0 auto;

    

    

    .knowledge {
        width: 100%;
        margin-bottom: 50px;

        .box {
            padding: 10px 20px;

            .icon {
                width: 50px;
                height: 50px;
                border-radius: 5px;
                background-color: var(--tag-color);
                font-size: 25px;
            }

            .title {
                font-size: 16px;
                font-weight: bolder;
                margin-top: 10px;
            }

            .descriptions {
                height: 60px;
                margin-top: 10px;
                color: var(--text-color-3);
            }

            .link {
                color: var(--text-color-3);

                span {
                    margin-right: 5px;
                }

                &:hover {
                    color: var(--primary-color);
                    ;
                }
            }
        }
    }

    .map_container {
        width: 100%;
        height: 500px;
        position: relative;

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
        gap: 20px;
        flex-wrap: wrap;

        .item {
            width: 46%;
            border: 2px solid var(--border-color);
            padding: 8px 10px;
            border-radius: 5px;

            &:hover {
                border: 2px solid var(--primary-color);
                cursor: pointer;
            }
        }
    }

    .person_works {
        width: 100%;
        margin: 20px 0;

        .work_box {
            margin-bottom: 20px;

            .title {
                width: fit-content;
                font-size: 16px;
                font-weight: bolder;
            }

            .descriptions {
                margin-top: 10px;
                padding-left: 10px;
                color: var(--text-color-3);
                letter-spacing: 2px;
            }
        }
    }

    .alert {
        width: 100%;
        margin-top: 200px;

        :deep(.n-alert-body__content) {
            font-size: 18px !important;
        }
    }
}
</style>
