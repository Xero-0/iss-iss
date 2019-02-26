import React, { Component } from 'react'
import { Table, Row, Col } from 'antd'
import * as data from './data'

export default class Invoice extends Component {
    render() {
        return (
            <div style={{ minHeight: 800, backgroundColor: '#fff', padding: 40, borderRadius: 4 }}>
                <h1>Invoice</h1>
                <Row gutter={20} style={{ marginBottom: 20 }}>
                    <Col span={12}>
                        <Table
                            dataSource={data.contactData}
                            columns={data.contactColumns}
                            pagination={false}
                            size='small'
                            bordered />
                    </Col>
                    <Col span={12}>
                        <Table
                            dataSource={data.invoiceData}
                            columns={data.invoiceColumns}
                            pagination={false}
                            size='small'
                            bordered />
                    </Col>
                </Row>

                <h2>Client</h2>
                <Table
                    dataSource={data.dataSourceClient}
                    columns={data.columnsClient}
                    pagination={false}
                    bordered
                    size='medium'
                    style={{
                        marginBottom: 20
                    }} />

                <h2>Products & Services</h2>
                <Table
                    dataSource={data.dataSource}
                    columns={data.columns}
                    pagination={false}
                    bordered />
                <div style={{ maxWidth: 200, float: 'right' }}>
                    <data.DescriptionItem title="Subtotal" content="$950.00" />
                    <data.DescriptionItem title="GST" content="$95.00" />
                    <data.DescriptionItem title="Paid" content="$0.00" />
                </div>



            </div>
        )
    }
}
