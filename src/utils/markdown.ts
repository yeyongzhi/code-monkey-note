const noHandleTypeList = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "emptyLine",
    "text"
]

/**
 * 格式化markdown的内容
 * @param {string} str markdown内容
 */
export function formatMarkDown(str: string) {
    const text = str.split(/\r?\n/)
    console.log(text)
    const content: Array<any> = text.map(t => {
        return identifyLine(t)
    })
    console.log(content)
    let result: any = []
    let diff = 1
    let i = 0;
    const fn = () => {
        const c = content[i]
        if(noHandleTypeList.includes(c.type)) {
            result.push(c)
            i++
            fn()
        } else if(c.type === 'unorderList') {
            const range = getContinuousRangeIndex(content, i)
            result.push({
                type: c.type,
                content: content.slice(range[0], range[1] + 1).map(item => item.content.replace("- ", ""))
            })
        }
    }
    fn()
    return result
}

export function identifyLine(text: string) {
    let type = "text"
    // 标题一
    if(text.startsWith("# ")) {
        type = 'h1'
    }
    if(text.startsWith("## ")) {
        type = 'h2'
    }
    if(text.startsWith("### ")) {
        type = 'h3'
    }
    if(text.startsWith("#### ")) {
        type = 'h4'
    }
    if(text.startsWith("##### ")) {
        type = 'h5'
    }
    if(text.startsWith("###### ")) {
        type = 'h6'
    }
    if(text.startsWith("- ")) {
        type = 'unorderList' // 无序列表
    }
    if(text.length === 0) {
        type = 'emptyLine' // 空行
    }
    return {
        type,
        content: text
    }
}

export function getContinuousRangeIndex(content: Array<any>, index: number) {
    const type = content[index].type
    let end = index
    while(content[end].type === type) {
        end ++
    }
    return [index, end - 1]
}