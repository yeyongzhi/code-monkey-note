export interface LinkItem {
    name: string;
    icon?: string;
    url: string;
    descriptions?: string;
    singleIcon?: boolean;
    textIcon?: string;
}

interface NavItem {
    title: string;
    descriptions?: string;
    linkList: Array<LinkItem>;
}

const KimiIcon: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABhCAYAAAApxKSdAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUUSURBVHgB7Z29bhtHFIWPHQN2J7lKqnhYpYvpIukCbJEAKQJEegLReYFIT0DrCSI9QEDqCSIDaQIEIOukiJwyza5SJWlId3FFz+HuGmuSSw6p+dlZ3g84luhdUeI9M3fmziyXgBCUe/DHYY0Wj/tgWmjV42zFcWe4MIBBPNJ6qqW0uvAbXFvQgKzQK62bQhkaCIPc10q1Zi3XH1o/IG9cwUm0RogrgDY1KmLgHYX9DvyiBvDYI77XmiD+oLlQHw7hIDoCMBOt1U9w0BsU9mOAtaUUFk3oQoIfzAQFCf5dNMEdTFCQ4NtQih1NSIGgf3ibxOJt5UrAB1gNK72vIdjiI61HWr+YnNxDXK0rJiULsV65GJeiIescLSTTeobKSutiCuojX8kU3MBx4I3WeNVBBRl4fWiCyoB8v2JAAkk9PmDwT8sH1TEghRjgC27scCx41wO43KAg+ILxTvhNaUACwTc04Z0B30LwzTzm5Rjw3sgseIG1wGMawMBPIOQcqvzrNIMHOg9Q5KK953O90/rFC+BhJRH8PQZ+fu7SjC7HAIV95yu99vjlxfvBJx8nwHd6IfNJAkccOjHg6OgIs9lsra6vr2GTNE03/k7q8HAhyJ/2gM9O65/4kT7/mwEcoZwYsPQiV3BwcABb9Ho9KKU2njccDjGdLlxx+InBBPBAAR86ydRPaIC9SASi3+8bnXd+fr78nw8NJ39uDJjXAVFPP7dp/VmWLR9g6w6Huo/IOTk5MTpvZesn/93AiP/dXCwd9SyILT9Jko3n1bZ+8s8rGPGvoVHbEXcPMM39V1dX9Qd/19PPNxta959D4HUGF0RrAFs/8/8mxuPxXLUwtfx2WX+cxdivZ3DFA0SKldZPuPTAKrikbOlMOX+9zFu/Q2iAQoSY5H7mfeb/tXCT8MdneU9wNNCuQUXZA0ynnrUznyqOcrspUY4BJunHqPU3gOgMsNr6G0B0BpgUXrG0fhKVAaaF1/HxMWIhKgNMcj9Tz82Nk6rVGdav/tJ5eraJ0Wi01XPq1r/xOS8uLkJc6XYnRTMNXdf62eIvLy+jyftVghnQ7Xahe8FW59fBTRYOzosDNI1hJdz0lBQkBflkMBjMU5iL13pXRb8fYAJrB/a2db0oFHthAOEUliaYFHE+aaUBdZsvvFhApyM0idYZwOCvW4JmIWdSzPmidQaYrAGZ7iX4oFUGnJ2dGdUCTRqMozeANQCLsE6nA10JG/0Mx4KmDMbBCjEWR2yxu8LAM98vXelmCA2ovVLCI8EMYODWbpbvCXtTBzQVMSAwYkBgxIDAtNKAXWdGIRADAiMpKDA0IIMQikx6QGDEgMCIAYGRMSAsMgaEhgbcQgjFa+kBYZnIGBCWWzEgLPNBOJ6Fk/aR8Y5ZCvktKwX/PJZ7xoVjfs+4chYU11tK2sE85qUBLyH4Zh5z6QHhGPOf6r2j+TEbcgdFP2RaHX5TrYQlDflj5RXE5Q1cG/lWnhYpReUGKdUewGnRmhvnCJbgmxey8sHiZ8iwF3AsUBBckKHI/SWLq6HsBc8huML4DiK80D6WnBqLzN68UFCmopheYJOVYgcU5FOVbAVfYUcUZGoaLPglCtITdg2+tZUFBTFh2+ArWEYh/7z0WIIQSiM43lt5AWAmWhLHylN4QmkNEXfAbGqEQKsHSfHLYwiSq8AnaAAKeaW3D8VbijwNW5nh3IN9FPI/jnpaPKZi2/SfFuJu4W3x9RqWL+N5C+7ruKpBAgLkAAAAAElFTkSuQmCC"

export const NavList: Array<NavItem> = [
    {
        title: 'AI',
        descriptions: '',
        linkList: [
            {
                name: 'deepseek',
                icon: 'https://chat.deepseek.com/favicon.svg',
                url: 'https://chat.deepseek.com/',
                descriptions: '杭州六小龙之一的当下最火的AI大模型，具备优秀的深度思考、推理能力'
            },
            {
                name: '通义千问',
                icon: 'https://img.alicdn.com/imgextra/i1/O1CN01asLYeX1WhbsyEZn5u_!!6000000002820-55-tps-56-56.svg',
                url: 'https://tongyi.aliyun.com/qianwen/',
                descriptions: '阿里巴巴出品——通情、达义，你的全能AI助手'
            },
            {
                name: 'Kimi',
                icon: KimiIcon,
                url: 'https://kimi.moonshot.cn/',
                descriptions: '主要应用场景为专业学术论文的翻译和理解、辅助分析法律问题、快速理解API开发文档等，是全球首个支持输入20万汉字的智能助手产品'
            },
            {
                name: '豆包',
                icon: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/logo-doubao-overflow.png",
                url: 'https://www.doubao.com/chat/',
                descriptions: '主要应用场景为专业学术论文的翻译和理解、辅助分析法律问题、快速理解API开发文档等，是全球首个支持输入20万汉字的智能助手产品'
            },
            {
                name: '智谱清言',
                icon: "https://chatglm.cn/img/icons/favicon.svg",
                url: 'https://chatglm.cn/main/guest?lang=zh',
                descriptions: '智谱是由清华大学计算机系技术成果转化而来的公司,致力于打造新一代认知智能通用模型。'
            },
            {
                name: '文心一言',
                icon: "https://nlp-eb.cdn.bcebos.com/logo/favicon.ico",
                url: 'https://yiyan.baidu.com/',
                descriptions: '百度全新一代知识增强大语言模型，文心大模型家族的新成员，能够与人对话互动、回答问题、协助创作，高效便捷地帮助人们获取信息、知识和灵感。'
            },
            {
                name: '腾讯元宝',
                icon: "https://cdn-bot.hunyuan.tencent.com/logo.png",
                url: 'https://yuanbao.tencent.com/chat',
                descriptions: '由腾讯公司全链路自研，在高质量内容创作、数理逻辑、代码生成和多轮对话上性能表现卓越，处于业界领先水平。混元API支持AI搜索联网插件，通过整合腾讯优质的内容生态（如微信公众号、视频号等），提供强大的时新、深度内容获取和AI问答能力。'
            },
            {
                name: '问小白',
                icon: "https://www.wenxiaobai.com/new_favicon.ico",
                url: 'https://www.wenxiaobai.com/',
                descriptions: 'deepseek 满血版R1🔥🔥🔥'
            },
            {
                name: '灵犀AI（WPS）',
                icon: "https://qn.cache.wpscdn.cn/copilot/copilot/assets/logo_lx-Cg3dcATH.png",
                url: 'https://lingxi.wps.cn/',
                descriptions: '我能帮你进行搜索、总结、整理和创作。包含deepseek R1满血版'
            },
            {
                name: '纳米 AI搜索',
                icon: "https://deepseek.n.cn/favicon.ico",
                url: 'https://deepseek.n.cn/',
                descriptions: '我可以帮你搜索、答疑、分析、写作、提建议，请把你的任务交给我吧~包含deepseek R1满血版'
            }
        ]
    },
    {
        title: '前端组件库（PC端）',
        descriptions: '',
        linkList: [
            {
                name: 'Antd',
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                url: 'https://ant-design.antgroup.com/components/overview-cn',
                descriptions: 'React生态结合最好的官方组件库，由蚂蚁集团出品，功能、api非常全面'
            },
            {
                name: 'Element Plus',
                icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
                url: 'https://element-plus.org/zh-CN/component/overview.html',
                descriptions: '基于vue3开发，全面拥抱vue3的流行组件库，继承elementUI'
            },
            {
                name: 'Naive UI',
                icon: 'https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg',
                url: 'https://www.naiveui.com/zh-CN/light',
                descriptions: '一个 Vue 3 组件库，比较完整，主题可调，使用 TypeScript，有点意思'
            },
            {
                name: 'Arco design',
                icon: 'https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico',
                url: 'https://arco.design/vue/docs/start',
                descriptions: 'ArcoDesign 主要服务于字节跳动旗下中后台产品的体验设计和技术实现，主要由UED设计和开发同学共同构建及维护'
            },
            {
                name: 'TDesign',
                icon: 'https://cdc.cdn-go.cn/tdc/latest/images/tdesign.svg',
                url: 'https://tdesign.tencent.com/',
                descriptions: '腾讯旗下出品的官方组件库，有react、vue、小程序以及Flutter等各框架版本'
            },
        ]
    },
    {
        title: '前端组件库（H5端）',
        descriptions: '',
        linkList: [
            {
                name: 'Vant',
                icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
                url: 'https://vant-ui.github.io/vant/#/zh-CN/action-sheet',
                descriptions: 'Vant 是一个轻量、可定制的移动端组件库，于 2017 年开源。目前 Vant 官方提供了 Vue 2 版本、Vue 3 版本和微信小程序版本，并由社区团队维护 React 版本和支付宝小程序版本。'
            },
            {
                name: 'Antd Mobile',
                icon: 'https://gw.alipayobjects.com/zos/bmw-prod/69a27fcc-ce52-4f27-83f1-c44541e9b65d.svg',
                url: 'https://mobile.ant.design/zh/components/button',
                descriptions: 'Antd官方出品的移动端组件库，保持了统一的设计语言'
            }
        ]
    },
    {
        title: '官方框架',
        descriptions: '提供一些官方的开发框架官网',
        linkList: [
            {
                name: 'Nodejs 中文网',
                icon: 'https://nodejs.p2hp.com/favicon-32x32.png',
                url: 'https://nodejs.p2hp.com/',
                descriptions: 'Node.js 是一个免费的、开源的、跨平台的 JavaScript 运行时环境，允许开发人员在浏览器之外编写命令行工具和服务器端脚本'
            },
            {
                name: 'Vue.js',
                icon: 'https://cn.vuejs.org/logo.svg',
                url: 'https://cn.vuejs.org/',
                descriptions: 'vuejs官方文档'
            },
            {
                name: 'React官网',
                icon: 'https://zh-hans.react.dev/favicon-32x32.png',
                url: 'https://zh-hans.react.dev/',
                descriptions: '用于构建 Web 和原生交互界面的库'
            },
            {
                name: 'Uniapp',
                icon: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/icon.png?v=1556263038788',
                url: 'https://uniapp.dcloud.net.cn/',
                descriptions: 'uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。'
            },
            {
                name: '菜鸟',
                icon: 'https://notes.fe-mm.com/icons/runoob.png',
                url: 'https://www.runoob.com/',
                descriptions: '菜鸟网站'
            },
        ]
    },
    {
        title: 'React生态',
        descriptions: '',
        linkList: [
            {
                name: 'react-router',
                icon: 'https://reactrouter.com/splash/v7-badge-2.svg',
                url: 'https://reactrouter.com/start/library/installation',
                descriptions: 'react官方路由脚手架'
            },
            {
                name: 'redux',
                icon: 'https://www.redux.org.cn/images/icon.png',
                url: 'https://www.redux.org.cn/',
                descriptions: '用于JavaScript应用的可预测状态容器'
            },
        ]
    },
    {
        title: 'Vue全家桶',
        descriptions: '',
        linkList: [
            {
                name: 'vue-router',
                icon: 'https://cn.vuejs.org/logo.svg',
                url: 'https://router.vuejs.org/zh/'
            }
        ]
    },
    {
        title: '设计资源',
        descriptions: '',
        linkList: [
            {
                name: 'iconFont',
                icon: 'https://img.alicdn.com/imgextra/i4/O1CN01XZe8pH1USpiUNT1QN_!!6000000002517-2-tps-114-114.png',
                url: 'https://www.iconfont.cn/',
                descriptions: '阿里巴巴矢量图标库'
            },
            {
                name: 'IconPark',
                icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
                url: 'https://iconpark.oceanengine.com/official',
                descriptions: 'IconPark图标库是一个通过技术驱动矢量图标样式的图标库产品，可以实现根据单一SVG源文件变换出多种主题，具备丰富的分类、更轻量的代码和更灵活的使用场景；致力于构建高质量、统一化、可定义的图标资源。'
            },
            {
                name: 'Emoji大全',
                icon: '',
                textIcon: '🤣',
                url: 'https://emoji6.com/emojiall/',
                descriptions: 'Emoji 表情合集'
            },
            {
                name: '字体下载',
                icon: 'https://font.chinaz.com/favicon.ico',
                url: 'https://font.chinaz.com/zhongwenziti.html',
                descriptions: '中文字体、中文字体免费下载和在线预览-font.chinaz.com'
            },
            {
                name: 'NB Map',
                icon: 'https://www.nbcharts.com/images/32.png',
                url: 'https://www.nbcharts.com/map/map.php',
                descriptions: '一个可以制作地图图片的网站'
            },
        ]
    },
    {
        title: '微信小程序Wechat',
        descriptions: '',
        linkList: [
            {
                name: '小程序官方文档',
                icon: 'https://res.wx.qq.com/mmbizwxampnodelogicsvr_node/dist/images/menu_logo_8363f4.svg',
                url: 'https://developers.weixin.qq.com/miniprogram/dev/component/',
                descriptions: '小程序提供了一个简单、高效的应用开发框架和丰富的组件及API，帮助开发者在微信中开发具有原生 APP 体验的服务'
            },
            {
                name: '小程序管理后台',
                icon: 'https://res.wx.qq.com/mmbizwxampnodelogicsvr_node/dist/images/menu_logo_8363f4.svg',
                url: 'https://mp.weixin.qq.com/wxamp/home/',
                descriptions: '代码管理，小程序的发布等等'
            },
            {
                name: '微信表情开放平台',
                icon: 'https://res.wx.qq.com/t/fed_upload/94c61f37-1fe0-4e8f-bb46-d541c28eebe6/icon.png',
                url: 'https://sticker.weixin.qq.com/cgi-bin/mmemoticonwebnode-bin/pages/timeout/login',
                descriptions: '制作、上传、发布自己专属的微信表情包，快来看看吧'
            }
        ]
    },
    {
        title: '地图Map',
        descriptions: '',
        linkList: [
            {
                name: '高德地图API',
                icon: 'https://a.amap.com/pc/static/img/amaplogo.png',
                url: 'https://lbs.amap.com/api/javascript-api-v2/documentation',
                descriptions: '地图 JS API 2.0 是高德开放平台免费提供的第四代 Web 地图渲染引擎， 以 WebGL 为主要绘图手段，本着“更轻、更快、更易用”的服务原则，广泛采用了各种前沿技术，交互体验、视觉体验大幅提升，同时提供了众多新增能力和特性'
            },
            {
                name: '百度地图API',
                icon: 'https://lbsyun.baidu.com/skins/MySkin/resources/img/icon/lbsyunlogo_icon.ico',
                url: 'https://lbsyun.baidu.com/index.php?title=jspopularGL',
                // textIcon: '百',
                descriptions: '百度地图JavaScript API GL 是一套由JavaScript语言编写的应用程序接口，使用了WebGL对地图、覆盖物等进行渲染，支持3D视角展示地图。帮助开发者在网站中构建功能丰富、交互性强的地图应用，支持PC端和移动端基于浏览器的地图应用开发。JavaScript API GL提供了丰富的功能接口，包括地图展示、定位、覆盖物、检索、路线规划等，适配多样化的业务场景'
            },
            {
                name: 'openlayers',
                icon: 'https://openlayers.org/theme/img/logo-dark.svg',
                url: 'https://openlayers.org/en/latest/apidoc/',
                descriptions: 'OpenLayers makes it easy to put a dynamic map in any web page. It can display map tiles, vector data and markers loaded from any source. OpenLayers has been developed to further the use of geographic information of all kinds. It is completely free, Open Source JavaScript, released under the 2-clause BSD License (also known as the FreeBSD).'
            },
            {
                name: 'leaflet',
                icon: 'https://leafletjs.com/docs/images/favicon.ico',
                url: 'https://leafletjs.com/reference.html',
                descriptions: '一个开源 JavaScript 库，适用于适合移动设备的交互式地图'
            },
            {
                name: '天地图底图服务',
                icon: 'http://lbs.tianditu.gov.cn/images/favicon.ico',
                url: 'http://lbs.tianditu.gov.cn/server/MapService.html',
                // singleIcon: true,
                // textIcon: '天',
                descriptions: '天地图地图服务支持HTTP和HTTPS协议；天地图地图服务采用OGC WMTS标准，具体使用方法请参考OGC WMTS标准 中GetCapabilities 和GetTile。'
            },
            {
                name: 'mapbox API',
                icon: 'https://static-assets.mapbox.com/branding/favicon/v2/favicon-32x32.png?v=gAd4JjrGWl',
                url: 'https://docs.mapbox.com/mapbox-gl-js/api/map/',
                descriptions: 'mapBox 官网API文档'
            },
            {
                name: 'DataV 行政范围选择器',
                icon: 'https://img.alicdn.com/imgextra/i3/O1CN01NQARus1gyEAmmQ9T0_!!6000000004210-0-tps-670-670.jpg',
                url: 'https://datav.aliyun.com/portal/school/atlas/area_selector',
                // singleIcon: true,
                // textIcon: "V",
                descriptions: 'DataV 行政范围选择器'
            },
            {
                name: 'Turf js',
                icon: 'https://turfjs.fenxianglu.cn/img/favicon.ico',
                url: 'https://turfjs.fenxianglu.cn/docs/next/intro',
                descriptions: '一个用 JavaScript 编写的模块化地理空间引擎'
            },
            {
                name: 'Cesium API',
                icon: 'https://sandcastle.cesium.com/images/cesium-logomark-192.png',
                url: 'https://cesium.com/learn/cesiumjs/ref-doc/',
                descriptions: 'Cesium API官方文档'
            },
        ]
    },
    {
        title: '前端常用工具',
        descriptions: '',
        linkList: [
            {
                name: 'Can I Use',
                icon: 'https://caniuse.com/img/favicon-128.png',
                url: 'https://caniuse.com/',
                descriptions: '前端API 兼容性查询'
            },
            {
                name: 'JSON 工具箱',
                icon: 'https://static.json.cn/r/img/favicon/favicon.ico',
                url: 'https://www.json.cn/',
                descriptions: '前端API 兼容性查询'
            },
            {
                name: '图片转base64',
                icon: 'https://static.jyshare.com/images/c-runoob-logo.ico',
                url: 'https://www.jyshare.com/front-end/59/',
                descriptions: '图片的 BASE64 编码就是可以将一幅图片数据编码成一串字符串，使用该字符串代替图片地址，从而不需要使用图片的 URL 地址。'
            },
        ]
    },
    {
        title: '金三银四',
        descriptions: '我管你这那的，给我面',
        linkList: [
            {
                name: '前端面试派',
                icon: 'https://www.mianshipai.com/favicon.ico',
                url: 'https://www.mianshipai.com/docs/first-exam/ComputerBase.html',
                descriptions: '来自掘金——前端双越老师，专业的前端面试网站，包括写简历、刷题、面试技巧等，将解决前端面试资料碎片、过时、非专业等问题，开源免费。'
            }
        ]
    }
]