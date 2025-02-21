import { type ComponentRouteItem } from '@/router/component'
import message from '@/plugins/message'

export default class ComponentsRouterManager {
    routes: Array<ComponentRouteItem> = []
    keyPathList: Array<string> = []
    keyIndex: number = 0
    constructor(routes: Array<ComponentRouteItem>) {
        this.routes = routes
        this.keyIndex = 0
    }

    push(componentKey: string) {
        if(this.keyPathList[this.keyIndex] === componentKey) {
            return false;
        }
        this.keyPathList = this.keyPathList.slice(0, this.keyIndex + 1);
        this.keyPathList.push(componentKey);
        this.keyIndex = this.keyPathList.length - 1;
    }

    back() {
        if(this.keyIndex === 0) {
            message.warning('已经到最开始位置')
            return false
        }
        this.keyIndex = this.keyIndex - 1
        return this.keyPathList[this.keyIndex]
    }

    next() {
        if(this.keyIndex === this.keyPathList.length - 1) {
            message.warning('已经到最开始位置')
            return false
        }
        this.keyIndex = this.keyIndex + 1
        return this.keyPathList[this.keyIndex]
    }



}