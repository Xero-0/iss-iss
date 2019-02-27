import React from 'react'
import {Row, Col} from 'antd'

export const columnsClient = [{
    title: 'Business',
    dataIndex: 'businessName',
    key: 'businessName',
}, {
    title: 'Contact Name',
    dataIndex: 'contactName',
    key: 'contactName',
}, {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    className:'invoiceHide',
}, {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
}];
export const columns = [{
    title: 'Item No.',
    dataIndex: 'item',
    key: 'item',
    className:'invoiceHide',
    width: 80
}, {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    className:'invoiceHide',
    width: 80
}, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 240
}, {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 30
}, {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (text) => {
        return `$${text.toFixed(2)}`
    },
    width: 60
}, {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: (text) => {
        return `$${text.toFixed(2)}`
    },
    width: 50
}];

export const DescriptionItem = ({ title, content, fontSize, textAlign }) => (
    <Row style={{ textAlign, margin: 10, fontSize}}>
        <Col span={12} style={{ fontWeight: 600 }}>{title}</Col>
        <Col span={12}>{content}</Col>
    </Row>
);