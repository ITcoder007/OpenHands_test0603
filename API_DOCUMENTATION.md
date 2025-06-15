# 证书域名管理系统 API 文档

## 基础信息

- **基础URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **字符编码**: UTF-8

## 通用响应格式

### 成功响应
```json
{
  "data": {}, // 响应数据
  "message": "success"
}
```

### 错误响应
```json
{
  "error": "错误信息",
  "code": "错误代码"
}
```

## 域名管理接口

### 1. 获取域名列表
- **接口**: `GET /api/domains`
- **描述**: 获取所有域名列表
- **请求参数**: 无
- **响应示例**:
```json
[
  {
    "id": "1",
    "name": "example.com",
    "description": "示例域名",
    "status": "ACTIVE",
    "createdAt": "2025-06-15T19:31:42.142Z",
    "updatedAt": "2025-06-15T19:31:42.142Z"
  }
]
```

### 2. 获取域名详情
- **接口**: `GET /api/domains/{id}`
- **描述**: 根据ID获取域名详细信息
- **路径参数**: 
  - `id`: 域名ID (必需)
- **响应示例**:
```json
{
  "id": "1",
  "name": "example.com",
  "description": "示例域名",
  "status": "ACTIVE",
  "createdAt": "2025-06-15T19:31:42.142Z",
  "updatedAt": "2025-06-15T19:31:42.142Z"
}
```

### 3. 添加域名
- **接口**: `POST /api/domains`
- **描述**: 创建新的域名
- **请求体**:
```json
{
  "name": "example.com",
  "description": "域名描述"
}
```
- **响应示例**:
```json
{
  "id": "3",
  "name": "example.com",
  "description": "域名描述",
  "status": "ACTIVE",
  "createdAt": "2025-06-15T19:35:09.729Z",
  "updatedAt": "2025-06-15T19:35:09.729Z"
}
```

### 4. 更新域名
- **接口**: `PUT /api/domains/{id}`
- **描述**: 更新指定域名信息
- **路径参数**: 
  - `id`: 域名ID (必需)
- **请求体**:
```json
{
  "name": "updated-example.com",
  "description": "更新后的域名描述"
}
```
- **响应示例**:
```json
{
  "id": "1",
  "name": "updated-example.com",
  "description": "更新后的域名描述",
  "status": "ACTIVE",
  "createdAt": "2025-06-15T19:31:42.142Z",
  "updatedAt": "2025-06-15T19:40:00.000Z"
}
```

### 5. 删除域名
- **接口**: `DELETE /api/domains/{id}`
- **描述**: 删除指定域名
- **路径参数**: 
  - `id`: 域名ID (必需)
- **响应**: `true` (删除成功) 或 `false` (删除失败)

## 证书管理接口

### 1. 获取证书列表
- **接口**: `GET /api/certificates`
- **描述**: 获取证书列表，支持按域名过滤
- **查询参数**: 
  - `domainId`: 域名ID (可选，用于过滤特定域名的证书)
- **响应示例**:
```json
[
  {
    "id": "1",
    "name": "example.com SSL",
    "domainId": "1",
    "startDate": "2025-06-15T19:31:42.142Z",
    "endDate": "2026-06-15T19:31:42.142Z",
    "status": "ACTIVE",
    "contentMd5": "abc123",
    "createdAt": "2025-06-15T19:31:42.142Z",
    "updatedAt": "2025-06-15T19:31:42.142Z"
  }
]
```

### 2. 获取证书详情
- **接口**: `GET /api/certificates/{id}`
- **描述**: 根据ID获取证书详细信息
- **路径参数**: 
  - `id`: 证书ID (必需)
- **响应示例**:
```json
{
  "id": "1",
  "name": "example.com SSL",
  "domainId": "1",
  "startDate": "2025-06-15T19:31:42.142Z",
  "endDate": "2026-06-15T19:31:42.142Z",
  "status": "ACTIVE",
  "contentMd5": "abc123",
  "createdAt": "2025-06-15T19:31:42.142Z",
  "updatedAt": "2025-06-15T19:31:42.142Z"
}
```

### 3. 添加证书
- **接口**: `POST /api/certificates`
- **描述**: 创建新的证书
- **请求体**:
```json
{
  "name": "example.com SSL",
  "domainId": "1",
  "startDate": "2025-06-15T19:31:42.142Z",
  "endDate": "2026-06-15T19:31:42.142Z",
  "contentMd5": "abc123def456"
}
```
- **响应示例**:
```json
{
  "id": "2",
  "name": "example.com SSL",
  "domainId": "1",
  "startDate": "2025-06-15T19:31:42.142Z",
  "endDate": "2026-06-15T19:31:42.142Z",
  "status": "ACTIVE",
  "contentMd5": "abc123def456",
  "createdAt": "2025-06-15T19:45:00.000Z",
  "updatedAt": "2025-06-15T19:45:00.000Z"
}
```

### 4. 更新证书
- **接口**: `PUT /api/certificates/{id}`
- **描述**: 更新指定证书信息
- **路径参数**: 
  - `id`: 证书ID (必需)
- **请求体**:
```json
{
  "name": "updated SSL certificate",
  "domainId": "1",
  "startDate": "2025-06-15T19:31:42.142Z",
  "endDate": "2026-06-15T19:31:42.142Z",
  "contentMd5": "updated123"
}
```
- **响应示例**:
```json
{
  "id": "1",
  "name": "updated SSL certificate",
  "domainId": "1",
  "startDate": "2025-06-15T19:31:42.142Z",
  "endDate": "2026-06-15T19:31:42.142Z",
  "status": "ACTIVE",
  "contentMd5": "updated123",
  "createdAt": "2025-06-15T19:31:42.142Z",
  "updatedAt": "2025-06-15T19:50:00.000Z"
}
```

### 5. 更新证书状态
- **接口**: `POST /api/certificates/{id}/status`
- **描述**: 更新证书状态
- **路径参数**: 
  - `id`: 证书ID (必需)
- **查询参数**: 
  - `status`: 新状态值 (必需)，可选值：`ACTIVE`, `EXPIRED`, `REVOKED`, `PENDING`
- **响应**: `true` (更新成功) 或 `false` (更新失败)

### 6. 删除证书
- **接口**: `DELETE /api/certificates/{id}`
- **描述**: 删除指定证书
- **路径参数**: 
  - `id`: 证书ID (必需)
- **响应**: `true` (删除成功) 或 `false` (删除失败)

## 健康检查接口

### 健康检查
- **接口**: `GET /api/health`
- **描述**: 检查服务健康状态
- **响应**: `"OK"`

## 状态码说明

- **200 OK**: 请求成功
- **400 Bad Request**: 请求参数错误
- **404 Not Found**: 资源不存在
- **500 Internal Server Error**: 服务器内部错误

## 数据类型说明

### 域名状态 (Domain Status)
- `ACTIVE`: 激活
- `INACTIVE`: 非激活
- `PENDING`: 待处理
- `DELETED`: 已删除

### 证书状态 (Certificate Status)
- `ACTIVE`: 有效
- `EXPIRED`: 已过期
- `REVOKED`: 已吊销
- `PENDING`: 待处理

## 前端调用示例

### JavaScript/TypeScript 调用示例
```typescript
// 获取域名列表
const domains = await fetch('/api/domains').then(res => res.json());

// 添加域名
const newDomain = await fetch('/api/domains', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'example.com',
    description: '示例域名'
  })
}).then(res => res.json());

// 获取证书列表（按域名过滤）
const certificates = await fetch('/api/certificates?domainId=1')
  .then(res => res.json());

// 更新证书状态
const result = await fetch('/api/certificates/1/status?status=EXPIRED', {
  method: 'POST'
}).then(res => res.json());
```