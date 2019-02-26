import React, { Component } from 'react'
import { Table, Row, Col } from 'antd'
import * as data from './data'

export default class Invoice extends Component {
    state = {
        subTotal: null,
        paid: null,
        balanceDue: null
    }
    componentDidMount = () => {
        let subTotal = 0
        data.dataSource.forEach(item => {
            subTotal += item.total
        })
        this.setState({ subTotal: subTotal.toFixed(2) })
        this.setState({ balanceDue: subTotal.toFixed(2) })
    }

    render() {
        return (
            <div style={{ minHeight: 800, backgroundColor: '#fff', padding: 40, borderRadius: 4, marginTop: 80 }}>
                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className='invoiceImage' />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <h1 style={{ textAlign: 'center', lineHeight: 2.1, fontSize: 40 }}>Invoice</h1>
                    </Col>
                </Row>
                <Row gutter={20} style={{ marginBottom: 20 }}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <data.DescriptionItem title="Phone" content="(+61) 0438 436 149" />
                        <data.DescriptionItem title="Email" content="jim@infosync.solutions" />
                        <data.DescriptionItem title="Website" content="https://www.infosync.solutions" />

                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <data.DescriptionItem title="Date Sent" content="26th Feb 2019" />
                        <data.DescriptionItem title="Doc Id" content="ISI-19-2" />
                        <data.DescriptionItem title="Prepared By" content="Jim Alexander" />
                    </Col>
                </Row>

                <h2 style={{ marginLeft: 20 }}>Client</h2>
                <Table
                    dataSource={data.dataSourceClient}
                    columns={data.columnsClient}
                    pagination={false}
                    bordered
                    size='medium'
                    rowKey='id'
                    style={{
                        marginBottom: 20
                    }}
                    className='smallInvoice' />

                <h2 style={{ marginLeft: 20 }}>Products & Services</h2>
                <Table
                    dataSource={data.dataSource}
                    columns={data.columns}
                    pagination={false}
                    size='medium'
                    rowKey='id'
                    bordered
                    style={{ marginBottom: 20 }}
                    className='smallInvoice' />
                <Row>
                    <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                        <h2 style={{ marginLeft: 20 }}>Payment Details</h2>
                        <data.DescriptionItem title="BSB" content="063-097" />
                        <data.DescriptionItem title="Account Number" content="2069 2047" />
                    </Col>
                    <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                        <data.DescriptionItem title="Subtotal" content={`A$${this.state.subTotal}`} textAlign='right' />
                        <data.DescriptionItem title="Paid" content="$0.00" textAlign='right' />
                        {/* <div style={{ borderBottom: '2px solid #0084bb' }} /> */}
                        <data.DescriptionItem title="Balance Due" content={`A$${this.state.balanceDue}`} fontSize='20px' textAlign='right' />
                    </Col>
                </Row>
            </div>
        )
    }
}
