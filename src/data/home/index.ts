export interface KnowledgeItem {
    icon: string;
    title: string;
    badge?: number;
    descriptions: string;
    link: {
        url: string;
        text?: string;
    };
}

export const userKnowledge: Array<KnowledgeItem> = [
    {
        icon: '🧭',
        title: '前端导航',
        badge: 20,
        descriptions: '前端开发必备链接合集，涉及开发、数据处理、地图等一系列工具...赶紧码住',
        link: {
            url: '/nav',
            text: '前端导航合集'
        }
    },
    {
        icon: '🧰',
        title: '百宝工具箱',
        descriptions: '一些个人收藏许久的压箱底的网站合集，方方面面都有',
        link: {
            url: '/toolbox',
            text: '打开宝箱'
        }
    },
    {
        icon: '🎯',
        title: '生活记录',
        descriptions: '一些琐碎的日常记录',
        link: {
            url: '/life',
            text: '瞧一瞧'
        }
    },
    {
        icon: '💡',
        title: '思考',
        descriptions: '多思考，多沉淀',
        link: {
            url: '/think',
            text: '灵感迸现'
        }
    }
]