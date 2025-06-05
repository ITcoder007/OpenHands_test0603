import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const App = () => {
    return (_jsx(BrowserRouter, { children: _jsxs(Layout, { style: { minHeight: '100vh' }, children: [_jsx(NavigationMenu, {}), _jsxs(Layout, { children: [_jsx(Header, { style: { padding: 0, background: '#fff' } }), _jsx(Content, { style: { margin: '24px 16px 0' }, children: _jsx("div", { style: { padding: 24, minHeight: 360, background: '#fff' }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(DomainList, {}) }), _jsx(Route, { path: "/domains", element: _jsx(DomainList, {}) }), _jsx(Route, { path: "/domains/add", element: _jsx(DomainAdd, {}) }), _jsx(Route, { path: "/domains/:id", element: _jsx(DomainDetail, {}) }), _jsx(Route, { path: "/domains/:id/edit", element: _jsx(DomainEdit, {}) }), _jsx(Route, { path: "/domains/:id/certificates", element: _jsx(CertificateList, {}) }), _jsx(Route, { path: "/certificates", element: _jsx(CertificateList, {}) }), _jsx(Route, { path: "/certificates/add", element: _jsx(CertificateAdd, {}) }), _jsx(Route, { path: "/certificates/:id", element: _jsx(CertificateDetail, {}) }), _jsx(Route, { path: "/certificates/:id/edit", element: _jsx(CertificateEdit, {}) })] }) }) }), _jsx(Footer, { style: { textAlign: 'center' }, children: "Certificate and Domain Management System \u00A92023" })] })] }) }));
};
export default App;
