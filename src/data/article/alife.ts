import { type ArticleItem } from './type'
import code from '@/assets/images/alife/code.jpg'
import home from '@/assets/images/alife/home.png'
import list from '@/assets/images/alife/list.png'
import my from '@/assets/images/alife/my.png'

export const AlifeArticle: Array<ArticleItem> = [
    { type: 'title', content: 'A Life 清单' },
    { type: 'title1', content: '背景' },
    { type: 'content', content: '很早之前就想着开发一款属于自己的小程序，后来因为一些原因都没有很好地善始善终。这次总算是顺利地完成了.' },
    { type: 'title1', content: '功能介绍' },
    { type: 'content', content: '这款小程序可以帮助你记录自己的人生清单，比如：' },
    {
        type: 'unorderList', content: [
            "📌你想尝遍的大江南北的美食 xxx",
            "📌你最憧憬的那些未曾踏足的远方 xxx",
            "📌迄今为止看过的电影清单 xxx",
            "📌...",
        ]
    },
    { type: 'title1', content: '应用设计' },
    {
        type: 'imgList', content: [
            { name: '首页', url: home },
            { name: '列表页', url: list },
            { name: '关于页', url: my },
        ]
    },
    { type: 'title1', content: '使用体验' },
    { type: 'image', content: code, params: { width: 200, height: 200 } },
    { type: 'title1', content: '写在最后' },
    { type: 'content', content: '欢迎体验使用，有各种建议、问题也欢迎交流讨论' },
]