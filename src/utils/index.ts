export function openTab(url: string) {
    window.open(url)
}

// 根据路径获取markdown文件内容
export async function getMarkDownContent(markdown_path: string) {
    let data = null
    try {
        const response = await fetch(markdown_path);
        const contentType = response.headers.get('Content-Type')
        if (contentType !== "text/markdown") {
            return null;
        }
        data = await response.text()
    } catch (err) {
        console.error("md文件读取出错")
    }
    if (data && data.length > 0) {
        // const result = formatMarkDown(data)
        return data
    } else {
        return ""
    }
}