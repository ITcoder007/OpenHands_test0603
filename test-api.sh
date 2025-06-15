#!/bin/bash

echo "=== 证书域名管理系统 API 测试 ==="

# 测试健康检查接口
echo "1. 测试健康检查..."
curl -X GET "http://localhost:8080/api/health" || echo "后端未启动"

# 测试域名API
echo -e "\n2. 测试域名管理API..."

# 获取所有域名
echo "获取域名列表:"
curl -X GET "http://localhost:8080/api/domains" -H "Content-Type: application/json" || echo "域名API未可用"

# 添加域名
echo -e "\n添加新域名:"
curl -X POST "http://localhost:8080/api/domains" \
  -H "Content-Type: application/json" \
  -d '{"name":"example.com","description":"测试域名"}' || echo "添加域名API未可用"

# 测试证书API
echo -e "\n3. 测试证书管理API..."

# 获取证书列表
echo "获取证书列表:"
curl -X GET "http://localhost:8080/api/certificates?domainId=test-domain-id" \
  -H "Content-Type: application/json" || echo "证书API未可用"

echo -e "\n=== 测试完成 ==="