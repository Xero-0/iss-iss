import React from 'react'
export const contactData = [{
    phone: '0438 436 149',
    email: 'jim@infosync.solutions',
    website: 'infosync.solutions',
}];
export const contactColumns = [{
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
}, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
}, {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
    render: (text, record) => <a href={`https://${text}`}>Infosync.solutions</a>
}];

export const invoiceData = [{
    date: '26 Feb 2019',
    doc: '1802312IV',
    preparedBy: 'Jim Alexander',
}];
export const invoiceColumns = [{
    title: 'Date Sent',
    dataIndex: 'date',
    key: 'date',
    width: 100
}, {
    title: 'Doc Id',
    dataIndex: 'doc',
    key: 'doc',
    width: 100
}, {
    title: 'Prepared By',
    dataIndex: 'preparedBy',
    key: 'preparedBy',
    width: 100
}];


export const dataSourceClient = [{
    item: '2',
    description: 'John',
    quantity: 42,
    total: '10 Downing Street'
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
}, {
    title: 'Phone',
    dataIndex: 'Phone',
    key: 'Phone',
}];

export const dataSource = [{
    item: '1',
    description: 'Mike',
    quantity: 32,
    unitPrice: 1,
    total: 32
}, {
    item: '2',
    description: 'John',
    quantity: 42,
    unitPrice: 2,
    total: 84
}];
export const columns = [{
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
    width: 100
}, {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 80
}, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 250
}, {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 50
}, {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    width: 50
}, {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    width: 50
}];

export const DescriptionItem = ({ title, content }) => (
    <div style={{
        fontSize: 15,
        lineHeight: '22px',
        marginBottom: 7,
        color: 'rgba(0,0,0,0.65)',
        margin: 10,
        textAlign: 'right'
    }}>
        <p style={{
            marginRight: 8,
            fontWeight: 600,
            display: 'inline-block',
            color: 'rgba(0,0,0,0.85)',
        }}>
            {title}:
        </p>
        {content}
    </div>
);