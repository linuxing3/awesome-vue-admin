---
title: "Prisma"
---

# Prisma 一体化数据容器平台

[查看 prisma 文档](https://www.prisma.io/docs/quickstart/)

## 如何使用 Usage

部署、生成、演示一气呵成

```sh
yarn prisma:deploy
yarn prisma:generate
yarn prisma:demo
```

## 服务器 Server

自动化服务器后端设置

### 数据模型 datamodel

`datamodel.prisma`

```
type User {
  id: ID! @unique
  name: String!
  sex: String!
  position: String!
  income: String!
}

type Document {
  id: ID! @unique
  title: String!
  author: String!
  text: String!
  tags: [String!]
}

type Activity {
  id: ID! @unique
  place: String!
  author: String!
  content: String!
}
```

### 初始化 Init

### 部署 Deploy

1. [直接部署到`prisma cloud`的演示服务器](<https://www.prisma.io/docs/1.14/tutorials/deploy-prisma-servers/prisma-coud-(google-cloud-sql)-mof4vo9gae>)

```sh
prisma deploy
```

2. [部署到`zeit`服务器](https://www.prisma.io/docs/1.14/tutorials/deploy-prisma-servers/zeit-now-and-google-cloud-sql-mohj5eiwot)

[now 文档](https://zeit.co/docs)

3. [部署到本地的`docker`服务器](<https://www.prisma.io/docs/1.14/tutorials/deploy-prisma-servers/local-(docker)-meemaesh3k>)

### 生成客户端代码 Generate client

`index.ts`

```js
import { DocumentNode, GraphQLSchema } from "graphql";
import { IResolvers } from "graphql-tools/dist/Interfaces";
import { makePrismaClientClass, BaseClientOptions } from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";
export const Prisma =
  makePrismaClientClass <
  ClientConstructor <
  Prisma >>
    {
      typeDefs,
      endpoint: `https://eu1.prisma.sh/wenju-xing-3d984a/demo/dev`,
    };
export const prisma = new Prisma();
```

`prisma-schema.ts`

```js
export const typeDefs = /* GraphQL */ `
  type Activity {
    id: ID!
    place: String!
    author: String!
    content: String!
  }
`;
```

## 调用客户端代码示例 Demos

```js
import { prisma, UserNode } from "../prisma";

async function main() {
  const users = await prisma.users();
  const usersWithAInName = await prisma.users({
    where: {
      name_contains: "A",
    },
  });
  /**
   * # generated mutation
      mutation {
        createUser(data: {
          name: "Alice"
          email: "alice@prisma.io"
          password: "IlikeTurtles"
        }) {
          id
          name
          email
          password
        }
      }
  */
  const user: UserNode = await prisma.createUser({
    name: "xing",
    sex: "male",
    position: "x",
    income: "10",
  });
  const updatedUser = await prisma.updateUser({
    data: {
      name: "Alice",
    },
    where: {
      id: "cjli512bd005g0a233s1ogbgy",
    },
  });
  const deletedUser = await prisma.deleteUser({
    id: "cjli47wr3005b0a23m9crhh0e",
  });
}
```
