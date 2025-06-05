import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Space, message, Card } from 'antd';
import { getCertificatesByDomain } from '../api/certificateApi';
const CertificateList = () => {
    const { domainId } = useParams();
    const navigate = useNavigate();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (domainId) {
            fetchCertificates(domainId);
        }
    }, [domainId]);
    const fetchCertificates = async (domainId) => {
        try {
            setLoading(true);
            const data = await getCertificatesByDomain(domainId);
            setCertificates(data);
        }
        catch (error) {
            message.error('Failed to fetch certificates');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (_jsx(Space, { size: "middle", children: _jsx(Button, { type: "link", onClick: () => navigate(`/certificates/${record.id}`), children: "View Details" }) })),
        },
    ];
    const handleAddCertificate = () => {
        navigate(`/certificates/add?domainId=${domainId}`);
    };
    return (_jsx(Card, { title: "Certificates", extra: _jsx(Button, { type: "primary", onClick: handleAddCertificate, children: "Add Certificate" }), children: _jsx(Table, { columns: columns, dataSource: certificates, rowKey: "id", loading: loading, pagination: { pageSize: 10 } }) }));
};
export default CertificateList;
