import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, message, Modal, Select, Space } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { CertificateVO } from '../models/Certificate';
import { getCertificate, deleteCertificate, changeCertificateStatus } from '../api/certificateApi';

const { confirm } = Modal;

const CertificateDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [certificate, setCertificate] = useState<CertificateVO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [statusLoading, setStatusLoading] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('');

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
            } catch (error) {
                message.error('Failed to fetch certificate details');
                navigate('/certificates');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [id, navigate]);

    const handleDelete = () => {
        if (!id) return;

        confirm({
            title: 'Are you sure to delete this certificate?',
            icon: <ExclamationCircleFilled />,
            content: 'This action cannot be undone',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    await deleteCertificate(id);
                    message.success('Certificate deleted successfully');
                    navigate('/certificates');
                } catch (error) {
                    message.error('Failed to delete certificate');
                }
            },
        });
    };

    const handleStatusChange = async () => {
        if (!id || !selectedStatus) return;

        setStatusLoading(true);
        try {
            const success = await changeCertificateStatus(id, selectedStatus);
            if (success) {
                message.success('Certificate status updated successfully');
                const updatedCert = await getCertificate(id);
                setCertificate(updatedCert);
            } else {
                message.error('Failed to update certificate status');
            }
        } catch (error) {
            message.error('Failed to update certificate status');
        } finally {
            setStatusLoading(false);
        }
    };

    const handleEdit = () => {
        if (!id) return;
        navigate(`/certificates/${id}/edit`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!certificate) {
        return <div>Certificate not found</div>;
    }

    const statusOptions = [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'EXPIRED', label: 'Expired' },
        { value: 'REVOKED', label: 'Revoked' },
        { value: 'PENDING', label: 'Pending' },
    ];

    return (
        <Card
            title="Certificate Details"
            extra={
                <Space>
                    <Button type="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button danger onClick={handleDelete}>
                        Delete
                    </Button>
                </Space>
            }
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="ID">{certificate.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{certificate.name}</Descriptions.Item>
                <Descriptions.Item label="Domain ID">{certificate.domainId}</Descriptions.Item>
                <Descriptions.Item label="Start Date">
                    {new Date(certificate.startDate).toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="End Date">
                    {new Date(certificate.endDate).toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Space.Compact style={{ width: '100%' }}>
                        <Select
                            value={selectedStatus}
                            style={{ width: 200 }}
                            onChange={(value) => setSelectedStatus(value)}
                            options={statusOptions}
                        />
                        <Button
                            type="primary"
                            loading={statusLoading}
                            onClick={handleStatusChange}
                        >
                            Update Status
                        </Button>
                    </Space.Compact>
                </Descriptions.Item>
                <Descriptions.Item label="Content MD5">{certificate.contentMd5}</Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {new Date(certificate.createdAt).toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At">
                    {new Date(certificate.updatedAt).toLocaleString()}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default CertificateDetail;
