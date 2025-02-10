export interface LinkItem {
    name: string;
    icon?: string;
    url: string;
    descriptions?: string;
}

interface NavItem {
    title: string;
    descriptions?: string;
    linkList: Array<LinkItem>;
}

export const NavList: Array<NavItem> = [
    {
        title: '官方框架',
        descriptions: '提供一些官方的开发框架官网',
        linkList: [
            {
                name: 'Nodejs 中文网',
                icon: 'https://cn.vuejs.org/logo.svg',
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
                icon: 'https://www.runoob.com/wp-content/uploads/2016/02/react.png',
                url: 'https://zh-hans.react.dev/',
                descriptions: '用于构建 Web 和原生交互界面的库'
            },
            {
                name: '菜鸟',
                icon: 'https://www.runoob.com/wp-content/uploads/2016/02/react.png',
                url: 'https://www.runoob.com/',
                descriptions: '用于构建 Web 和原生交互界面的库'
            },
        ]
    },
    {
        title: 'React生态',
        descriptions: '',
        linkList: []
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
        title: '在线图标库',
        descriptions: '',
        linkList: []
    },
    {
        title: '微信小程序Wechat',
        descriptions: '',
        linkList: [
            {
                name: '小程序官方文档',
                icon: 'https://www.runoob.com/wp-content/uploads/2016/02/react.png',
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
                descriptions: '代码管理，小程序的发布等等'
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
                icon: 'https://webmap0.bdimg.com/wolfman/static/common/images/new/newlogo-new_3c175be.png',
                url: 'https://lbsyun.baidu.com/index.php?title=jspopularGL',
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
                icon: 'https://leafletjs.com/docs/images/logo-ua.png',
                url: 'https://leafletjs.com/reference.html',
                descriptions: '一个开源 JavaScript 库，适用于适合移动设备的交互式地图'
            },
            {
                name: '天地图底图服务',
                icon: 'http://lbs.tianditu.gov.cn/images/home/top.png',
                url: 'http://lbs.tianditu.gov.cn/server/MapService.html',
                descriptions: '天地图地图服务支持HTTP和HTTPS协议；天地图地图服务采用OGC WMTS标准，具体使用方法请参考OGC WMTS标准 中GetCapabilities 和GetTile。'
            },
            {
                name: 'mapbox API',
                icon: 'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 790 180%22%3E%3Cpath d%3D%22M89.1 1.8C39.9 1.8 0 41.7 0 90.9 0 140.1 39.9 180 89.1 180c49.2 0 89.1-39.9 89.1-89.1 0-49.2-39.9-89.1-89.1-89.1zm457.8 19.7c-1.2 0-2.2 1-2.2 2.2v103.2c0 1.2 1 2.2 2.2 2.2h13.4c1.2 0 2.2-1 2.2-2.2v-7.1c6.9 7.2 16.4 11.3 26.3 11.3 20.9 0 37.9-18 37.9-40.3 0-22.3-17-40.2-37.9-40.2-10 0-19.5 4.1-26.3 11.3V23.7c0-1.2-1-2.2-2.2-2.2h-13.4zM98.3 36.4c11.4.3 22.9 4.8 31.7 13.7 17.7 17.7 18.3 45.7 1.4 62.7-30.5 30.5-84.8 20.7-84.8 20.7s-9.8-54.3 20.7-84.8c8.5-8.4 19.7-12.5 31-12.3zm160.3 14.2c-8.2 0-15.9 4-20.8 10.6v-6.4c0-1.2-1-2.2-2.2-2.2h-13.4c-1.2 0-2.2 1-2.2 2.2V127c0 1.2 1 2.2 2.2 2.2h13.4c1.2 0 2.2-1 2.2-2.2V83.8c.5-9.7 7.2-17.3 15.4-17.3 8.5 0 15.6 7.1 15.6 16.5v44c0 1.2 1 2.2 2.2 2.2h13.5c1.2 0 2.2-1 2.2-2.2l-.1-44.9c1.2-8.8 7.6-15.6 15.3-15.6 8.5 0 15.6 7.1 15.6 16.5v44c0 1.2 1 2.2 2.2 2.2h13.5c1.2 0 2.2-1 2.2-2.2l-.1-49.6c.3-14.8-12.3-26.8-27.9-26.8-10 .1-19.2 5.9-23.5 15-5-9.3-14.7-15.1-25.3-15zm127.9 0c-20.9 0-37.9 18-37.9 40.3 0 22.3 17 40.3 37.9 40.3 10 0 19.5-4.1 26.3-11.3v7.1c0 1.2 1 2.2 2.2 2.2h13.4c1.2 0 2.2-1 2.2-2.2V54.8c.1-1.2-.9-2.2-2.2-2.2H415c-1.2 0-2.2 1-2.2 2.2v7.1c-6.9-7.2-16.4-11.3-26.3-11.3zm106.1 0c-10 0-19.5 4.1-26.3 11.3v-7.1c0-1.2-1-2.2-2.2-2.2h-13.4c-1.2 0-2.2 1-2.2 2.2V158c0 1.2 1 2.2 2.2 2.2h13.4c1.2 0 2.2-1 2.2-2.2v-38.2c6.9 7.2 16.4 11.3 26.3 11.3 20.9 0 37.9-18 37.9-40.3 0-22.3-17-40.2-37.9-40.2zm185.5 0c-22.7 0-41 18-41 40.3 0 22.3 18.4 40.3 41 40.3s41-18 41-40.3c0-22.3-18.3-40.3-41-40.3zm45.4 2c-1.1 0-2 .9-2 2 0 .4.1.8.3 1.1l23 35-23.3 35.4c-.6.9-.4 2.2.6 2.8.3.2.7.3 1.1.3h15.5c1.2 0 2.3-.6 2.9-1.6l13.8-23.1 13.8 23.1c.6 1 1.7 1.6 2.9 1.6h15.5c1.1 0 2-.9 2-2 0-.4-.1-.7-.3-1.1L766 90.7l23-35c.6-.9.4-2.2-.6-2.8-.3-.2-.7-.3-1.1-.3h-15.5c-1.2 0-2.3.6-2.9 1.6l-13.5 22.7-13.5-22.7c-.6-1-1.7-1.6-2.9-1.6h-15.5zM99.3 54l-8.7 18-17.9 8.7 17.9 8.7 8.7 18 8.8-18 17.9-8.7-17.9-8.7-8.8-18zm290.3 12.7c12.7 0 23 10.7 23.2 23.9v.6c-.1 13.2-10.5 23.9-23.2 23.9-12.8 0-23.2-10.8-23.2-24.2 0-13.4 10.4-24.2 23.2-24.2zm99.8 0c12.8 0 23.2 10.8 23.2 24.2 0 13.4-10.4 24.2-23.2 24.2-12.7 0-23-10.7-23.2-23.9v-.6c.2-13.2 10.5-23.9 23.2-23.9zm96.3 0c12.8 0 23.2 10.8 23.2 24.2 0 13.4-10.4 24.2-23.2 24.2-12.7 0-23-10.7-23.2-23.9v-.6c.2-13.2 10.5-23.9 23.2-23.9zm92.2 0c12.8 0 23.2 10.8 23.2 24.2 0 13.4-10.4 24.2-23.2 24.2-12.8 0-23.2-10.8-23.2-24.2 0-13.4 10.4-24.2 23.2-24.2z%22 fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E',
                url: 'https://docs.mapbox.com/mapbox-gl-js/api/map/',
                descriptions: 'mapBox 官网API文档'
            },
            {
                name: 'DataV 行政范围选择器',
                icon: '',
                url: 'https://datav.aliyun.com/portal/school/atlas/area_selector',
                descriptions: ''
            },
        ]
    }
]