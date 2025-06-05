import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, Input, message, Space } from 'antd';
import dayjs from 'dayjs';
import { addCertificate } from '../api/certificateApi';
const { TextArea } = Input;
const CertificateAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try {
            setLoading(true);
            // Convert dayjs objects to Date objects
            const payload = {
                ...values,
                startDate: new Date(values.startDate),
                endDate: new Date(values.endDate),
            };
            const response = await addCertificate(payload);
            message.success('Certificate added successfully');
            navigate(`/certificates/${response.id}`);
        }
        catch (error) {
            message.error('Failed to add certificate');
            console.error('Error adding certificate:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const onCancel = () => {
        navigate(-1);
    };
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsx("h1", { children: "Add New Certificate" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, initialValues: {
                    startDate: dayjs(),
                    endDate: dayjs().add(1, 'year'),
                }, children: [_jsx(Form.Item, { name: "name", label: "Certificate Name", rules: [{ required: true, message: 'Please input certificate name!' }], children: _jsx(Input, { placeholder: "Enter certificate name" }) }), _jsx(Form.Item, { name: "domainId", label: "Domain ID", rules: [{ required: true, message: 'Please input domain ID!' }], children: _jsx(Input, { placeholder: "Enter domain ID" }) }), _jsx(Form.Item, { name: "startDate", label: "Start Date", rules: [{ required: true, message: 'Please select start date!' }], children: _jsx(DatePicker, { showTime: true, style: { width: '100%' } }) }), _jsx(Form.Item, { name: "endDate", label: "End Date", rules: [{ required: true, message: 'Please select end date!' }], children: _jsx(DatePicker, { showTime: true, style: { width: '100%' } }) }), _jsx(Form.Item, { name: "contentMd5", label: "Content MD5", rules: [{ required: true, message: 'Please input content MD5!' }], children: _jsx(Input, { placeholder: "Enter certificate content MD5 hash" }) }), _jsx(Form.Item, { children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", htmlType: "submit", loading: loading, children: "Submit" }), _jsx(Button, { onClick: onCancel, children: "Cancel" })] }) })] })] }));
};
export default CertificateAdd;
