# 原子化CSS
原子化CSS是一种CSS设计方法，它将CSS样式分解为**更小、更具体的原子单元**，每个原子单元都代表**一个特定的样式属性（注意这里只能是一种）**。
这种方法的核心思想是将复杂的CSS样式分解为一系列简单的、可重用的原子样式，从而实现样式的模块化和可维护性。
---
原子化CSS的**主要优点**包括：

- **可维护性**：原子化CSS样式可以被<u>单独管理和维护</u>，从而提高了代码的可读性和可维护性。
- **可重用性**：原子化CSS样式可以被重复使用，从而减少了重复的CSS代码，提高了开发效率。
- **可扩展性**：原子化CSS样式可以根据需要进行<u>扩展和修改</u>，从而满足不同的设计需求。
- **可测试性**：原子化CSS样式可以被<u>单独测试</u>，从而<u>提高了代码的质量和可靠性</u>。

---
下面是一些常见的原子化CSS代码合集
---

## 原子CSS合集
### 内外边距（margin、padding）
```css
/* margin部分 */
.m-0 { margin: 0; }
.m-5 { margin: 5px; }
.m-10 { margin: 10px; }
.m-15 { margin: 15px; }
.m-20 { margin: 20px; }

.mt-0 { margin-top: 0; }
.mt-5 { margin-top: 5px; }
.mt-10 { margin-top: 10px; }
.mt-15 { margin-top: 15px; }
.mt-20 { margin-top: 20px; }

.mr-0 { margin-right: 0; }
.mr-5 { margin-right: 5px; }
.mr-10 { margin-right: 10px; }
.mr-15 { margin-right: 15px; }
.mr-20 { margin-right: 20px; }

.mb-0 { margin-bottom: 0; }
.mb-5 { margin-bottom: 5px; }
.mb-10 { margin-bottom: 10px; }
.mb-15 { margin-bottom: 15px; }
.mb-20 { margin-bottom: 20px; }

.ml-0 { margin-left: 0; }
.ml-5 { margin-left: 5px; }
.ml-10 { margin-left: 10px; }
.ml-15 { margin-left: 15px; }
.ml-20 { margin-left: 20px; }

/* ------------------------- */

/* padding部分 */
.p-0 { padding: 0; }
.p-5 { padding: 5px; }
.p-10 { padding: 10px; }
.p-15 { padding: 15px; }
.p-20 { padding: 20px; }

.pt-0 { padding-top: 0; }
.pt-5 { padding-top: 5px; }
.pt-10 { padding-top: 10px; }
.pt-15 { padding-top: 15px; }
.pt-20 { padding-top: 20px; }

.pr-0 { padding-right: 0; }
.pr-5 { padding-right: 5px; }
.pr-10 { padding-right: 10px; }
.pr-15 { padding-right: 15px; }
.pr-20 { padding-right: 20px; }

.pb-0 { padding-bottom: 0; }    
.pb-5 { padding-bottom: 5px; }
.pb-10 { padding-bottom: 10px; }
.pb-15 { padding-bottom: 15px; }
.pb-20 { padding-bottom: 20px; }

.pl-0 { padding-left: 0; }
.pl-5 { padding-left: 5px; }
.pl-10 { padding-left: 10px; }
.pl-15 { padding-left: 15px; }
.pl-20 { padding-left: 20px; }
```

### 文字部分（text）

```css
/* 字体大小 */
.f-12 { font-size: 12px; }
.f-14 { font-size: 14px; }
.f-16 { font-size: 16px; }
.f-18 { font-size: 18px; }
.f-20 { font-size: 20px; }
.f-22 { font-size: 22px; }
.f-24 { font-size: 24px; }
.f-26 { font-size: 26px; }
.f-28 { font-size: 28px; }
.f-30 { font-size: 30px; }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

```
### flex布局（display: felx;）🔥🔥🔥