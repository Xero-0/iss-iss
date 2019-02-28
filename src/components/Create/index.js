import React, { Component } from 'react'
import { Row, Col, Select, Input, Button, Divider, InputNumber, message } from 'antd'
import EditableTable from './productTable'
import moment from 'moment'
import { db } from '../../firebase'

export default class Create extends Component {
    constructor() {
        super();
        this.state = {
            createType: 'Invoice',
            clientsList: {},
            productsServices: [],
            dateSent: moment().format('Do MMM YYYY'),
            preparedBy: 'Jim Alexander',
            paid: 0
        }
        this.editData = this.editData.bind(this)
    }
    componentDidMount = () => {
        db.getAllClients().then(resp => this.setState({ clientsList: resp.val() })).catch(err => console.log(err))
    }
    descriptionItem = (title, field, placeHolder, defaultValue) => {
        let inputType;
        if (field === 'clientId') {
            inputType = (<Select defaultValue={defaultValue} style={{ width: '100%' }} onChange={(val) => this.setState({ [field]: val })}>
                {Object.entries(this.state.clientsList).map(client => {
                    return <Select.Option key={client[0]} value={client[0]}>{client[1].businessName}</Select.Option>
                })}
            </Select>)
        } else if (field === 'paid') {
            inputType = (<InputNumber style={{width: '100%'}}/>)
        } else {
            inputType = (<Input defaultValue={defaultValue} placeholder={placeHolder} style={{ width: '100%' }} onChange={val => this.setState({ [field]: val.target.value })} />)
        }

        return (
            <Row style={{ marginBottom: 20 }} gutter={20}>
                <Col span={8} style={{ fontWeight: 600, paddingTop: 5, textAlign: 'right' }}>{title}</Col>
                <Col span={16}>
                    {inputType}
                </Col>
            </Row>
        )
    }
    editData(val) {
        this.setState({ productsServices: val })
    }
    formType() {
        if (this.state.createType === 'Invoice') {
            return (
                <div>
                    <h3>Details</h3>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Client', 'clientId', 'John Smith')}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Date Sent', 'dateSent', '23/05/2019', this.state.dateSent)}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Prepared By', 'preparedBy', 'Jim Alexander', this.state.preparedBy)}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Ammount Paid', 'paid', '0.00', this.state.paid)}
                        </Col>
                    </Row>
                    <EditableTable edited={this.editData} />
                </div>
            )
        } else if (this.state.createType === 'Quote') {
            return (
                <div>
                    <h3>Quote</h3>
                </div>
            )
        } else if (this.state.createType === 'Client') {
            return (
                <div>
                    <h3>Details</h3>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Business Name', 'businessName', 'Jill\'s Florist')}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Contact Name', 'contactName', 'Jill Doe')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Location', 'location', 'Smith Street')}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Phone', 'phone', '0412 345 678')}
                        </Col>
                    </Row>
                </div>
            )
        }
    }
    submitForm() {
        if (this.state.createType === 'Invoice') {
            if (this.state.clientId) {
                let obj = {
                    clientId: this.state.clientId,
                    dateSent: this.state.dateSent,
                    paid: parseFloat(this.state.paid),
                    preparedBy: this.state.preparedBy,
                    productsServices: this.state.productsServices
                }
                console.log(obj);
                db.createInvoice(obj).then(resp => {
                    console.log(resp.key)
                    message.success(`Invoice Number: ${resp.key}`, 0)
                })
            } else {
                message.warning('Select a client.', 5)
            }
        }
    }
    render() {
        return (
            <div style={{ marginTop: 80, marginBottom: 80 }}>
                <h1 style={{ color: '#fff', marginLeft: 40, fontWeight: 600 }}>Create</h1>
                <div style={{ minHeight: 300, backgroundColor: '#fff', padding: 40, borderRadius: 4 }}>
                    <Row gutter={20}>
                        <Col span={4}>
                            <h3>Type</h3>
                        </Col>
                        <Col span={20}>
                            <Select defaultValue={this.state.createType} style={{ width: '100%' }} onChange={(val) => this.setState({ createType: val })}>
                                <Select.Option value="Invoice">Invoice</Select.Option>
                                <Select.Option value="Quote" disabled>Quote</Select.Option>
                                <Select.Option value="Client">Client</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Divider />
                    <div style={{ marginTop: 20 }}>
                        {this.formType()}
                    </div>
                    <Row style={{ marginTop: 20, textAlign: 'right' }} >
                        <Col>
                            <Button style={{ width: '100%', maxWidth: 200, border: '1px solid #2ecc71', color: '#2ecc71' }} onClick={() => this.submitForm()}>Save</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
