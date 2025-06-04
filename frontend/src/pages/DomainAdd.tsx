import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { addDomain } from '../api/domainApi';
import { DomainDTO } from '../models/Domain';

const DomainAdd: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const onFinish = async (values: DomainDTO) => {
        setSubmitting(true);
        try {
            await addDomain(values);
            message.success('Domain added successfully');
            navigate('/domains');
        } catch (error) {
            message.error('Failed to add domain');
            console.error('Error adding domain:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Please fill in all required fields');
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h1>Add New Domain</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Domain Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please input domain name!' },
                        { max: 255, message: 'Domain name cannot exceed 255 characters' }
                    ]}
                >
                    <Input placeholder="example.com" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ max: 1000, message: 'Description cannot exceed 1000 characters' }]}
                >
                    <Input.TextArea rows={4} placeholder="Optional description" />
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={submitting}
                        disabled={submitting}
                    >
                        Submit
                    </Button>
                    <Button 
                        style={{ marginLeft: 8 }} 
                        onClick={() => navigate('/domains')}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DomainAdd;
