import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Space, message, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CertificateVO } from '../models/Certificate';
import { getCertificatesByDomain } from '../api/certificateApi';

const CertificateList: React.FC = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<CertificateVO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (domainId) {
      fetchCertificates(domainId);
    }
  }, [domainId]);

  const fetchCertificates = async (domainId: string) => {
    try {
      setLoading(true);
      const data = await getCertificatesByDomain(domainId);
      setCertificates(data);
    } catch (error) {
      message.error('Failed to fetch certificates');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<CertificateVO> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            onClick={() => navigate(`/certificates/${record.id}`)}
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddCertificate = () => {
    navigate(`/certificates/add?domainId=${domainId}`);
  };

  return (
    <Card 
      title="Certificates" 
      extra={
        <Button type="primary" onClick={handleAddCertificate}>
          Add Certificate
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={certificates}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default CertificateList;
