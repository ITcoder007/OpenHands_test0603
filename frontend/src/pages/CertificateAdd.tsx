import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, Input, message, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { addCertificate } from '../api/certificateApi';
import { CertificateDTO } from '../models/Certificate';

const { TextArea } = Input;

const CertificateAdd: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: CertificateDTO) => {
    try {
      setLoading(true);
      // Convert dayjs objects to ISO strings
      const payload = {
        ...values,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
      };
      const response = await addCertificate(payload);
      message.success('Certificate added successfully');
      navigate(`/certificates/${response.id}`);
    } catch (error) {
      message.error('Failed to add certificate');
      console.error('Error adding certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Add New Certificate</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          startDate: dayjs(),
          endDate: dayjs().add(1, 'year'),
        }}
      >
        <Form.Item
          name="name"
          label="Certificate Name"
          rules={[{ required: true, message: 'Please input certificate name!' }]}
        >
          <Input placeholder="Enter certificate name" />
        </Form.Item>

        <Form.Item
          name="domainId"
          label="Domain ID"
          rules={[{ required: true, message: 'Please input domain ID!' }]}
        >
          <Input placeholder="Enter domain ID" />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: 'Please select start date!' }]}
        >
          <DatePicker showTime style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: 'Please select end date!' }]}
        >
          <DatePicker showTime style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="contentMd5"
          label="Content MD5"
          rules={[{ required: true, message: 'Please input content MD5!' }]}
        >
          <Input placeholder="Enter certificate content MD5 hash" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CertificateAdd;
