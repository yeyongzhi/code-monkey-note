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
        title: "检测元素之外的点击",
        content: `
document.addEventListener('click', function (evt) {
    // isClickedOutside 为 true 如果点击的元素在 ele 之外
    const isClickedOutside = !ele.contains(evt.target);
});
        `
    },
    {
        title: "滚动条样式",
        content: `
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fafafa;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgb(191, 191, 191);
}

// 较新的 API
body {
  scrollbar-width: thin;
  scrollbar-color: #718096 #edf2f7;
}
        `
    },
    {
        title: "判断页面属于浏览器还是移动端",
        content: `
export function isMobile() {
    let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return flag;
}
        `
    },
    {
        title: "css文本超出隐藏显示...",
        content: `
// 单行文本
.ellipsis {
  width:100px; /* 需要设置一个宽度 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
// 多行文本
.ellipsis {
  width: 100px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
        `
    }
]