# CLAUDE.md

这个文件为Claude Code (claude.ai/code)在此代码库中工作提供指导。

## 开发命令

### 后端 (Spring Boot + Maven)
- **编译**: `cd backend && mvn clean compile`
- **运行**: `cd backend && mvn spring-boot:run`
- **测试**: `cd backend && mvn test`
- **打包**: `cd backend && mvn package`

### 前端 (React + Vite)
- **开发模式**: `cd frontend && npm run dev`
- **构建**: `cd frontend && npm run build`
- **测试**: `cd frontend && npm test`
- **代码检查**: `cd frontend && npm run lint`
- **预览**: `cd frontend && npm run preview`

### 数据库
- **初始化**: 在MySQL数据库中执行 `sql/init.sql`
- **连接信息**: MySQL localhost:3306，数据库名：`certificate_management`

## 系统架构概览

这是一个证书和域名管理系统，采用Java Spring Boot后端和React TypeScript前端架构。

### 后端架构
- **框架**: Spring Boot 3.2.0 + Java 17
- **数据库**: MySQL + MyBatis ORM
- **包结构**: 
  - `model/` - 实体类 (Domain, Certificate)
  - `dto/` - 数据传输对象，用于API请求
  - `vo/` - 视图对象，用于API响应
  - `dao/` - MyBatis Mapper接口
  - `service/` - 业务逻辑层
  - `controller/` - REST API控制器
  - `config/` - Spring配置类

### 前端架构
- **框架**: React 18 + TypeScript
- **UI组件库**: Ant Design (antd)
- **状态管理**: Redux Toolkit
- **路由**: React Router DOM
- **HTTP客户端**: Axios
- **构建工具**: Vite

### 关键设计模式
- **API结构**: RESTful接口，统一使用 `/api/` 上下文路径
- **数据流**: DTO (请求) → Service → Mapper → 数据库 → VO (响应)
- **类型安全**: MyBatis返回影响行数(`int`)，在service层转换为`boolean`
- **数据库关联**: 证书通过外键关联域名，支持级联删除

### 数据库设计
- **domains表**: 核心域名实体，包含状态跟踪
- **certificates表**: SSL证书，关联域名并包含有效期管理
- **索引优化**: 针对域名、证书domain_id和状态字段建立索引

### API接口规范
- **域名管理**: `/api/domains` - CRUD操作
- **证书管理**: `/api/certificates` - CRUD操作及状态管理
- **状态更新**: `/api/certificates/{id}/status` - 证书生命周期管理

## 配置说明
- 后端运行在8080端口，使用 `/api` 上下文路径
- 前端开发服务器通常运行在5173端口
- 数据库连接池使用HikariCP配置
- Maven使用阿里云镜像源提升国内下载速度
- MyBatis XML映射文件位于 `src/main/resources/mapper/`