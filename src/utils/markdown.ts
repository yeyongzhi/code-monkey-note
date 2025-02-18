const noHandleTypeList = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "emptyLine",
    "text",
    "divider",
    "link"
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
    console.log(content)
    let result: any = []
    let i = 0;
    const fn = () => {
        const c = content[i]
        if (c.type === 'text') {
            result.push({
                type: c.type,
                content: handleLineText(c.content)
            })
            i++
            if (i < content.length - 1) {
                fn()
            }
        } else if (noHandleTypeList.includes(c.type)) {
            // 处理单行的内容
            result.push(c)
            i++
            if (i < content.length - 1) {
                fn()
            }
        } else if (c.type === 'unorderList') {
            const range = getContinuousRangeIndex(content, i)
            result.push({
                type: c.type,
                content: content.slice(range[0], range[1] + 1).map(item => item.content)
            })
            i = range[1] + 1
            if (i < content.length - 1) {
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
            if (i < content.length - 1) {
                fn()
            }
        } else if (c.type === 'quote') {
            const range = getQuoteRangeIndex(content, i)
            result.push({
                type: c.type,
                content: content.slice(range[0], range[1] + 1).map(item => item.content)
            })
            i = range[1] + 1
            if (i < content.length - 1) {
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
    if (text.startsWith("- ")) {
        type = 'unorderList' // 无序列表
    }
    if (text.startsWith("> ")) {
        type = 'quote' // 无序列表
    }
    if (text === '---' || text === '***') {
        type = 'divider' // 
    }
    if (/\[([^\]]+)\]\(([^)]+)\s*("[^"]*")?\)/g.test(text)) {
        type = 'link' // 链接
        content = /\[([^\]]+)\]\(([^)]+)\)/g.exec(text)
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

// const lineTextFormat = [
//     "**",
//     "__",
//     "*",
//     "_",
//     "~~",
//     "`",
// ]

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

    console.log(htmlText);
    return htmlText
}

export function getContinuousRangeIndex(content: Array<any>, start: number) {
    const type = content[start].type
    let end = start
    while (end < content.length && content[end].type === type) {
        end++
    }
    return [start, end - 1]
}

export function getQuoteRangeIndex(content: Array<any>, start: number) {
    let end = start
    while (end < content.length && content[end].type !== 'emptyLine') {
        end++
    }
    return [start, end - 1]
}