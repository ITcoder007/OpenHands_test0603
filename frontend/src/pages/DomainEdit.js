import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { updateDomain, getDomain } from '../api/domainApi';
const { TextArea } = Input;
export const DomainEdit = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDomain = async () => {
            try {
                setLoading(true);
                const domain = await getDomain(id);
                form.setFieldsValue({
                    name: domain.name,
                    description: domain.description || ''
                });
            }
            catch (error) {
                message.error('Failed to load domain details');
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchDomain();
        }
    }, [id, form]);
    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const domainDTO = {
                name: values.name,
                description: values.description
            };
            await updateDomain(id, domainDTO);
            message.success('Domain updated successfully');
            navigate(`/domains/${id}`);
        }
        catch (error) {
            message.error('Failed to update domain');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { style: { maxWidth: 600, margin: '0 auto' }, children: [_jsx("h1", { children: "Edit Domain" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmit, autoComplete: "off", children: [_jsx(Form.Item, { label: "Domain Name", name: "name", rules: [
                            { required: true, message: 'Please input domain name!' },
                            { max: 255, message: 'Domain name cannot exceed 255 characters!' }
                        ], children: _jsx(Input, { placeholder: "Enter domain name" }) }), _jsx(Form.Item, { label: "Description", name: "description", rules: [
                            { max: 1000, message: 'Description cannot exceed 1000 characters!' }
                        ], children: _jsx(TextArea, { rows: 4, placeholder: "Enter domain description" }) }), _jsxs(Form.Item, { children: [_jsx(Button, { type: "primary", htmlType: "submit", loading: loading, children: "Save Changes" }), _jsx(Button, { style: { marginLeft: 8 }, onClick: () => navigate(-1), children: "Cancel" })] })] })] }));
};
export default DomainEdit;
