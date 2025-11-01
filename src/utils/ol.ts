import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Vector, XYZ } from 'ol/source'
import Style from 'ol/style/Style'
import { Icon } from 'ol/style'
import { fromLonLat } from 'ol/proj' // 坐标转换
import 'ol/ol.css' // 引入样式文件，不引入样式文件，地图不会显示

import Location from '@/assets/images/location.png'

const initMap = (options: any) => {
    const map = new Map({
        target: options.element,
        view: new View({
            center: options.center || fromLonLat([120.2, 30.3]), //地图中心点
            zoom: options.zoom || 8, //地图级别
        }),
        layers: [
            new TileLayer({
                source: new XYZ({
                    urls: [
                        'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                        'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                        'https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                        'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                    ]
                })
            })
        ]
    })
    return map
}

const createVectorLayer = () => {
    const vectorLayer = new VectorLayer({
        source: new Vector({
            features: []
        }),
        style: new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: Location,
                width: 24,
                height: 24
            })
        })
    })
    return vectorLayer
}

const createFeature = (obj: any) => {
    const feature = new Feature({
        geometry: new Point(fromLonLat(obj.coordinates)), // 坐标转换
    })
    return feature
}

const addFeatures = (vectorLayer: VectorLayer, features: any) => {
    const source = vectorLayer.getSource() as Vector
    source.addFeatures(features)
}

export { initMap, createVectorLayer, createFeature, addFeatures }