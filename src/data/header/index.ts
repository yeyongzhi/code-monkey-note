import GitHub from '@/assets/images/github.png'
import GitHub_Dark from '@/assets/images/github_dark.png'

export interface HeaderLinkItem {
    name: string;
    url: string;
    key: string;
}

export interface HeaderUserLinkItem {
    name: string;
    url: string;
    icon: string;
    darkIcon: string;
}

export const HeaderLink: Array<HeaderLinkItem> = [
    { name: '前端导航', url: '/nav', key: 'nav'  },
    { name: '主页', url: '/home', key: 'home' },
    { name: '笔记', url: '/note', key: 'note' },
    { name: '面经', url: '/interview', key: 'interview'  },
    { name: 'A Life清单', url: '/alife', key: 'alife' },
]

export const HeaderUserLink: Array<HeaderUserLinkItem> = [
    { name: 'github', url: 'https://github.com/yeyongzhi/code-monkey-note', icon: GitHub, darkIcon: GitHub_Dark },
]