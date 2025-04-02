export function openTab(url: string) {
    window.open(url)
}

// 根据路径获取markdown文件内容
export async function getMarkDownContent(markdown_path: string) {
    let data = null
    try {
        console.log("markdown文件url: " + markdown_path)
        const response = await fetch(markdown_path);
        console.log(response)
        const contentType = response.headers.get('Content-Type')
        console.log(contentType)
        if (contentType !== "text/markdown") {
            return null;
        }
        data = await response.text()
        console.log(data)
    } catch (err) {
        console.error("md文件读取出错")
        return null;
    }
    if (data && data.length > 0) {
        // const result = formatMarkDown(data)
        return data
    } else {
        return ""
    }
}