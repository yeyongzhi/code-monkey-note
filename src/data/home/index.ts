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
        name: '丽水',
        code: 331100,
        date: '2018-09',
        level: "city",
        center: [119.921786,28.451993],
        descriptions: "始于2018年金秋，在此开启了我的大学四年生涯；同时也在这里结识了我的一生挚友。我很幸运在这里能有一段长达4年的时光，"
    },
    {  
        name: '温州',
        code: 330300,
        date: '2022-05',
        level: "city",
        center: [120.672111,28.000575],
        descriptions: "一场毕业旅行的起点，也是我们三人行一路离别的起点。幸运的是，我们拍摄了一段当时的纪录vlog。"
    },
    {  
        name: '绍兴',
        code: 330600,
        date: '2024-03',
        level: "city",
        center: [120.582112,29.997117],
        descriptions: "一定要寻找到自己的25号人生底片。说来惭愧，自己第一次一个人尝试出远门，非常充实的一天，我也会更加。"
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
        center: [118.767413,32.041544],
        descriptions: "与老友的久别重逢，更像是久旱逢甘露"
    },
    {  
        name: '常州',
        code: 320400,
        date: '2023-10',
        level: "city",
        center: [119.946973,31.772752],
        descriptions: "人生的第一次演唱会，献给了老薛的三巡，一场盛大的《天外来物》。不知从什么时候起，特别喜欢这首歌的副歌部分。也是第一次踏入常州这块土地，这会是我人生最难忘的经历之一~"
    },
    {  
        name: '苏州',
        code: 320500,
        date: '2024-09',
        level: "city",
        center: [120.619585,31.299379]
    },
    {  
        name: '贵阳',
        code: 520100,
        date: '2025-03',
        level: "city",
        center: [106.711127,26.84011]
    },
]