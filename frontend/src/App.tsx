import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DomainList from './pages/DomainList';
import DomainAdd from './pages/DomainAdd';
import DomainEdit from './pages/DomainEdit';
import DomainDetail from './pages/DomainDetail';
import CertificateList from './pages/CertificateList';
import CertificateAdd from './pages/CertificateAdd';
import CertificateEdit from './pages/CertificateEdit';
import CertificateDetail from './pages/CertificateDetail';
import { Layout } from 'antd';
import NavigationMenu from './components/NavigationMenu';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <NavigationMenu />
        <Layout>
          <Header style={{ padding: 0, background: '#fff' }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              <Routes>
                <Route path="/" element={<DomainList />} />
                <Route path="/domains" element={<DomainList />} />
                <Route path="/domains/add" element={<DomainAdd />} />
                <Route path="/domains/:id" element={<DomainDetail />} />
                <Route path="/domains/:id/edit" element={<DomainEdit />} />
                <Route path="/domains/:id/certificates" element={<CertificateList />} />
                <Route path="/certificates" element={<CertificateList />} />
                <Route path="/certificates/add" element={<CertificateAdd />} />
                <Route path="/certificates/:id" element={<CertificateDetail />} />
                <Route path="/certificates/:id/edit" element={<CertificateEdit />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Certificate and Domain Management System ©2023
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
