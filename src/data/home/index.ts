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

type areaLevel = "province" | "city" | "district"

export interface TripMapItem {
    name: string;
    descriptions?: string;
    code: number | string;
    level: areaLevel;
    date?: string;
    center: Array<number>;
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
        icon: '📦️',
        title: '百宝工具箱',
        descriptions: '一些个人收藏许久的压箱底的网站合集，方方面面都有',
        link: {
            url: '/toolbox',
            text: '打开宝箱'
        }
    },
    {
        icon: '🖱️',
        title: '代码片段',
        descriptions: '直接CV，不好用来找我',
        link: {
            url: '/code',
            text: '给我三个键'
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


export const userTripMapData: Array<TripMapItem> = [
    {  
        name: '宁波',
        code: 330200,
        date: '2015-09',
        level: "city",
        center: [121.549792,29.868388]
    },
    {  
        name: '丽水',
        code: 331100,
        date: '2018-09',
        level: "city",
        center: [119.921786,28.451993]
    },
    {  
        name: '温州',
        code: 330300,
        date: '2022-05',
        level: "city",
        center: [120.672111,28.000575]
    },
    {  
        name: '绍兴',
        code: 330600,
        date: '2024-03',
        level: "city",
        center: [120.582112,29.997117]
    },
    {  
        name: '舟山',
        code: 330900,
        date: '2015-09',
        level: "city",
        center: [122.106863,30.016028]
    },
    {  
        name: '平潭',
        code: 350128,
        date: '2023-05',
        level: "district",
        center: [119.791197,25.503672]
    },
    {  
        name: '长沙',
        code: 430100,
        date: '2024-03',
        level: "city",
        center: [112.982279,28.19409]
    },
    {  
        name: '宁县',
        code: 621026,
        date: '2025-02',
        level: "district",
        center: [107.921182,35.50201]
    },
    {  
        name: '南京',
        code: 320100,
        date: '2021-05',
        level: "city",
        center: [118.767413,32.041544]
    },
    {  
        name: '常州',
        code: 320400,
        date: '2023-10',
        level: "city",
        center: [119.946973,31.772752]
    },
    {  
        name: '苏州',
        code: 320500,
        date: '2024-09',
        level: "city",
        center: [120.619585,31.299379]
    },
]