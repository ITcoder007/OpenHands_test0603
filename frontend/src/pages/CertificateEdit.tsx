import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, DatePicker, message, Card, Spin } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { updateCertificate, getCertificate } from '../api/certificateApi';
import type { CertificateDTO, CertificateVO } from '../models/Certificate';

const { TextArea } = Input;

const CertificateEdit: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [certificate, setCertificate] = useState<CertificateVO | null>(null);

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
        form.setFieldsValue({
          name: data.name,
          domainId: data.domainId,
          startDate: dayjs(data.startDate),
          endDate: dayjs(data.endDate),
          contentMd5: data.contentMd5
        });
      } catch (error) {
        message.error('Failed to fetch certificate details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id, form, navigate]);

  const onFinish = async (values: CertificateDTO) => {
    try {
      if (!id) {
        message.error('Certificate ID is required');
        return;
      }
      const updatedCertificate = {
        ...values,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString()
      };
      await updateCertificate(id, updatedCertificate);
      message.success('Certificate updated successfully');
      navigate(`/certificates/${id}`);
    } catch (error) {
      message.error('Failed to update certificate');
      console.error(error);
    }
  };

  const onStartDateChange: DatePickerProps['onChange'] = (date) => {
    form.setFieldsValue({ startDate: date });
  };

  const onEndDateChange: DatePickerProps['onChange'] = (date) => {
    form.setFieldsValue({ endDate: date });
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />;
  }

  if (!certificate) {
    return <div className="text-center py-10">Certificate not found</div>;
  }

  return (
    <Card title="Edit Certificate" bordered={false} className="max-w-3xl mx-auto my-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: certificate.name,
          domainId: certificate.domainId,
          startDate: dayjs(certificate.startDate),
          endDate: dayjs(certificate.endDate),
          contentMd5: certificate.contentMd5
        }}
      >
        <Form.Item
          label="Certificate Name"
          name="name"
          rules={[{ required: true, message: 'Please input certificate name!' }]}
        >
          <Input placeholder="Enter certificate name" />
        </Form.Item>

        <Form.Item
          label="Domain ID"
          name="domainId"
          rules={[{ required: true, message: 'Please input domain ID!' }]}
        >
          <Input placeholder="Enter domain ID" disabled />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: 'Please select start date!' }]}
        >
          <DatePicker
            onChange={onStartDateChange}
            className="w-full"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: 'Please select end date!' }]}
        >
          <DatePicker
            onChange={onEndDateChange}
            className="w-full"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>

        <Form.Item
          label="Content MD5"
          name="contentMd5"
          rules={[{ required: true, message: 'Please input content MD5!' }]}
        >
          <TextArea rows={4} placeholder="Enter certificate content MD5" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="mr-4">
            Update
          </Button>
          <Button onClick={() => navigate(`/certificates/${id}`)}>Cancel</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CertificateEdit;
