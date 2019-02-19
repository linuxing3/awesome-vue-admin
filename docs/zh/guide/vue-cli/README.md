---
title: "核心概念"
---

# 核心概念

## 查看命令行工具

[vue-cli](./one.html)

## 插件

[vue-cli-plugin](./two.html)

## 踩坑记

### nedb 无法持久化存储

解决办法：使用路径

```js
let db = Database({
  filename: "db.json"
  autoload: true
})
```

### typescript 的 any 错误

`tsconfig.json`

```js
{
  "noImplicitAny": false
}
```

### eslint 的 no-console 错误

```js
{
  "rules": [
    {
      "no-console": off,
      "no-debugger": off,
      "no-trailing-spaces": process.env.NODE_ENV === "production" ? "error" : "error",
      "vue/html-indent": [
      "error",
        2,
        {
          attribute: 2,
          closeBracket: 1,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      "vue/max-attributes-per-line": [
        "error",
        2,
        {
          singleline: 1,
          multiline: {
            max: 1,
            allowFirstLine: false,
          },
        },
      ],
      "vue/no-side-effects-in-computed-properties":
        process.env.NODE_ENV === "production" ? "warn" : "off",
      }
  ]
}
```

### 在`component`中使用 Spread 函数

```js
import Vue, { Component } from "vue-property-decorator";
import { sync } from "vuex-pathify";

@Component({
  methods: {
    ...sync("user/*"),
  },
})
export default class Table extends Vue {}
```

### 使用`graphql`和`apollo`

`resolver` + `typeDef` = `schema`，用于服务器处理`data`

```js
import gql from "graph-tag";
// data
const book = {
  title: "vue apollo",
};
const books = [book];

// types definition

const bookDef = gql`
type Query {
  books: String[],
  book(title: String): Object
}
type Mutation {
  changeBookTitle(oldTitle: String, newTitle: String): Object
}
`;

// Resolver

const bookResolver = {
  books: () => {
    return books;
  },
  book: title => {
    return books.some(book => book.title === title);
  },
  changeBookTitle: oldTitle => {
    let newBook = books.some(book => book.title === oldTitle);
    newBook.title = newTitle;
    return newBook;
  },
};

// Schema
const bookSchema = buildSchema(bookDef, bookResolver);

// other code...
```
