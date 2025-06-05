import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, message, Spin } from 'antd';
import { getDomain, deleteDomain } from '../api/domainApi';
const DomainDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [domain, setDomain] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDomain = async () => {
            try {
                if (!id) {
                    message.error('Domain ID is required');
                    navigate('/domains');
                    return;
                }
                const data = await getDomain(id);
                setDomain(data);
            }
            catch (error) {
                message.error('Failed to fetch domain details');
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchDomain();
    }, [id, navigate]);
    const handleDelete = async () => {
        try {
            if (!id)
                return;
            setLoading(true);
            const success = await deleteDomain(id);
            if (success) {
                message.success('Domain deleted successfully');
                navigate('/domains');
            }
            else {
                message.error('Failed to delete domain');
            }
        }
        catch (error) {
            message.error('Error deleting domain');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleEdit = () => {
        if (!id)
            return;
        navigate(`/domains/${id}/edit`);
    };
    if (loading) {
        return _jsx(Spin, { size: "large" });
    }
    if (!domain) {
        return _jsx("div", { children: "Domain not found" });
    }
    return (_jsx("div", { style: { padding: '24px' }, children: _jsx(Card, { title: "Domain Details", extra: [
                _jsx(Button, { type: "primary", onClick: handleEdit, style: { marginRight: 8 }, children: "Edit" }, "edit"),
                _jsx(Button, { danger: true, onClick: handleDelete, children: "Delete" }, "delete"),
            ], children: _jsxs(Descriptions, { bordered: true, column: 1, children: [_jsx(Descriptions.Item, { label: "ID", children: domain.id }), _jsx(Descriptions.Item, { label: "Name", children: domain.name }), _jsx(Descriptions.Item, { label: "Description", children: domain.description || 'N/A' }), _jsx(Descriptions.Item, { label: "Status", children: domain.status }), _jsx(Descriptions.Item, { label: "Created At", children: new Date(domain.createdAt).toLocaleString() }), _jsx(Descriptions.Item, { label: "Updated At", children: domain.updatedAt ? new Date(domain.updatedAt).toLocaleString() : 'N/A' })] }) }) }));
};
export default DomainDetail;
