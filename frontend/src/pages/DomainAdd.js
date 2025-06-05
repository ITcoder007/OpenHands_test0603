import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { addDomain } from '../api/domainApi';
const DomainAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            await addDomain(values);
            message.success('Domain added successfully');
            navigate('/domains');
        }
        catch (error) {
            message.error('Failed to add domain');
            console.error('Error adding domain:', error);
        }
        finally {
            setSubmitting(false);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Please fill in all required fields');
    };
    return (_jsxs("div", { style: { maxWidth: 600, margin: '0 auto' }, children: [_jsx("h1", { children: "Add New Domain" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", children: [_jsx(Form.Item, { label: "Domain Name", name: "name", rules: [
                            { required: true, message: 'Please input domain name!' },
                            { max: 255, message: 'Domain name cannot exceed 255 characters' }
                        ], children: _jsx(Input, { placeholder: "example.com" }) }), _jsx(Form.Item, { label: "Description", name: "description", rules: [{ max: 1000, message: 'Description cannot exceed 1000 characters' }], children: _jsx(Input.TextArea, { rows: 4, placeholder: "Optional description" }) }), _jsxs(Form.Item, { children: [_jsx(Button, { type: "primary", htmlType: "submit", loading: submitting, disabled: submitting, children: "Submit" }), _jsx(Button, { style: { marginLeft: 8 }, onClick: () => navigate('/domains'), disabled: submitting, children: "Cancel" })] })] })] }));
};
export default DomainAdd;
