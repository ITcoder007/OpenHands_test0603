import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, message, Modal, Select, Space } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getCertificate, deleteCertificate, changeCertificateStatus } from '../api/certificateApi';
const { confirm } = Modal;
const CertificateDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                if (!id) {
                    message.error('Certificate ID is required');
                    navigate('/certificates');
                    return;
                }
                const data = await getCertificate(id);
                setCertificate(data);
                setSelectedStatus(data.status);
            }
            catch (error) {
                message.error('Failed to fetch certificate details');
                navigate('/certificates');
            }
            finally {
                setLoading(false);
            }
        };
        fetchCertificate();
    }, [id, navigate]);
    const handleDelete = () => {
        if (!id)
            return;
        confirm({
            title: 'Are you sure to delete this certificate?',
            icon: _jsx(ExclamationCircleFilled, {}),
            content: 'This action cannot be undone',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    await deleteCertificate(id);
                    message.success('Certificate deleted successfully');
                    navigate('/certificates');
                }
                catch (error) {
                    message.error('Failed to delete certificate');
                }
            },
        });
    };
    const handleStatusChange = async () => {
        if (!id || !selectedStatus)
            return;
        setStatusLoading(true);
        try {
            const success = await changeCertificateStatus(id, selectedStatus);
            if (success) {
                message.success('Certificate status updated successfully');
                const updatedCert = await getCertificate(id);
                setCertificate(updatedCert);
            }
            else {
                message.error('Failed to update certificate status');
            }
        }
        catch (error) {
            message.error('Failed to update certificate status');
        }
        finally {
            setStatusLoading(false);
        }
    };
    const handleEdit = () => {
        if (!id)
            return;
        navigate(`/certificates/${id}/edit`);
    };
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (!certificate) {
        return _jsx("div", { children: "Certificate not found" });
    }
    const statusOptions = [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'EXPIRED', label: 'Expired' },
        { value: 'REVOKED', label: 'Revoked' },
        { value: 'PENDING', label: 'Pending' },
    ];
    return (_jsx(Card, { title: "Certificate Details", extra: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: handleEdit, children: "Edit" }), _jsx(Button, { danger: true, onClick: handleDelete, children: "Delete" })] }), children: _jsxs(Descriptions, { bordered: true, column: 1, children: [_jsx(Descriptions.Item, { label: "ID", children: certificate.id }), _jsx(Descriptions.Item, { label: "Name", children: certificate.name }), _jsx(Descriptions.Item, { label: "Domain ID", children: certificate.domainId }), _jsx(Descriptions.Item, { label: "Start Date", children: new Date(certificate.startDate).toLocaleString() }), _jsx(Descriptions.Item, { label: "End Date", children: new Date(certificate.endDate).toLocaleString() }), _jsx(Descriptions.Item, { label: "Status", children: _jsxs(Space.Compact, { style: { width: '100%' }, children: [_jsx(Select, { value: selectedStatus, style: { width: 200 }, onChange: (value) => setSelectedStatus(value), options: statusOptions }), _jsx(Button, { type: "primary", loading: statusLoading, onClick: handleStatusChange, children: "Update Status" })] }) }), _jsx(Descriptions.Item, { label: "Content MD5", children: certificate.contentMd5 }), _jsx(Descriptions.Item, { label: "Created At", children: new Date(certificate.createdAt).toLocaleString() }), _jsx(Descriptions.Item, { label: "Updated At", children: new Date(certificate.updatedAt).toLocaleString() })] }) }));
};
export default CertificateDetail;
