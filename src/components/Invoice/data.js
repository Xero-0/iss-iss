import React from 'react'
import {Row, Col} from 'antd'


export const dataSourceClient = [{
    id: 1,
    business: 'Simpson Construction',
    contact: 'Callie Mcdonald',
    location: '4 Duffy St, Burwood VIC 3125, Australia',
    Phone: '0438 082 272'
}];
export const columnsClient = [{
    title: 'Business',
    dataIndex: 'business',
    key: 'business',
}, {
    title: 'Contact Name',
    dataIndex: 'contact',
    key: 'contact',
}, {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    className:'invoiceHide',
}, {
    title: 'Phone',
    dataIndex: 'Phone',
    key: 'Phone',
}];

export const dataSource = [{
    id: 1,
    item: '1',
    category: 'Support',
    description: 'Account management, portal hosting, and assistance.(Monthly)',
    quantity: 1,
    unitPrice: 75,
    total: 75,
}, {
    id: 2,
    item: '2',
    category: 'Email',
    description: 'Built and integrated automated email (leave request) with office@simcon',
    quantity: 1,
    unitPrice: 150,
    total: 150
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
    <Row style={{ textAlign, margin: 10, fontSize, maxWidth: 300}}>
        <Col span={12} style={{ fontWeight: 600 }}>{title}</Col>
        <Col span={12}>{content}</Col>
    </Row>
);