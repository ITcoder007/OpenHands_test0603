import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Space, message } from 'antd';
import { getAllDomains, deleteDomain } from '../api/domainApi';
const DomainList = () => {
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchDomains();
    }, []);
    const fetchDomains = async () => {
        setLoading(true);
        try {
            const data = await getAllDomains();
            setDomains(data);
        }
        catch (error) {
            message.error('Failed to fetch domains');
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            const success = await deleteDomain(id);
            if (success) {
                message.success('Domain deleted successfully');
                fetchDomains();
            }
            else {
                message.error('Failed to delete domain');
            }
        }
        catch (error) {
            message.error('Error deleting domain');
        }
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (_jsx(Link, { to: `/domains/${record.id}`, children: text })),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (_jsxs(Space, { size: "middle", children: [_jsx(Link, { to: `/domains/${record.id}/edit`, children: _jsx(Button, { type: "link", children: "Edit" }) }), _jsx(Button, { type: "link", danger: true, onClick: () => handleDelete(record.id), children: "Delete" }), _jsx(Link, { to: `/domains/${record.id}/certificates`, children: _jsx(Button, { type: "primary", children: "View Certificates" }) })] })),
        },
    ];
    return (_jsxs("div", { children: [_jsx("div", { style: { marginBottom: 16 }, children: _jsx(Link, { to: "/domains/add", children: _jsx(Button, { type: "primary", children: "Add Domain" }) }) }), _jsx(Table, { columns: columns, dataSource: domains, rowKey: "id", loading: loading })] }));
};
export default DomainList;
