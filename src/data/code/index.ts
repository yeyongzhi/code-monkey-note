export interface CodeCardItem {
    title: string;
    content: string;
}

export const codeCardList: Array<CodeCardItem> = [
    {
        title: '复制内容到剪贴板',
        content: `
navigator.clipboard.writeText(props.code)
.then((res) => {
    console.log("复制成功")
})
.catch((err) => {
    console.log("复制出错，请重试")
});
        `
    },
    {
        title: "全屏、退出全屏",
        content: `
// 全屏
export function fullscreen() {
    let element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
    }
}
// 退出全屏
export function exitfullscreen() {
    let element = document.documentElement;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
// 局部全屏
export function partFullscreen() {
    let element = document.getElementById('box')
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
    }
}        
`
    },
    {
        title: "生成随机的十六进制颜色值",
        content: `
export function getRandomHexColor(url) {
	retrun \`#\${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}\`
}
        `
    },
    {
        title: "GRB颜色值转十六进制Hex颜色",
        content: `
export function RgbToHex(url) {
	retrun "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
        `
    },
    {
        title: "",
        content: `

        `
    },
    {
        title: "",
        content: `

        `
    },
    {
        title: "",
        content: `

        `
    },
    {
        title: "",
        content: `

        `
    },
    {
        title: "",
        content: `

        `
    },
    {
        title: "",
        content: `

        `
    }
]