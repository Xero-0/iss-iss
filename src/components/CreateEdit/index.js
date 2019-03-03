import React, { Component } from 'react'
import { Row, Col, Select, Input, Button, Divider, InputNumber, message } from 'antd'
import EditableTable from './productTable'
import moment from 'moment'
import { db, auth } from '../../firebase'

export default class CreateEdit extends Component {
    constructor() {
        super();
        this.state = {
            signedIn: false,
            docId: null,
            loadedDoc: null,
            createType: 'Client',
            clientsList: {},
            docList: {},
            productsServices: [],
            clientId: null,
            dateSent: moment().format('Do MMM YYYY'),
            preparedBy: null,
            paid: 0,
            businessName: null,
            contactName: null,
            location: null,
            phone: null,
            backgroundGradient: {
                dark: '#c0392b',
                light: '#8e44ad'
            }
        }
        this.editData = this.editData.bind(this)
    }
    componentDidMount = () => {
        if (this.state.signedIn) {
            db.getAllClients().then(resp => this.setState({ clientsList: resp.val() })).catch(err => console.log(err))
            db.getAllInvoices().then(resp => this.setState({ docList: resp.val() })).catch(err => console.log(err))
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.signedIn !== this.state.signedIn) {
            if (this.state.signedIn) {
                db.getAllClients().then(resp => this.setState({ clientsList: resp.val() })).catch(err => console.log(err))
                db.getAllInvoices().then(resp => this.setState({ docList: resp.val() })).catch(err => console.log(err))
                this.setState({
                    backgroundGradient: {
                        dark: '#2980b9',
                        light: '#38b6ff'
                    }
                })
            }
        }
        if (this.state.signedIn && prevState.createType !== this.state.createType) {
            db.getAllClients().then(resp => this.setState({ clientsList: resp.val() })).catch(err => console.log(err))
            db.getAllInvoices().then(resp => this.setState({ docList: resp.val() })).catch(err => console.log(err))
        }
    }
    loadDoc(id) {
        if (this.state.signedIn) {
            db.getInvoice(id)
                .then(resp => {
                    let doc = resp.val()
                    this.setState({
                        clientId: doc.clientId,
                        dateSent: doc.dateSent,
                        paid: doc.paid,
                        preparedBy: doc.preparedBy,
                        productsServices: doc.productsServices,
                    })
                    message.success('Doc Loaded')
                })
                .catch(err => {
                    message.error('An error occured.', 5)
                    console.log(err)
                })
        }

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
    viewInvoice() {
        if (this.state.docId) {
            return (
                <a href={`https://infosync.solutions/invoice/${this.state.docId}`} target='_blank' rel="noopener noreferrer">
                    <span style={{
                        lineHeight: 2.3,
                        color: '#2980b9',
                        textAlign: 'center'
                    }}>View Invoice</span></a>
            )
        }
        return (
            <span style={{
                lineHeight: 2.3,
                color: 'grey',
                textAlign: 'center'
            }}>View Invoice</span>
        )
    }
    formType() {
        if (this.state.createType === 'Invoice') {
            return (
                <div>
                    <Row style={{ marginBottom: 20 }} gutter={20}>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                            <h4 style={{ lineHeight: 2.2 }}>Existing Invoices</h4>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                            {this.documentList()}

                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                            {this.viewInvoice()}

                        </Col>
                    </Row>
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
                    {this.totals()}
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
                            {this.descriptionItem('Business Name', 'businessName', 'Jill\'s Florist', this.state.businessName)}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Contact Name', 'contactName', 'Jill Doe', this.state.contactName)}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Location', 'location', 'Smith Street', this.state.location)}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Phone', 'phone', '0412 345 678', this.state.phone)}
                        </Col>
                    </Row>
                </div>
            )
        }
    }
    submitForm() {
        let invoiceObj = {
            clientId: this.state.clientId,
            dateSent: this.state.dateSent,
            paid: parseFloat(this.state.paid),
            preparedBy: this.state.preparedBy,
            productsServices: this.state.productsServices
        }
        let clientObj = {
            businessName: this.state.businessName,
            contactName: this.state.contactName,
            location: this.state.location,
            phone: this.state.phone,
        }
        if (this.state.docId && this.state.signedIn && this.state.createType === 'Invoice') {
            db.updateInvoice(this.state.docId, invoiceObj)
            message.success('Invoice updated!', 5)
        } else if (this.state.createType === 'Invoice') {

            if (this.state.clientId && this.state.signedIn) {
                console.log(invoiceObj);
                db.createInvoice(invoiceObj).then(resp => {
                    console.log(resp.key)
                    this.setState({ docId: resp.key })
                    message.success(`Invoice Number: ${resp.key}`, 3)
                })
            } else {
                message.warning('Select a client.', 5)
            }
        } else if (this.state.createType === 'Client' && this.state.signedIn) {
            db.createClient(clientObj).then(resp => {
                console.log(resp);
                message.success('Client added')
            })
                .catch(err => {
                    console.log(err);
                    message.error('Opps! Somthing happened...')
                })
        }
    }
    documentList() {
        if (this.state.signedIn) {
            return (
                <Select value={this.state.docId} placeholder='Select a client' style={{ width: '100%' }} onChange={(val) => { this.loadDoc(val); this.setState({ docId: val }) }}>
                    {Object.entries(this.state.docList).map(doc => {
                        return <Select.Option key={doc[0]} value={doc[0]}>{`${this.state.clientsList[doc[1].clientId].businessName} | ${doc[1].dateSent}`}</Select.Option>
                    })}
                </Select>
            )
        }
    }
    totals() {
        // let balanceDue = this.state.paid - ()
        let subTotal = 0
        let paid = this.state.paid
        let balanceDue = 0
        this.state.productsServices.forEach(item => {
            subTotal += (item.quantity * item.unitPrice)
        })
        balanceDue = subTotal - paid

        return (
            <div style={{
                maxWidth: 250,
                textAlign: 'right',
                float: 'right',
                width: '100%',
                marginBottom: 20
            }}>
                <Row>
                    <Col span={12}>
                        <h3>Sub Total</h3>
                    </Col>
                    <Col span={12}>
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'AUD' }).format(subTotal)}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <h3>Paid</h3>
                    </Col>
                    <Col span={12}>
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'AUD' }).format(paid)}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <h3>Balance Due</h3>
                    </Col>
                    <Col span={12}>
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'AUD' }).format(balanceDue)}
                    </Col>
                </Row>
            </div>
        )
    }
    saveCreate() {
        let text = (this.state.docId) ? 'Save' : 'Create'
        return (
            <Button size='large' style={{ width: '100%', maxWidth: 200, border: '1px solid #2ecc71', color: '#2ecc71' }} onClick={() => this.submitForm()}>{text}</Button>
        )
    }
    signIn() {
        let disabled = (!this.state.signedIn) ? false : true
        return (
            <Button style={{
                // color: 'white',
                // background: 'white',
                // borderColor: 'white',
                float: 'right'
            }} disabled={disabled} onClick={() => auth.anonymousSignIn().then(resp => { console.log(resp); this.setState({ signedIn: true }) })}>Sign In</Button>
        )
    }
    render() {
        return (
            <div style={{ marginBottom: 80 }}>
                <div id='headerSvg' style={{
                    height: '100%',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                    width: ' 100%',
                    position: 'fixed',
                    left: 0,
                    background: `linear-gradient(to bottom right, ${this.state.backgroundGradient.dark}, ${this.state.backgroundGradient.light})`
                }} className='noPrint' />
                <h1 style={{ color: '#fff', marginLeft: 40, fontWeight: 600, marginTop: 20 }}>Create & Edit</h1>
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
                            {this.signIn()}
                        </Col>
                    </Row>
                    <Divider />
                    <div style={{ marginTop: 20 }}>
                        {this.formType()}
                    </div>
                    <Divider />
                    <Row style={{ marginTop: 30, textAlign: 'right' }} >
                        <Col>
                            {this.saveCreate()}
                        </Col>
                    </Row>
                </div>
            </div >
        )
    }
}
