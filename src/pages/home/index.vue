<script setup lang="ts">
import logo from '@/assets/images/user/logo.png'
import { ref } from 'vue';
import { ArrowRight16Filled } from '@vicons/fluent'
import { Icon } from '@vicons/utils'
import { userKnowledge, type KnowledgeItem } from '@/data/home/index'
import router from '@/router/index'

const tagTypeList = [
    'success',
    'warning',
    'info',
    'error',
]

const tagList = ref([
    '≈00后',
    '程序猿',
    '前端开发，喜欢记录',
    '语雀重度使用者'
])

const gotoPage = (item: KnowledgeItem) => {
    router.push(item.link.url)
}

</script>

<template>
    <div class="home_container app_container">
        <!-- 头部 -->
        <div class="header flex-between-center">
            <div class="title">
                <div class="name">Aurora</div>
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
        <!--  -->
        <div class="sub_title">知识库</div>
        <!-- 知识库 -->
        <div class="knowledge flex-start-center">
            <n-grid :x-gap="20" :y-gap="20" :cols="3">
                <n-grid-item v-for="(item, index) in userKnowledge" :key="'knowledge' + index">
                    <div class="box" @click="gotoPage(item)">
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
        <Divider :margin="50"/>
        <!-- 底部文字 -->
        <div class="alert flex-center-center movie_font">
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
    .sub_title {
        font-size: 24px;
        margin: 20px 0;
        font-weight: bolder;
        cursor: pointer;
        position: relative;
        height: 40px;
        line-height: 40px;
        &::before {
            content: "#";
            visibility: hidden;
            color: var(--primary-color);
            position: absolute;
            top: 0;
            left: -20px;
        }
        &:hover {
            &::before {
                visibility: visible;
            }
            text-decoration: underline;
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
                    color: var(--primary-color);;
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
