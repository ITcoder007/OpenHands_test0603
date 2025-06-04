import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DomainVO } from '../models/Domain';
import { getAllDomains, deleteDomain } from '../api/domainApi';

const DomainList: React.FC = () => {
  const [domains, setDomains] = useState<DomainVO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    setLoading(true);
    try {
      const data = await getAllDomains();
      setDomains(data);
    } catch (error) {
      message.error('Failed to fetch domains');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteDomain(id);
      if (success) {
        message.success('Domain deleted successfully');
        fetchDomains();
      } else {
        message.error('Failed to delete domain');
      }
    } catch (error) {
      message.error('Error deleting domain');
    }
  };

  const columns: ColumnsType<DomainVO> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`/domains/${record.id}`}>{text}</Link>
      ),
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
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/domains/${record.id}/edit`}>
            <Button type="link">Edit</Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
          <Link to={`/domains/${record.id}/certificates`}>
            <Button type="primary">View Certificates</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link to="/domains/add">
          <Button type="primary">Add Domain</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={domains}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default DomainList;
