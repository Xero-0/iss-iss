import React, { Component } from 'react'
import { Row, Col, Select, Input, Button, Divider, InputNumber, message } from 'antd'
import EditableTable from './productTable'
import moment from 'moment'
import { db } from '../../firebase'

export default class CreateEdit extends Component {
    constructor() {
        super();
        this.state = {
            docId: null,
            loadedDoc: null,
            createType: 'Invoice',
            clientsList: {},
            docList: {},
            productsServices: [],
            clientId: null,
            dateSent: moment().format('Do MMM YYYY'),
            preparedBy: null,
            paid: 0
        }
        this.editData = this.editData.bind(this)
    }
    componentDidMount = () => {
        db.getAllClients().then(resp => this.setState({ clientsList: resp.val() })).catch(err => console.log(err))
        db.getAllInvoices().then(resp => this.setState({ docList: resp.val() })).catch(err => console.log(err))
    }
    loadDoc(id) {
        console.log(id);
        db.getInvoice(id)
            .then(resp => {
                let doc = resp.val()
                this.setState({
                    clientId: doc.clientId,
                    dateSent: doc.dateSent,
                    paid: doc.paid,
                    preparedBy: doc.preparedBy,
                    productsServices: doc.productsServices
                })
                message.success('Doc Loaded')
            })
            .catch(err => {
                message.error('An error occured.', 5)
                console.log(err)
            })
    }

    descriptionItem = (title, field, placeHolder, defaultValue) => {
        let inputType;
        if (field === 'clientId') {
            inputType = (<Select value={defaultValue} placeholder='Select a client' style={{ width: '100%' }} onChange={(val) => this.setState({ [field]: val })}>
                {Object.entries(this.state.clientsList).map(client => {
                    return <Select.Option key={client[0]} value={client[0]}>{client[1].businessName}</Select.Option>
                })}
            </Select>)
        } else if (field === 'paid') {
            inputType = (<InputNumber value={defaultValue} style={{ width: '100%' }} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} onChange={val => this.setState({ [field]: val })} />)
        } else {
            inputType = (<Input value={defaultValue} placeholder={placeHolder} style={{ width: '100%' }} onChange={val => this.setState({ [field]: val.target.value })} />)
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
                            {this.descriptionItem('Client', 'clientId', 'John Smith', this.state.clientId)}
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
                    <EditableTable edited={this.editData} existingProducts={this.state.productsServices} />
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
        let obj = {
            clientId: this.state.clientId,
            dateSent: this.state.dateSent,
            paid: parseFloat(this.state.paid),
            preparedBy: this.state.preparedBy,
            productsServices: this.state.productsServices
        }
        if (this.state.docId) {
            db.updateInvoice(this.state.docId, obj)
            message.success('Invoice updated!', 5)
        } else {
            if (this.state.createType === 'Invoice') {
                if (this.state.clientId) {
                    console.log(obj);
                    db.createInvoice(obj).then(resp => {
                        console.log(resp.key)
                        this.setState({ docId: resp.key })
                        message.success(`Invoice Number: ${resp.key}`, 3)
                    })
                } else {
                    message.warning('Select a client.', 5)
                }
            }
        }
    }
    documentList() {
        return (
            <Select value={this.state.docId} placeholder='Select a client' style={{ width: '100%' }} onChange={(val) => { this.loadDoc(val); this.setState({ docId: val })}}>
                {Object.entries(this.state.docList).map(doc => {
                    return <Select.Option key={doc[0]} value={doc[0]}>{doc[0]}</Select.Option>
                })}
            </Select>
        )
    }
    render() {
        return (
            <div style={{ marginBottom: 80 }}>
                <h1 style={{ color: '#fff', marginLeft: 40, fontWeight: 600, marginTop: 80, }}>Create & Edit</h1>
                <div style={{ minHeight: 300, backgroundColor: '#fff', padding: 40, borderRadius: 4 }}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                            <h3>Type</h3>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Select defaultValue={this.state.createType} style={{ width: '100%' }} onChange={(val) => this.setState({ createType: val })}>
                                <Select.Option value="Invoice">Invoice</Select.Option>
                                <Select.Option value="Quote" disabled>Quote</Select.Option>
                                <Select.Option value="Client">Client</Select.Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {/* <div style={{
                                position: 'absolute',
                                margin: 5,
                                width: 43,
                                height: 43,
                                background: 'url(https://www.wheatonadvanceddental.com/wp-content/uploads/2016/11/blonde-guy-smiling.jpg) no-repeat center',
                                borderRadius: 40,
                                border: '2px solid #e8e8e8',
                                backgroundSize: 'cover'
                            }} /> */}
                            {this.documentList()}
                            {/* <Input.Search value={this.state.docId} style={{ width: '100%' }} placeholder='Search for existing doc id' onChange={val => this.setState({docId: val.target.value})} onSearch={val => this.loadDoc(val)} /> */}
                        </Col>
                    </Row>
                    <Divider />
                    <div style={{ marginTop: 20 }}>
                        {this.formType()}
                    </div>
                    <Divider />
                    <Row style={{ marginTop: 30, textAlign: 'right' }} >
                        <Col>
                            <Button size='large' style={{ width: '100%', maxWidth: 200, border: '1px solid #2ecc71', color: '#2ecc71' }} onClick={() => this.submitForm()}>Save</Button>
                        </Col>
                    </Row>
                </div>
            </div >
        )
    }
}
