---
title: "Apollo Server"
---

# 核心概念

## 导入依赖库

```js
const express = require("express");
// const graphql = require("graphql");
const { ApolloServer, gql } = require("apollo-server-express");
```

## 准备数据

```js
const items = [
  {
    uuid: "65a6eb21-67b5-45c3-9af7-faca2d9b60d4",
    name: "Dessie",
    email: "Dessie7937@gmail.com",
    username: "Dessie79",
    jobTitle: "Web Developer",
    phone: "1-360-812-9380 x511",
    avatar: "/avatar/a2.jpg",
  },
  {
    uuid: "65a6eb21-67b5-45c3-9af7-faca2d9b60d4",
    name: "Daniel",
    email: "daniel@gmail.com",
    username: "Dessie79",
    jobTitle: "Web Developer",
    phone: "1-360-812-9380 x511",
    avatar: "/avatar/a2.jpg",
  },
];
```

## 定义类型结构

```js
const basicDef = `
  type User {
    uuid: String
    name: String
    email: String
    username: String
    jobTitle: String
    phone: String
    avatar: String
  }

  type Query {
    users: [User]
    firstUser: User
    hello: String
  }
`;
// Construct a schema, using GraphQL schema language
const typeDefs = gql(basicDef);
```

## 解析器

**导入模块化结构器**

```js
// Provide resolver functions for your schema fields
const resolvers = require("./resolver");
```

**结构器主文件**

::: Warning
这里如果使用`lodash.merge`好像会失败

因此采用了`...`解构对象的方法
:::

```js
const user = require("./user");
// Provide resolver functions for your schema fields
const root = {
  Query: {
    hello: () => "hello apollo!",
  },
};

// const resolvers = merge(root, user);
const resolvers = {
  Query: {
    ...root.Query,
    ...user.Query,
  },
};

module.exports = resolvers;
```

**独立的结构器模块**

```js
const Items = require("./items");
// Provide resolver functions for your schema fields
const resolver = {
  Query: {
    users: () => Items,
    firstUser: () => Items[0],
  },
};

module.exports = resolver;
```

## 启动服务器

```js
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
```
