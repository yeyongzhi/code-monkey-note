<template>
    <div class="description_container">
        <div style="line-height: 30px;">
            📍坐标：<span style="font-weight: bolder;">{{ proxy.globalData.province }} · {{ proxy.globalData.city }}</span>
            <br />
            💻一个普普通通的程序猿，我就是一个破打工的啊💼...
            <br />
            🎯理想是<span class="underline">念头通达</span> | 学会独立思考 | 早日去码头整薯条🍟
            <br />
            🎵兴趣爱好是<span style="text-decoration: line-through;margin: 0 5px;">唱跳、Rap</span>和篮球🏀，没事喜欢写着写那的
            <br />
            （虽然现在还在写 bug，但梦想不会迟到🌱）
        </div>
        <div style="line-height: 30px;">
            这里是我的社交账号们，欢迎交朋友
        </div>
        <!-- 社交账号 -->
        <div class="contact flex-start-center">
            <div @click="handleContactClick(item)" :class="`imgBox flex-center-center`"
                v-for="(item, index) in user_contact_list" :key="'contact' + index">
                <img :src="renderIcon(item.type)" :width="item.type === 'juejin' ? '35' : '30'" height="30" />
                <span style="margin-left: var(--space-margin-xs);font-weight: 600;">{{ item.name }}</span>
                <n-popover trigger="hover" v-if="false">
                    <template #trigger>
                        <div class="flex-center-center">
                            <img :src="renderIcon(item.type)" :width="item.type === 'juejin' ? '35' : '30'"
                                height="30" />
                            <span style="margin-left: var(--space-margin-xs);font-weight: 600;">{{ item.name }}</span>
                        </div>
                    </template>
                    <p class="flex-center-center">
                        {{ item.name }}
                        <span v-if="item.link" style="margin-left: var(--space-margin-xs);">👇️</span>
                    </p>
                    <n-button type="primary" text v-if="item.link" @click="gotoLink(item)">前往查看</n-button>
                </n-popover>
            </div>
        </div>
        <div style="line-height: 30px;">
            👉 点击这里查看我的技术笔记 | 💬 欢迎留言交流想法
        </div>
        <div class="social flex-start-center">
            <div :class="`box flex-center-center ${item.key}`" v-for="(item) in proxy.globalData.user_code_list"
                :key="'code' + item.key" @click="gotoLink(item)">
                <img :src="code_icon[item.type]" width="30" height="30" />
                <span style="margin-left: var(--space-margin-xs);font-weight: 600;">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, h } from 'vue';
import { useNotification, NImage } from 'naive-ui'
import Wechat from '@/assets/images/user/wechat.jpg'
import Wx from '@/assets/images/social/wx.png'
import Xhs from '@/assets/images/social/xhs.png'
import Wyy from '@/assets/images/social/wyy.png'
import Yuque from '@/assets/images/social/yuque.png'
import Juejin from '@/assets/images/social/juejin.png'
import GitHub from '@/assets/images/github.png'

const { proxy }: any = getCurrentInstance()
const notification = useNotification()

const user_contact_list = proxy.globalData.user_contact_list


const socialIcon: Record<string, string> = {
    'wx': Wx,
    'xhs': Xhs,
    'wyy': Wyy,
    'yuque': Yuque,
    'juejin': Juejin,
}

const code_icon: any = {
    "npm": "https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png",
    "github": GitHub,
    "gitee": "https://gitee.com/assets/favicon_message.ico?1581387642851",
    "CSDN": "https://g.csdnimg.cn/static/logo/favicon32.ico"
}

const renderIcon = (type: string) => {
    return socialIcon[type]
}

const handleContactClick = (item: any) => {
    if (item.type === 'wx') {
        notification.success({
            content: () => h(NImage, {
                src: Wechat,
                style: 'width: 162.4px;height: 219.6px'
            }),
            title: '这个就是微信',
            duration: 3000,
            keepAliveOnHover: true
        })
    } else {
        gotoLink(item)
    }
}

const gotoLink = (item: any) => {
    if (item.link) {
        window.open(item.link)
    }
}



</script>

<style lang="scss" scoped>
.description_container {
    margin: var(--space-margin-md) 0;

    .underline {
        text-decoration: underline;
        margin: 0 var(--space-margin-xxs);
        font-weight: bolder;
    }

    .contact {
        margin: var(--space-margin-sm) 0;

        .imgBox {

            &:nth-child(n+2) {
                margin-left: var(--space-margin-md);
            }
            &:hover {
                cursor: pointer;
            }
        }

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
                margin-left: var(--space-margin-md);
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
        margin-top: var(--space-margin-sm);

        .box {
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            color: var(--text-color-1);

            &:hover {
                cursor: pointer;
            }

            &:nth-child(n+2) {
                margin-left: var(--space-margin-md);
            }
        }
    }
}
</style>