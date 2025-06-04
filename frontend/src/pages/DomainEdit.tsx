import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { DomainDTO } from '../models/Domain';
import { updateDomain, getDomain } from '../api/domainApi';

const { TextArea } = Input;

interface DomainEditFormValues {
    name: string;
    description: string;
}

export const DomainEdit: React.FC = () => {
    const [form] = Form.useForm<DomainEditFormValues>();
    const [loading, setLoading] = useState(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDomain = async () => {
            try {
                setLoading(true);
                const domain = await getDomain(id!);
                form.setFieldsValue({
                    name: domain.name,
                    description: domain.description || ''
                });
            } catch (error) {
                message.error('Failed to load domain details');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDomain();
        }
    }, [id, form]);

    const handleSubmit = async (values: DomainEditFormValues) => {
        try {
            setLoading(true);
            const domainDTO: DomainDTO = {
                name: values.name,
                description: values.description
            };
            await updateDomain(id!, domainDTO);
            message.success('Domain updated successfully');
            navigate(`/domains/${id}`);
        } catch (error) {
            message.error('Failed to update domain');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h1>Edit Domain</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Domain Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please input domain name!' },
                        { max: 255, message: 'Domain name cannot exceed 255 characters!' }
                    ]}
                >
                    <Input placeholder="Enter domain name" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        { max: 1000, message: 'Description cannot exceed 1000 characters!' }
                    ]}
                >
                    <TextArea rows={4} placeholder="Enter domain description" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save Changes
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DomainEdit;
