const LINK_REGEXP = /\[(.*?)\]\((.*?)(".*?")?\)/
const IMG_REGEXP = /!\[(.*?)\]\((.*?)\)/
const UNORDERLIST_REGEXP = /^- (.*)$/
const ORDERLIST_REGEXP = /^\d+\.\s(.*)$/

const noHandleTypeList = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "emptyLine",
    "divider",
    "link",
    "img"
]

/**
 * 格式化markdown的内容
 * @param {string} str markdown内容
 */
export function formatMarkDown(str: string) {
    const text = str.split(/\r?\n/)
    // 第一步：最基础的识别
    const content: Array<any> = text.map(t => {
        return identifyLine(t)
    })
    // console.log(content)
    let result: any = []
    let i = 0;
    const fn = () => {
        const c = content[i]
        if (noHandleTypeList.includes(c.type)) {
            // 处理单行的内容
            result.push(c)
            i++
            if (i < content.length) {
                fn()
            }
        } else if (c.type === 'text') {
            result.push({
                type: c.type,
                content: handleLineText(c.content)
            })
            i++
            if (i < content.length) {
                fn()
            }
        } else if (c.type === 'unorderList') {
            result.push({
                type: c.type,
                content: handleLineText(c.content)
            })
            i++
            if (i < content.length) {
                fn()
            }
        } else if(c.type === 'orderList') {
            result.push({
                type: c.type,
                content: [
                    c.content[0],
                    handleLineText(c.content[1])
                ]
            })
            i++
            if (i < content.length) {
                fn()
            }
        } else if (c.type === 'code') {
            const range = getContinuousRangeIndex2(content, i)
            result.push({
                type: c.type,
                content: content.slice(range[0], range[1] + 1).map(item => item.content)
            })
            i = range[1] + 2
            if (i < content.length) {
                fn()
            }
        } else if (c.type === 'todo') {
            const regex = /^- \[([xX ])\]\s*(.*)$/;
            const range = getContinuousRangeIndex(content, i)
            result.push({
                type: c.type,
                content: content.slice(range[0], range[1] + 1).map(item => {
                    let re: any = regex.exec(item.content)
                    return {
                        finished: re[1] === "x",
                        label: re[2]
                    }
                })
            })
            i = range[1] + 1
            if (i < content.length) {
                fn()
            }
        } else if (c.type === 'quote') {
            const range = getQuoteRangeIndex(content, i)
            result.push({
                type: c.type,
                content: content.slice(range[0], range[1] + 1).map((item, index) => {
                    if(index === 0) {
                        return handleLineText(item.content.trim().replace(/>/g, ""))
                    }
                    return handleLineText(item.content)
                })
            })
            i = range[1] + 1
            if (i < content.length) {
                fn()
            }
        }
    }
    fn()
    return result
}

export function identifyLine(text: string) {
    let type = "text"
    let content: any = text
    // 标题一
    if (text.startsWith("#")) {
        const times = text.split("").filter(t => t === '#').length
        type = `h${times}`
    }
    if (UNORDERLIST_REGEXP.test(text)) {
        type = 'unorderList' // 无序列表
        const result = UNORDERLIST_REGEXP.exec(text)
        content = result ? result[1] : ""
    }
    if(ORDERLIST_REGEXP.test(text)) {
        type = 'orderList' // 有序列表
        const result = ORDERLIST_REGEXP.exec(text)
        content = [text.substring(0, text.indexOf(".")), result ? result[1] : ""]
    }
    if (text.startsWith("> ")) {
        type = 'quote' // 引用
    }
    if (/```/g.test(text)) {
        type = 'code' // 代码块
    }
    if (text === '---' || text === '***') {
        type = 'divider' // 
    }
    if (LINK_REGEXP.test(text)) {
        type = 'link' // 链接
        content = LINK_REGEXP.exec(text)
    }
    if (IMG_REGEXP.test(text)) {
        type = 'img' // 图片
        content = IMG_REGEXP.exec(text)
    }
    if(text.startsWith("- [x] ") || text.startsWith("- [] ")) {
        type = 'todo'
    }
    if (text.length === 0) {
        type = 'emptyLine' // 空行
    }
    return {
        type,
        content
    }
}

function handleLineText(content: string) {
    const boldRegex = /(\*\*|__)(.*?)(\*\*|__)/g;
    const italicRegex = /(\*|_)(.*?)(\*|_)/g;
    const strikethroughRegex = /~~(.*?)~~/g;
    const inlineCodeRegex = /`(.*?)`/g;

    let htmlText = content
        .replace(boldRegex, "<strong>$2</strong>")
        .replace(italicRegex, "<em>$2</em>")
        .replace(strikethroughRegex, "<del>$1</del>")
        .replace(inlineCodeRegex, "<code>$1</code>");

    return htmlText
}

export function getContinuousRangeIndex(content: Array<any>, start: number) {
    const type = content[start].type
    let end = start
    while (end <= content.length - 1 && content[end].type === type) {
        end++
    }
    return [start, end - 1]
}

export function getContinuousRangeIndex2(content: Array<any>, start: number) {
    const type = content[start].type
    let end = start
    while (end === start || (end < content.length - 1 && content[end].type !== type)) {
        end++
    }
    return [start + 1, end - 1]
}

export function getQuoteRangeIndex(content: Array<any>, start: number) {
    let end = start
    while (end < content.length && content[end].type !== 'emptyLine') {
        end++
    }
    return [start, end - 1]
}