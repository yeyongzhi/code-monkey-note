import{d as u,c as t,o as n,a as s,D as p,f as i,g as r,l as _,t as x,u as a,_ as m,F,h as g}from"./index-Bqma74sh.js";const h={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 16 16"},q=u({name:"Copy16Regular",render:function(l,e){return n(),t("svg",h,e[0]||(e[0]=[s("g",{fill:"none"},[s("path",{d:"M4 4.085V10.5a2.5 2.5 0 0 0 2.336 2.495L6.5 13h4.414A1.5 1.5 0 0 1 9.5 14H6a3 3 0 0 1-3-3V5.5a1.5 1.5 0 0 1 1-1.415zM11.5 2A1.5 1.5 0 0 1 13 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5v-7A1.5 1.5 0 0 1 6.5 2h5zm0 1h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5z",fill:"currentColor"})],-1)]))}}),w={class:"codeItem_container"},b={class:"title flex-between-center"},v=u({__name:"codeItem",props:{title:{type:String,required:!1,default:""},code:{type:String,required:!0,default:""}},setup(c){const l=p(),e=c,o=()=>{navigator.clipboard.writeText(e.code).then(()=>{l.success("复制成功")}).catch(()=>{l.error("复制出错，请重试")})};return(E,y)=>{const d=i("n-icon"),f=i("n-code");return n(),t("div",w,[s("div",b,[_(x(e.title)+" ",1),r(d,{size:20,style:{cursor:"pointer"},onClick:o,component:a(q)},null,8,["component"])]),r(f,{code:e.code,language:"javascript"},null,8,["code"])])}}}),R=m(v,[["__scopeId","data-v-ba9fbfb1"]]),S=[{title:"复制内容到剪贴板",content:`
navigator.clipboard.writeText(props.code)
.then((res) => {
    console.log("复制成功")
})
.catch((err) => {
    console.log("复制出错，请重试")
});
        `},{title:"全屏、退出全屏",content:`
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
`},{title:"生成随机的十六进制颜色值",content:`
export function getRandomHexColor(url) {
	retrun \`#\${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}\`
}
        `},{title:"GRB颜色值转十六进制Hex颜色",content:`
export function RgbToHex(url) {
	retrun "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
        `},{title:"",content:`

        `},{title:"",content:`

        `},{title:"",content:`

        `},{title:"",content:`

        `},{title:"",content:`

        `},{title:"",content:`

        `}],C={class:"app_container code_container flex-column-center-start"},k={class:"code_box"},z=u({__name:"index",setup(c){return(l,e)=>(n(),t("div",C,[(n(!0),t(F,null,g(a(S),o=>(n(),t("div",k,[r(R,{code:o.content,title:o.title},null,8,["code","title"])]))),256))]))}}),B=m(z,[["__scopeId","data-v-ee308b9c"]]);export{B as default};
