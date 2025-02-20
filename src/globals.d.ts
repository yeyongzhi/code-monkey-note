// 扩展 Window 接口
interface CustomWindow extends Window {
    AMap: any;
}

// 声明 window 的类型
declare const window: CustomWindow;