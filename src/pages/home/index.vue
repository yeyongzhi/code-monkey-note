<script setup lang="ts">
import XBorderBox from '@/components/XBorderBox/index.vue'
import { ArrowRight16Filled } from '@vicons/fluent'
import { Icon } from '@vicons/utils'
import { userKnowledge } from '@/data/home/index'
import Header from './components/Header.vue'
import Description from './components/Description.vue'
import TechStack from './components/TechStack.vue'
import LifeMap from './components/lifeMap.vue'
import PersonWork from './components/PersonWork.vue'

const emits = defineEmits(['changeComponent'])
const { theme } = defineProps(['theme'])

const gotoKonwledge = (item: any) => {
    emits('changeComponent', item.link.url.replace("/", ""))
}

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
        <div class="page_hover_title">人生地图</div>
        <LifeMap />
        <Divider :margin="50" />
        <!-- 个人作品 -->
        <div class="page_hover_title">个人作品</div>
        <PersonWork @changeComponent="$emit('changeComponent', $event)" />
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

    .alert {
        width: 100%;
        margin-top: 200px;

        :deep(.n-alert-body__content) {
            font-size: 18px !important;
        }
    }
}
</style>
