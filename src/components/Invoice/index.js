import React, { Component } from 'react'
import { Table, Row, Col, message} from 'antd'
import { db } from '../../firebase'
import * as data from './data'

export default class Invoice extends Component {
    state = {
        loading: true,
        subTotal: null,
        paid: null,
        balanceDue: null,
        data: [],
        items: [],
        client: null,
        docId: null
    }
    componentDidMount = () => {
        // db.createClient('Simpson Construction', "Callie Mcdonald", "4 Duffy St, Burwood VIC 3125, Australia", "0438 082 272") 
        // db.createInvoice("-LZgdUJq9aqeTb_IsZ2c", '27th Feb 2019', 0, 'Jim Alexander') 
        const invoiceNumber = window.location.pathname.replace('/invoice/', '');
        if (invoiceNumber) {
            db.getInvoice(invoiceNumber)
                .then(resp => {
                    this.setState({
                        data: resp.val(),
                        docId: resp.key
                    })
                })
                .then(() => {
                    db.getClient(this.state.data.clientId)
                        .then(client => this.setState({
                            client: [{
                                id: 1,
                                businessName: client.val().businessName,
                                contactName: client.val().contactName,
                                location: client.val().location,
                                phone: client.val().phone,
                            }],
                            loading: false,
                        }))
                        .catch(err => {
                            this.setState({ loading: false });
                            console.log(err)
                        })
                })
                .catch(err => {
                    this.setState({ loading: false });
                    console.log(err)
                })
        } else {
            this.setState({loading: false})
            message.error('An invoice number has not been provided. Please double check the link or URL.',0)
        }
        window.addEventListener('resize', this.resize)
    }
    resize = () => this.forceUpdate()
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.data !== this.state.data) {
            this.calc()
        }
    }
    calc() {
        let subTotal = 0
        let balanceDue = 0
        let paid = (this.state.data) ? this.state.data.paid : 0
        let items = []
        if (this.state.data) {
            if (this.state.data.productsServices) {
                for (let i = 0; i < this.state.data.productsServices.length; i++) {
                    const element = this.state.data.productsServices[i];
                    if (element) {
                        items.push({
                            id: i,
                            item: i,
                            category: element.category,
                            description: element.description,
                            quantity: element.quantity,
                            unitPrice: element.unitPrice,
                            total: element.quantity * element.unitPrice,
                        })
                        subTotal += (element.quantity * element.unitPrice)
                    }

                }
            }
        }

        balanceDue = subTotal - paid
        this.setState({
            subTotal: subTotal.toFixed(2),
            balanceDue: balanceDue.toFixed(2),
            paid: paid.toFixed(2),
            items
        })
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }
    responsive(type) {
        if (type === 'padding') {
            if (window.innerWidth < 767) {
                return 20
            }
            else return 40
        } else if (type === 'table') {
            if (window.innerWidth < 767) {
                return 'small'
            }
            else return 'medium'
        } else if (type === 'align') {
            if (window.innerWidth < 767) {
                return 'left'
            }
            else return 'right'
        }
    }
    render() {
        return (
            <div style={{ minHeight: 800, backgroundColor: '#fff', padding: this.responsive('padding'), borderRadius: 4, marginTop: 80}}>
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
                        <data.DescriptionItem title="Date Sent" content={(this.state.data) ? this.state.data.dateSent : null} />
                        <data.DescriptionItem title="Unique Id" content={this.state.docId} />
                        <data.DescriptionItem title="Prepared By" content={(this.state.data) ? this.state.data.preparedBy : null} />
                    </Col>
                </Row>
                <h2 style={{ marginLeft: 20 }}>Client</h2>
                <Table
                    dataSource={this.state.client}
                    columns={data.columnsClient}
                    pagination={false}
                    bordered
                    loading={this.state.loading}
                    size={this.responsive('table')}
                    rowKey='id'
                    style={{
                        marginBottom: 20
                    }}
                    className='smallInvoice' />

                <h2 style={{ marginLeft: 20 }}>Products & Services</h2>
                <Table
                    dataSource={this.state.items}
                    columns={data.columns}
                    pagination={false}
                    size={this.responsive('table')}
                    rowKey='id'
                    bordered
                    loading={this.state.loading}
                    style={{ marginBottom: 20 }}
                    className='smallInvoice' />
                <Row type='flex'>
                    <Col xs={{ span: 24, order: 2 }} sm={{ span: 14, order: 1 }} md={14} lg={14} xl={14}>
                        <h2 style={{ marginLeft: 20 }}>Payment Details</h2>
                        <data.DescriptionItem title="BSB" content="063-097" />
                        <data.DescriptionItem title="Account Number" content="2069 2047" />
                    </Col>
                    <Col xs={{ span: 24, order: 1 }} sm={{ span: 10, order: 2 }} md={10} lg={10} xl={10} style={{ marginBottom: 20 }}>
                        <data.DescriptionItem title="Subtotal" content={`$${this.state.subTotal}`} textAlign={this.responsive('align')} />
                        <data.DescriptionItem title="Paid" content={`$${this.state.paid}`} textAlign={this.responsive('align')} />
                        <data.DescriptionItem title="Balance Due" content={`$${this.state.balanceDue}`} fontSize='18px' textAlign={this.responsive('align')} />
                    </Col>
                </Row>
            </div>
        )
    }
}
