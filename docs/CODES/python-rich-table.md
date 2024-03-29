---
title: 自动生成字符表格
updateTime: 2023/03/11
tags: Python|table
---

## Intro
作为技术人员，不管是主动的还是被动的，我们时常要写文档。而我们更乐意使用 Markdown 来完成文档工作——简洁且维护方便。如本博客，所有的文章都是基于 Markdown 来编写的。

我们的许多笔记工具，对 Markdown 的支持度也越来越高，有的还在 Markdown 的基于上进行优化，使内容显示更美观，操作更方便，并支持更多内容和媒体的显示，如视频、流程图、轻量富文本、复杂表格。

Markdown 原本就支持表格内容，但没有辅助工具的话，源码的可读比较差，而且稍复杂的表格，就实现不了了。

比如我想使用表格画一个简单的组件结构图，如果可以用字符形式就把这个图画出来，那是非常便于记录和传播的事。使用文字制表符是个好办法，可是如果手动来码，得累死，而且大一点的变更就要重新画。

我找到一个自动生成的工具：[rich](https://github.com/Textualize/rich)

这是一个 Python 库，而且功能远不止生成表格。但本文只着重说说表格的操作。

## 安装
假定你已安装好 Python。以下是使用 `pip` 安装 rich 库：

```bash
python -m pip install rich
```

安装好后，可以在终端中测试一下：
```bash
python -m rich
```

然后我发现作者把这个库能做的大部分效果都秀了一把：

![screenshot](/assets/docs/python-rich.png)

## 制作表格
新建一个 `.py` 文件：

```python
# table.py
from rich.console import Console
from rich.table import Table

cell = Table(show_header = False, show_lines=True)
cell.add_row("Title of Sub Table", "Title Two")
cell.add_row("You can add more,\nif you want")

subTable = Table(show_header = False)
subTable.add_row("Left\nColumn", cell, "Right\nColumn")

table = Table()
table.add_column("Title of Table")
table.add_row(subTable)

console = Console()
console.print(table)
```

以上是一个嵌套表格。在终端中执行一下：

```bash
python table.py
```

生成效果如下：
![screenshot](/assets/docs/rich-table-eg.png)

好了，现在我可以非常方便地将这个表格的内容复制到文档中：

```vim
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Title of Table                                           ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ ┌────────┬────────────────────────────────────┬────────┐ │
│ │ Left   │ ┌────────────────────┬───────────┐ │ Right  │ │
│ │ Column │ │ Title of Sub Table │ Title Two │ │ Column │ │
│ │        │ ├────────────────────┼───────────┤ │        │ │
│ │        │ │ You can add more,  │           │ │        │ │
│ │        │ │ if you want        │           │ │        │ │
│ │        │ └────────────────────┴───────────┘ │        │ │
│ └────────┴────────────────────────────────────┴────────┘ │
└──────────────────────────────────────────────────────────┘
```

保留 `.py` 的源文件，后面修改时也比较容易。

目前发现的唯一不足，就是它会受到 markdown 显示工具/网页使用的字体影响。如果未设置合适的等宽字体，显示效果就会与预期不太一样。