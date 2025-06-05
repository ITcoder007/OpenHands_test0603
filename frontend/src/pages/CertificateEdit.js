import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, DatePicker, message, Card, Spin } from 'antd';
import dayjs from 'dayjs';
import { updateCertificate, getCertificate } from '../api/certificateApi';
const { TextArea } = Input;
const CertificateEdit = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [certificate, setCertificate] = useState(null);
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
            }
            catch (error) {
                message.error('Failed to fetch certificate details');
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCertificate();
    }, [id, form, navigate]);
    const onFinish = async (values) => {
        try {
            if (!id) {
                message.error('Certificate ID is required');
                return;
            }
            const updatedCertificate = {
                ...values,
                startDate: new Date(values.startDate),
                endDate: new Date(values.endDate)
            };
            await updateCertificate(id, updatedCertificate);
            message.success('Certificate updated successfully');
            navigate(`/certificates/${id}`);
        }
        catch (error) {
            message.error('Failed to update certificate');
            console.error(error);
        }
    };
    const onStartDateChange = (date) => {
        form.setFieldsValue({ startDate: date });
    };
    const onEndDateChange = (date) => {
        form.setFieldsValue({ endDate: date });
    };
    if (loading) {
        return _jsx(Spin, { size: "large", className: "flex justify-center items-center h-screen" });
    }
    if (!certificate) {
        return _jsx("div", { className: "text-center py-10", children: "Certificate not found" });
    }
    return (_jsx(Card, { title: "Edit Certificate", bordered: false, className: "max-w-3xl mx-auto my-6", children: _jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, initialValues: {
                name: certificate.name,
                domainId: certificate.domainId,
                startDate: dayjs(certificate.startDate),
                endDate: dayjs(certificate.endDate),
                contentMd5: certificate.contentMd5
            }, children: [_jsx(Form.Item, { label: "Certificate Name", name: "name", rules: [{ required: true, message: 'Please input certificate name!' }], children: _jsx(Input, { placeholder: "Enter certificate name" }) }), _jsx(Form.Item, { label: "Domain ID", name: "domainId", rules: [{ required: true, message: 'Please input domain ID!' }], children: _jsx(Input, { placeholder: "Enter domain ID", disabled: true }) }), _jsx(Form.Item, { label: "Start Date", name: "startDate", rules: [{ required: true, message: 'Please select start date!' }], children: _jsx(DatePicker, { onChange: onStartDateChange, className: "w-full", showTime: true, format: "YYYY-MM-DD HH:mm:ss" }) }), _jsx(Form.Item, { label: "End Date", name: "endDate", rules: [{ required: true, message: 'Please select end date!' }], children: _jsx(DatePicker, { onChange: onEndDateChange, className: "w-full", showTime: true, format: "YYYY-MM-DD HH:mm:ss" }) }), _jsx(Form.Item, { label: "Content MD5", name: "contentMd5", rules: [{ required: true, message: 'Please input content MD5!' }], children: _jsx(TextArea, { rows: 4, placeholder: "Enter certificate content MD5" }) }), _jsxs(Form.Item, { children: [_jsx(Button, { type: "primary", htmlType: "submit", className: "mr-4", children: "Update" }), _jsx(Button, { onClick: () => navigate(`/certificates/${id}`), children: "Cancel" })] })] }) }));
};
export default CertificateEdit;
