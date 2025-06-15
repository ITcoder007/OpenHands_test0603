const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock 数据
let domains = [
  {
    id: "1",
    name: "example.com",
    description: "示例域名",
    status: "ACTIVE",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2", 
    name: "test.com",
    description: "测试域名",
    status: "ACTIVE",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let certificates = [
  {
    id: "1",
    name: "example.com SSL",
    domainId: "1",
    startDate: new Date(),
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    status: "ACTIVE",
    contentMd5: "abc123",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// 健康检查
app.get('/api/health', (req, res) => {
  res.send('OK');
});

// 域名管理接口
app.get('/api/domains', (req, res) => {
  res.json(domains);
});

app.get('/api/domains/:id', (req, res) => {
  const domain = domains.find(d => d.id === req.params.id);
  if (!domain) {
    return res.status(404).json({ error: 'Domain not found' });
  }
  res.json(domain);
});

app.post('/api/domains', (req, res) => {
  const newDomain = {
    id: String(domains.length + 1),
    name: req.body.name,
    description: req.body.description,
    status: "ACTIVE",
    createdAt: new Date(),
    updatedAt: new Date()
  };
  domains.push(newDomain);
  res.json(newDomain);
});

app.put('/api/domains/:id', (req, res) => {
  const domain = domains.find(d => d.id === req.params.id);
  if (!domain) {
    return res.status(404).json({ error: 'Domain not found' });
  }
  
  domain.name = req.body.name || domain.name;
  domain.description = req.body.description || domain.description;
  domain.updatedAt = new Date();
  
  res.json(domain);
});

app.delete('/api/domains/:id', (req, res) => {
  const index = domains.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Domain not found' });
  }
  
  domains.splice(index, 1);
  res.json(true);
});

// 证书管理接口
app.get('/api/certificates', (req, res) => {
  let result = certificates;
  if (req.query.domainId) {
    result = certificates.filter(c => c.domainId === req.query.domainId);
  }
  res.json(result);
});

app.get('/api/certificates/:id', (req, res) => {
  const certificate = certificates.find(c => c.id === req.params.id);
  if (!certificate) {
    return res.status(404).json({ error: 'Certificate not found' });
  }
  res.json(certificate);
});

app.post('/api/certificates', (req, res) => {
  const newCertificate = {
    id: String(certificates.length + 1),
    name: req.body.name,
    domainId: req.body.domainId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    status: "ACTIVE",
    contentMd5: req.body.contentMd5,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  certificates.push(newCertificate);
  res.json(newCertificate);
});

app.put('/api/certificates/:id', (req, res) => {
  const certificate = certificates.find(c => c.id === req.params.id);
  if (!certificate) {
    return res.status(404).json({ error: 'Certificate not found' });
  }
  
  Object.assign(certificate, req.body);
  certificate.updatedAt = new Date();
  
  res.json(certificate);
});

app.post('/api/certificates/:id/status', (req, res) => {
  const certificate = certificates.find(c => c.id === req.params.id);
  if (!certificate) {
    return res.status(404).json({ error: 'Certificate not found' });
  }
  
  certificate.status = req.query.status;
  certificate.updatedAt = new Date();
  
  res.json(true);
});

app.delete('/api/certificates/:id', (req, res) => {
  const index = certificates.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Certificate not found' });
  }
  
  certificates.splice(index, 1);
  res.json(true);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Mock服务器运行在 http://localhost:${PORT}`);
  console.log('API端点:');
  console.log('  GET /api/health - 健康检查');
  console.log('  GET /api/domains - 获取域名列表');
  console.log('  POST /api/domains - 添加域名');
  console.log('  GET /api/certificates - 获取证书列表');
  console.log('  POST /api/certificates - 添加证书');
});