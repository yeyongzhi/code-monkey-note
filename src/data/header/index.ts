import wyy from '@/assets/images/wyy.png'
import gitee from '@/assets/images/gitee.png'
import github from '@/assets/images/github.png'

export interface HeaderLinkItem {
    name: string;
    url: string;
}

export interface HeaderUserLinkItem {
    name: string;
    url: string;
    icon: string;
}

export const HeaderLink: Array<HeaderLinkItem> = [
    { name: '前端导航', url: '/nav' },
    { name: '主页', url: '/home' },
    { name: '笔记', url: '/note' },
    { name: '面经', url: '/interview' },
    { name: 'A Life清单', url: '/alife' },
]

export const HeaderUserLink: Array<HeaderUserLinkItem> = [
    { name: '网易云', url: 'https://music.163.com/#/user/home?id=325840458', icon: wyy },
    { name: 'gitee', url: 'https://gitee.com/AuroraO23', icon: gitee },
    { name: 'github', url: 'https://github.com/yeyongzhi', icon: github },
]