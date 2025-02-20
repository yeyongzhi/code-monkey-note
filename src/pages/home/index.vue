<script setup lang="ts">
import logo from '@/assets/images/user/logo.png'
import Wechat from '@/assets/images/user/wechat.jpg'
import Yuque from '@/assets/images/yuque.png'
import Location from '@/assets/images/location.png'
import Star from '@/assets/images/star.png'
import { getCurrentInstance, h, onMounted, ref, onUnmounted } from 'vue';
import { ArrowRight16Filled } from '@vicons/fluent'
import { Icon } from '@vicons/utils'
import { userKnowledge, userTripMapData } from '@/data/home/index'
import { gotoPage } from '@/router/index'
import { openTab } from '@/utils/index'
import { useNotification, NImage } from 'naive-ui'
import { initAMapSource, initMap } from '@/utils/gaode'

const { proxy }: any = getCurrentInstance()
const notification = useNotification()

const tagTypeList = [
    'success',
    'warning',
    'info',
    'error',
]

const social_icon: any = {
    "yuque": Yuque,
    "juejin": "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg",
}

const code_icon: any = {
    "npm": "https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png",
    "github": "https://github.com/fluidicon.png",
    "gitee": "https://gitee.com/assets/favicon_message.ico?1581387642851",
    "CSDN": "https://g.csdnimg.cn/static/logo/favicon32.ico"
}

const tagList = proxy.globalData.user_tag
const user_contact_list = proxy.globalData.user_contact_list
const user_social_list = proxy.globalData.user_social_list

const gotoSocial = (item: any) => {
    const url = proxy.globalData.socialAccount[item.key]
    window.open(url)
}

const gotoCodePage = (item: any) => {
    const url = proxy.globalData.codeAccount[item.key]
    window.open(url)
}

const handleContactClick = (item: any) => {
    if (item.type === 'wechat') {
        notification.success({
            content: () => h(NImage, {
                src: Wechat,
                style: 'width: 162.4px;height: 219.6px'
            }),
            title: '这个就是微信',
            duration: 3000,
            keepAliveOnHover: true
        })
    } else if (item.type === 'cloudmusic') {
        window.open(proxy.globalData.socialAccount.wyy)
    } else if (item.type === 'redbook') {
        window.open(proxy.globalData.socialAccount.redbook)
    }
}

const gotoPersonWorks = (item: any) => {
    if (item.routePath) {
        gotoPage(item.routePath)
    } else {
        openTab(item.link)
    }
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

const map = ref<any>(null)
const mapContainerRef = ref<any>(null)

const initMarkers = () => {
    const AMap = (window as any).AMap
    const myMarker = new AMap.Marker({
        position: [120.2, 30.3],
        icon: new AMap.Icon({
            image: Star,
            size: [24, 24],
            imageSize: [24, 24]
        })
    })
    map.value.add(myMarker)
    const markers = userTripMapData.map(item => {
        const marker = new AMap.LabelMarker({
            position: item.center,
            icon: {
                image: Location,
                size: [24, 24],
                anchor: 'bottom-center'
            },
            text: {
                content: item.name,
                direction: 'bottom'
            }
        })
        map.value.add(marker)
        return marker
    })
    map.value.setFitView(markers)
}

const initGaodeMap = async () => {
    await initAMapSource({
        key: "cb0aa408d9ab7dae72b577579adbadc2",
        securityJsCode: "097670d2dba193c34ca44b13f721db75"
    })
    map.value = await initMap({
        element: mapContainerRef.value
    })
    initMarkers()
}

onMounted(() => {
    initGaodeMap()
})

onUnmounted(() => {
    map.value.destroy()
    map.value = null
})

</script>

<template>
    <div class="home_container app_container">
        <!-- 头部 -->
        <div class="header flex-between-center">
            <div class="title">
                <div class="name">{{ proxy.globalData.name }}</div>
                <div class="tips">-</div>
                <div class="signature">记录自己，学无止境</div>
                <div class="tag">
                    <n-tag :type="tagTypeList[index % 4]" round v-for="(item, index) in tagList" :key="'tag' + index">
                        {{ item }}
                    </n-tag>
                </div>
            </div>
            <img class="logo" :src="logo" />
        </div>
        <!-- 介绍 -->
        <div class="page_hover_title">About</div>
        <div style="margin: 20px 0;line-height: 30px;">
            坐标：{{ proxy.globalData.province }}{{ proxy.globalData.city }}
            <br />
            一个最普通的程序猿，我就是一个破打工的啊💼...
            <br />
            理想是念头通达，学会思考，早日去码头整薯条🍟
            <br />
            兴趣爱好是<span style="text-decoration: line-through;margin: 0 5px;">唱跳、Rap</span>和篮球，没事喜欢写着写那的，拿着破手机拍来拍去的
        </div>
        <div class="contact flex-start-center">
            <div @click="handleContactClick(item)" :class="`box flex-center-center ${item.type}`"
                v-for="(item, index) in user_contact_list" :key="'contact' + index">{{ item.name }}</div>
        </div>
        <div class="social flex-start-center">
            <div :class="`box flex-center-center ${item.key}`" v-for="(item) in user_social_list" :key="item.key"
                @click="gotoSocial(item)">
                <img :src="social_icon[item.key]" width="30" height="30" />
                <span style="margin-left: 10px;">{{ item.name }}</span>
            </div>
        </div>
        <div class="social flex-start-center">
            <div :class="`box flex-center-center ${item.key}`" v-for="(item) in proxy.globalData.user_code_list"
                :key="'code' + item.key" @click="gotoCodePage(item)">
                <img :src="code_icon[item.key]" width="30" height="30" />
                <span style="margin-left: 10px;">{{ item.name }}</span>
            </div>
        </div>
        <div style="margin: 20px 0;">欢迎找我讨论💬</div>
        <Divider :margin="50" />
        <div class="page_hover_title" style="margin-bottom: 20px;">知识库</div>
        <!-- 知识库 -->
        <div class="knowledge flex-start-center">
            <n-grid :x-gap="20" :y-gap="20" :cols="3">
                <n-grid-item v-for="(item, index) in userKnowledge" :key="'knowledge' + index">
                    <div class="box" @click="() => gotoPage(item.link.url)">
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
                </n-grid-item>
            </n-grid>
        </div>
        <Divider :margin="50" />
        <div class="page_hover_title" style="margin-bottom: 20px;">人生地图</div>
        <div style="margin: 20px 0;">
            <p>迄今为止，我已经踏足过 <span
                    style="font-weight: bolder;color: var(--primary-color);font-size: 25px;cursor: pointer;"
                    @click="showAllTrip">{{ userTripMapData.length }}</span> 个城市/区县</p>
            <p>✈️勇敢的人先享受世界</p>
        </div>
        <div class="map_container">
            <div ref="mapContainerRef" class="gaode_map"></div>
        </div>
        <Divider :margin="50" />
        <div class="page_hover_title">个人作品</div>
        <div class="person_works">
            <div class="work_box" v-for="(item, index) in proxy.globalData.personalWorks" :key="'works' + index">
                <div class="title hover_color_text" @click="gotoPersonWorks(item)">· {{ item.name }}</div>
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

    .header {
        width: 100%;
        margin-bottom: 50px;

        .title {
            .name {
                font-size: 60px;
                font-weight: 700;
                font-family: "OPPO-H";
            }

            .tips {
                font-size: 45px;
                font-weight: 500;
            }

            .signature {
                font-size: 25px;
                font-family: "OPPO-M";
            }

            .tag {
                margin-top: 20px;

                .n-tag {
                    margin-right: 10px;
                }
            }
        }

        .logo {
            width: 300px;
            height: 300px;
            border-radius: 50%;
        }
    }

    .contact {
        .box {
            padding: 0 20px;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            color: var(--base-color);

            &:hover {
                cursor: pointer;
            }

            &:nth-child(n+2) {
                margin-left: 20px;
            }
        }

        .wechat {
            background-color: #2aae67;
        }

        .redbook {
            background-color: #ff2442;
        }

        .cloudmusic {
            background-color: #E20000;
        }
    }

    .social {
        margin-top: 20px;

        .box {
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            color: var(--text-color-1);

            &:hover {
                cursor: pointer;
            }

            &:nth-child(n+2) {
                margin-left: 40px;
            }
        }
    }

    .knowledge {
        width: 100%;
        margin-bottom: 50px;

        .box {
            border: 2px solid var(--border-color);
            padding: 10px 20px;
            border-radius: 8px;

            &:hover {
                border: 2px solid var(--primary-color);
                cursor: pointer;
            }

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
                font-size: 14px;
                margin-top: 10px;
                color: var(--text-color-3);
            }

            .link {
                color: var(--text-color-3);
                font-size: 14px;

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
        border: 2px solid var(--border-color);
        border-radius: 5px;
        position: relative;

        &:hover {
            border: 2px solid var(--primary-color);
        }

        .gaode_map {
            width: 100%;
            height: 500px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }
    }

    .person_works {
        width: 100%;
        margin: 20px 0;

        .work_box {
            margin-bottom: 20px;

            .title {
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
