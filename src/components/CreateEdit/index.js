import React, { Component } from 'react'
import { Row, Col, Select, Input, Button, Divider, InputNumber, message, Icon } from 'antd'
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
            }
        }
        if (this.state.signedIn && prevState.createType !== this.state.createType) {
            this.clear()
            db.getAllClients().then(resp => this.setState({ clientsList: resp.val() })).catch(err => console.log(err))
            db.getAllInvoices().then(resp => this.setState({ docList: resp.val() })).catch(err => console.log(err))
        }
    }
    loadDoc(type, id) {
        if (this.state.signedIn) {
            if (type === 'Invoice') {
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
            } else if (type === 'Client') {
                this.setState({
                    businessName: this.state.clientsList[id].businessName,
                    contactName: this.state.clientsList[id].contactName,
                    location: this.state.clientsList[id].location,
                    phone: this.state.clientsList[id].phone,
                }) 
            }
        }
    }
    descriptionItem = (title, field, placeHolder, defaultValue) => {
        let inputType;
        if (field === 'clientId') {
            inputType = (<Select value={defaultValue} dropdownRender={menu => (
                <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ padding: '8px', cursor: 'pointer' }} onMouseDown={() => {
                        this.setState({
                            createType: 'Client'
                        })
                    }}>
                        <Icon type="plus" /> Add Client
                  </div>
                </div>
            )} placeholder='Select a client' style={{ width: '100%' }} onChange={(val) => this.setState({ [field]: val })}>
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
        if (this.state.signedIn) {
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
                        <Row style={{ marginBottom: 20 }} gutter={20}>
                            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                <h4 style={{ lineHeight: 2.2 }}>Existing Clients</h4>
                            </Col>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                {this.documentList()}

                            </Col>
                            <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                {/* {this.viewInvoice()} */}

                            </Col>
                        </Row>
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
        } else {
            return (
                <div><h2>Please sign in to continue.</h2></div>
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
            if (this.state.docId) {
                db.updateClient(this.state.docId, clientObj)
                .then(resp => {
                    console.log(resp);
                    message.success('Client Updated!')
                })
                .catch(err => {
                    console.log(err);
                    message.error('Opps! Somthing happened...')
                })
            } else {
                db.createClient(clientObj).then(resp => {
                    console.log(resp);
                    this.setState({ docId: resp.key })
                    message.success('Client added')
                })
                    .catch(err => {
                        console.log(err);
                        message.error('Opps! Somthing happened...')
                    })
            }
        }
    }
    documentList() {
        let list = (this.state.createType === 'Invoice') ? this.state.docList : this.state.clientsList
        if (this.state.signedIn) {
            return (
                <Select value={this.state.docId} placeholder='Select a client' style={{ width: '100%' }} onChange={(val) => { this.loadDoc(this.state.createType, val); this.setState({ docId: val }) }}>
                    {Object.entries(list).map(doc => {
                        let text = (this.state.createType === 'Invoice') ? `${this.state.clientsList[doc[1].clientId].businessName} | ${doc[1].dateSent}` : doc[1].businessName
                        return <Select.Option key={doc[0]} value={doc[0]}>{text}</Select.Option>
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
        if (this.state.signedIn) {
            return (
                <Button size='large' style={{ width: '100%', border: '1px solid #2ecc71', color: '#2ecc71' }} onClick={() => this.submitForm()}>{text}</Button>
            )
        }
    }
    clear() {
        this.setState({
            docId: null,
            loadedDoc: null,
            productsServices: [],
            clientId: null,
            preparedBy: null,
            paid: 0,
            businessName: null,
            contactName: null,
            location: null,
            phone: null,
        })
    }
    clearButton() {
        let disabled = (this.state.docId !== null || this.state.loadedDoc !== null || this.state.productsServices.length !== 0 || this.state.clientId !== null || this.state.preparedBy !== null || this.state.paid !== 0 || this.state.businessName !== null || this.state.contactName !== null || this.state.location !== null || this.state.phone !== null) ? false : true
        if (this.state.signedIn) {
            return (
                <Button disabled={disabled} size='large' style={{ width: '100%' }} onClick={() => {
                    this.clear()
                }}>Clear Fields</Button>
            )
        }
    }
    deleteRecord() {
        let disabled = (this.state.docId) ? false : true
        if (this.state.signedIn) {
            return (
                <Button disabled={disabled} type='danger' ghost size='large' style={{ width: '100%' }} onClick={() => {
                    this.clear()
                }}>Delete</Button>
            )
        }
    }
    signIn() {
        // let func = (!this.state.signedIn) ? auth.anonymousSignIn() : auth.doSignOut()
        let text = (!this.state.signedIn) ? 'Sign In' : 'Sign Out'
        // return (
        //     <Button style={{
        //         float: 'right'
        //     }} onClick={() => func.then(resp => { console.log(resp); this.setState({ signedIn: !this.state.signedIn }) })}>{text}</Button>
        // )
        return (
            <Button style={{
                float: 'right'
            }} onClick={() => this.setState({ signedIn: !this.state.signedIn })}>{text}</Button>
        )
    }
    backgroundColor() {
        if (this.state.signedIn) {
            var opacity = 0
        } else {
            opacity = 1
        }
        return (
            <div>
                <div id='headerSvg' style={{
                    height: '100%',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                    width: ' 100%',
                    position: 'fixed',
                    opacity: 1,
                    left: 0,
                    background: `linear-gradient(to bottom right, #2980b9, #38b6ff)`
                }} className='noPrint backgroundTransition' />
                <div id='headerSvg' style={{
                    height: '100%',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                    width: ' 100%',
                    position: 'fixed',
                    transition: 'opacity 1.2s',
                    opacity: opacity,
                    left: 0,
                    background: `linear-gradient(to bottom right, #c0392b, #8e44ad)`
                }} className='noPrint backgroundTransition' />
            </div>
        )
    }
    render() {
        return (
            <div style={{ marginBottom: 80 }}>
                {this.backgroundColor()}
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
                    <Row style={{ marginTop: 30 }} gutter={20} >
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                            {this.deleteRecord()}
                        </Col>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                            {this.clearButton()}
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {this.saveCreate()}
                        </Col>
                    </Row>
                </div>
            </div >
        )
    }
}
