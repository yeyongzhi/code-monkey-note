/**
 * 初始化安全秘钥
 * @param code 安全密钥
 */
const initAMapSecurityConfig = (code: string) => {
    (window as any)._AMapSecurityConfig = {
        securityJsCode: code
    }
}

const initAMapLoader = () => {
    return new Promise((resolve) => {
        const url = `https://webapi.amap.com/loader.js`
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        document.body.appendChild(script)
        script.onload = () => {
            resolve(void 0)
        }
    })
}

/**
 * 初始化地图资源
 */
const initAMapSource = async (mapConfig: any) => {
    initAMapSecurityConfig(mapConfig.securityJsCode)
    await initAMapLoader()
    const res = await (window as any).AMapLoader.load({
        key: mapConfig.key,
        version: mapConfig.version || '2.0'
    })
    return res
}

const initMap = (options: any) => {
    return new Promise((resolve) => {
        const map = new (window as any).AMap.Map(options.element, {
            viewMode: options.viewMode || '3D', //默认使用 2D 模式
            zoom: options.zoom || 16, //地图级别
            center: options.center || [120.2, 30.3] //地图中心点
        })
        map.on('complete', () => {
            resolve(map)
        })
    })
}

export { initAMapSource, initMap }