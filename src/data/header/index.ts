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
    { name: 'github', url: 'https://github.com/yeyongzhi/code-monkey-note', icon: "https://github.com/fluidicon.png" },
]