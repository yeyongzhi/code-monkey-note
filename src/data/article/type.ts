export type ArticleItemType = 
'title' | 
'title1' | 
'title2' | 
'title3' | 
'content' | 
'image' | 
'code' | 
'orderList' | 
'unorderList' | 
'bolder' | 
'underline' |
'quote' | // 引用样式
'carousel' // 轮播图

export interface CarouselItem {
    name: string;
    url: string;
}

export interface ArticleItem {
    type: ArticleItemType | Array<ArticleItemType>;
    content: string | Array<string> | Array<CarouselItem>;
}