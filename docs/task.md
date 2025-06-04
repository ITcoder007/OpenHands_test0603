# 任务列表

## 逻辑分析

 ["sql/init.sql", "创建数据库表：domains 和 certificates。作为基础，所有后端操作依赖此表结构。无导入依赖。"],
        ["backend/src/main/java/com/certificate/model/Domain.java", "包含 Domain 实体类，定义域名数据结构。被 DomainMapper、DomainService 依赖。无外部导入。"],
        ["backend/src/main/java/com/certificate/model/Certificate.java", "包含 Certificate 实体类，定义证书数据结构。被 CertificateMapper、CertificateService 依赖。无外部导入。"],
        ["backend/src/main/java/com/certificate/dto/DomainDTO.java", "数据传输对象 (DTO)，用于添加/更新域名。DomainController 依赖此。导入 Domain 模型。"],
        ["backend/src/main/java/com/certificate/dto/CertificateDTO.java", "DTO 用于添加/更新证书。CertificateController 依赖。导入 Certificate 模型。"],
        ["backend/src/main/java/com/certificate/vo/DomainVO.java", "视图对象 (VO)，用于 API 响应。DomainController 依赖。导入 Domain 模型。"],
        ["backend/src/main/java/com/certificate/vo/CertificateVO.java", "VO 用于证书 API 响应。CertificateController 依赖。导入 Certificate 模型。"],
        ["backend/src/main/java/com/certificate/dao/DomainMapper.java", "DAO 接口，定义域名数据库操作。依赖 Domain 模型，被 DomainService 调用。导入 MyBatis 注解。"],
        ["backend/src/main/java/com/certificate/dao/CertificateMapper.java", "DAO 接口，定义证书数据库操作。依赖 Certificate 模型，被 CertificateService 调用。导入 MyBatis 注解。"],
        ["backend/src/main/resources/mapper/DomainMapper.xml", "MyBatis XML 映射文件，实现 SQL 查询。依赖 DomainMapper 接口。"],
        ["backend/src/main/resources/mapper/CertificateMapper.xml", "MyBatis XML 映射文件，实现复杂 SQL（如状态更新）。依赖 CertificateMapper 接口。"],
        ["backend/src/main/java/com/certificate/service/DomainService.java", "服务层，实现域名业务逻辑（如创建、删除）。依赖 DomainMapper，被 DomainController 调用。导入 Domain 模型和 DTO。"],
        ["backend/src/main/java/com/certificate/service/CertificateService.java", "服务层，实现证书业务逻辑（如状态流转）。依赖 CertificateMapper，被 CertificateController 调用。包含 int 转 boolean 类型转换逻辑。导入 Certificate 模型和 DTO。"],
        ["backend/src/main/java/com/certificate/controller/DomainController.java", "控制器，暴露域名 RESTful API。依赖 DomainService 和 DTO/VO。被前端 API 调用。导入 Spring Boot 注解。"],
        ["backend/src/main/java/com/certificate/controller/CertificateController.java", "控制器，暴露证书 RESTful API。依赖 CertificateService 和 DTO/VO。被前端 API 调用。导入 Spring Boot 注解。"],
        ["backend/src/main/java/com/certificate/config/MyBatisConfig.java", "配置 MyBatis，处理数据库连接。无依赖，需在 DAO 前实现。"],
        ["backend/src/main/resources/application.properties", "应用配置文件，设置数据库连接等。无依赖。"],
        ["backend/src/main/java/com/certificate/Application.java", "Spring Boot 主入口。依赖所有控制器和服务。导入 Spring Boot 启动类。"],
        ["backend/pom.xml", "Maven 配置文件，管理 Java 依赖。需在编码前配置。"],
        ["frontend/src/models/Domain.ts", "前端域名模型接口。被 domainApi 和页面组件依赖。"],
        ["frontend/src/models/Certificate.ts", "前端证书模型接口。被 certificateApi 和页面组件依赖。"],
        ["frontend/src/api/domainApi.ts", "前端域名 API 服务，调用后端接口。依赖 Domain 模型，被页面组件调用。导入 axios 或 fetch。"],
        ["frontend/src/api/certificateApi.ts", "前端证书 API 服务，调用后端接口。依赖 Certificate 模型，被页面组件调用。导入 axios 或 fetch。"],
        ["frontend/src/pages/DomainList.tsx", "域名列表页面。依赖 domainApi。"],
        ["frontend/src/pages/DomainAdd.tsx", "添加域名页面。依赖 domainApi。"],
        ["frontend/src/pages/DomainEdit.tsx", "编辑域名页面。依赖 domainApi。"],
        ["frontend/src/pages/DomainDetail.tsx", "域名详情页面。依赖 domainApi 和 certificateApi（用于关联证书）。"],
        ["frontend/src/pages/CertificateList.tsx", "证书列表页面。依赖 certificateApi。"],
        ["frontend/src/pages/CertificateAdd.tsx", "添加证书页面。依赖 certificateApi。"],
        ["frontend/src/pages/CertificateEdit.tsx", "编辑证书页面。依赖 certificateApi。"],
        ["frontend/src/pages/CertificateDetail.tsx", "证书详情页面。依赖 certificateApi。"],
        ["frontend/src/App.tsx", "React 主应用，路由配置。依赖所有页面组件。"],
        ["frontend/package.json", "npm 配置文件，管理前端依赖。需在开发前配置。"]

## 任务列表

 "sql/init.sql",
        "backend/pom.xml",
        "frontend/package.json",
        "backend/src/main/resources/application.properties",
        "backend/src/main/java/com/certificate/config/MyBatisConfig.java",
        "backend/src/main/java/com/certificate/model/Domain.java",
        "backend/src/main/java/com/certificate/model/Certificate.java",
        "backend/src/main/java/com/certificate/dto/DomainDTO.java",
        "backend/src/main/java/com/certificate/dto/CertificateDTO.java",
        "backend/src/main/java/com/certificate/vo/DomainVO.java",
        "backend/src/main/java/com/certificate/vo/CertificateVO.java",
        "backend/src/main/java/com/certificate/dao/DomainMapper.java",
        "backend/src/main/java/com/certificate/dao/CertificateMapper.java",
        "backend/src/main/resources/mapper/DomainMapper.xml",
        "backend/src/main/resources/mapper/CertificateMapper.xml",
        "backend/src/main/java/com/certificate/service/DomainService.java",
        "backend/src/main/java/com/certificate/service/CertificateService.java",
        "backend/src/main/java/com/certificate/controller/DomainController.java",
        "backend/src/main/java/com/certificate/controller/CertificateController.java",
        "backend/src/main/java/com/certificate/Application.java",
        "frontend/src/models/Domain.ts",
        "frontend/src/models/Certificate.ts",
        "frontend/src/api/domainApi.ts",
        "frontend/src/api/certificateApi.ts",
        "frontend/src/pages/DomainList.tsx",
        "frontend/src/pages/DomainAdd.tsx",
        "frontend/src/pages/DomainEdit.tsx",
        "frontend/src/pages/DomainDetail.tsx",
        "frontend/src/pages/CertificateList.tsx",
        "frontend/src/pages/CertificateAdd.tsx",
        "frontend/src/pages/CertificateEdit.tsx",
        "frontend/src/pages/CertificateDetail.tsx",
        "frontend/src/App.tsx"

## API 规范(Full API spec)

```yaml
openapi: 3.0.0\ninfo:\n  title: 证书和域名管理系统 API\n  version: 1.0.0\npaths:\n  /api/domains:\n    get:\n      summary: 查询域名列表\n      responses:\n        '200':\n          description: 成功返回域名列表\n          content:\n            application/json:\n              schema:\n                type: array\n                items:\n                  $ref: '#/components/schemas/DomainVO'\n    post:\n      summary: 添加新域名\n      requestBody:\n        required: true\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/DomainDTO'\n      responses:\n        '200':\n          description: 成功添加域名\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/DomainVO'\n  /api/domains/{id}:\n    get:\n      summary: 查询域名详情\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema:\n            type: string\n      responses:\n        '200':\n          description: 成功返回域名详情\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/DomainVO'\n    put:\n      summary: 编辑域名\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema:\n            type: string\n      requestBody:\n        required: true\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/DomainDTO'\n      responses:\n        '200':\n          description: 成功更新域名\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/DomainVO'\n    delete:\n      summary: 删除域名\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema:\n            type: string\n      responses:\n        '200':\n          description: 删除成功返回 true\n          content:\n            application/json:\n              schema:\n                type: boolean\n  /api/certificates:\n    get:\n      summary: 查询证书列表（按域名过滤）\n      parameters:\n        - name: domainId\n          in: query\n          schema:\n            type: string\n      responses:\n        '200':\n          description: 成功返回证书列表\n          content:\n            application/json:\n              schema:\n                type: array\n                items:\n                  $ref: '#/components/schemas/CertificateVO'\n    post:\n      summary: 添加新证书\n      requestBody:\n        required: true\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/CertificateDTO'\n      responses:\n        '200':\n          description: 成功添加证书\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/CertificateVO'\n  /api/certificates/{id}:\n    get:\n      summary: 查询证书详情\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema:\n            type: string\n      responses:\n        '200':\n          description: 成功返回证书详情\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/CertificateVO'\n    put:\n      summary: 编辑证书\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema:\n            type: string\n      requestBody:\n        required: true\n        content:\n          application/json:\n            schema:\n              $ref: '#/components/schemas/CertificateDTO'\n      responses:\n        '200':\n          description: 成功更新证书\n          content:\n            application/json:\n              schema:\n                $ref: '#/components/schemas/CertificateVO'\n    delete:\n      summary: 删除证书\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema:\n            type: string\n      responses:\n        '200':\n          description: 删除成功返回 true\n          content:\n            application/json:\n              schema:\n                type: boolean\n  /api/certificates/{id}/status:\n    post:\n      summary: 变更证书状态\n      parameters:\n        - name: id\n          in: path\n          required: true\n          schema:\n            type: string\n        - name: status\n          in: query\n          required: true\n          schema:\n            type: string\n      responses:\n        '200':\n          description: 状态变更成功返回 true\n          content:\n            application/json:\n              schema:\n                type: boolean\ncomponents:\n  schemas:\n    DomainDTO:\n      type: object\n      properties:\n        name:\n          type: string\n        description:\n          type: string\n    CertificateDTO:\n      type: object\n      properties:\n        name:\n          type: string\n        domainId:\n          type: string\n        startDate:\n          type: string\n          format: date-time\n        endDate:\n          type: string\n          format: date-time\n        contentMd5:\n          type: string\n    DomainVO:\n      type: object\n      properties:\n        id:\n          type: string\n        name:\n          type: string\n        description:\n          type: string\n        status:\n          type: string\n        createdAt:\n          type: string\n          format: date-time\n        updatedAt:\n          type: string\n          format: date-time\n    CertificateVO:\n      type: object\n      properties:\n        id:\n          type: string\n        name:\n          type: string\n        domainId:\n          type: string\n        startDate:\n          type: string\n          format: date-time\n        endDate:\n          type: string\n          format: date-time\n        status:\n          type: string\n        contentMd5:\n          type: string\n        createdAt:\n          type: string\n          format: date-time\n        updatedAt:\n          type: string\n          format: date-time
```

## 通用知识

1. 后端服务层（如 CertificateService）包含类型转换逻辑：将 MyBatis 返回的 int 类型（数据库操作影响行数）转换为 boolean 类型，确保 API 接口一致性。
2. MyBatis 配置在 MyBatisConfig.java 中处理，需正确设置 XML 映射路径和数据库连接。
3. DTO（数据传输对象）用于 API 请求，避免直接暴露实体模型；VO（视图对象）用于 API 响应，包含必要字段。
   
   4.前端 API 服务（certificateApi.ts, domainApi.ts）使用 TypeScript 定义类型，确保与后端 DTO/VO 匹配。
   
   5.数据库表通过 sql/init.sql 初始化，包含外键约束（如 certificates 表引用 domains 表）。
