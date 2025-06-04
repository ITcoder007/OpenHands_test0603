import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, message, Spin } from 'antd';
import { DomainVO } from '../models/Domain';
import { getDomain, deleteDomain } from '../api/domainApi';

const DomainDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [domain, setDomain] = useState<DomainVO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      } catch (error) {
        message.error('Failed to fetch domain details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDomain();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      if (!id) return;
      
      setLoading(true);
      const success = await deleteDomain(id);
      if (success) {
        message.success('Domain deleted successfully');
        navigate('/domains');
      } else {
        message.error('Failed to delete domain');
      }
    } catch (error) {
      message.error('Error deleting domain');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (!id) return;
    navigate(`/domains/${id}/edit`);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!domain) {
    return <div>Domain not found</div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="Domain Details"
        extra={[
          <Button key="edit" type="primary" onClick={handleEdit} style={{ marginRight: 8 }}>
            Edit
          </Button>,
          <Button key="delete" danger onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{domain.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{domain.name}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {domain.description || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{domain.status}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(domain.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {domain.updatedAt ? new Date(domain.updatedAt).toLocaleString() : 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default DomainDetail;
