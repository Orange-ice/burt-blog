## 启动数据库 （PostgreSQL）

### 创建数据库目录

在项目里创建 blog-data 目录，`.gitignore` 文件里添加 /blog-data/。

### 启动 PostgreSQL

**创建 docker 容器**

```bash
docker run -v $(pwd)/blog-data:/var/lib/postgresql/data -p 5432:5432 --name=postgres-blog -e POSTGRES_USER=blog -e POSTGRES_PASSWORD=123456 -d postgres
```

**创建数据库**

```sql
CREATE
DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 安装 Prisma

```bash
pnpm add -D prisma

# 可运行 prisma，查看可用指令
pnpm exec prisma

# 创建 Prisma Schema 文件模板 来设置 Prisma（会生成 prisma/schema.prisma 和 .env 两个文件）
pnpm exec prisma init
```

### 在schema.prisma 文件中设置数据库

```prisma
// example
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  username  String   @unique @db.VarChar(16)
  password  String   @db.VarChar(256)
  avatar    String?  @db.VarChar(256)
}
```

### 将数据模型映射到数据库模型

```bash
# 在运行 prisma migrate dev 之后，会运行 `generate` ，该命令依赖于 @prisma/client，故先安装好依赖。
pnpm add -D @prisma/client

pnpm exec prisma migrate dev --name init
```

> 这条命令会做两件事：
> 1.创建迁移文件
> 2.对数据库运行迁移文件

```ts
// prisma generate 会生成 Prisma Client，然后就可以在代码里通过 Prisma Client 调用数据库了。
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
```


