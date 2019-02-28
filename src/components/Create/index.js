import React, { Component } from 'react'
import { Row, Col, Select, Input, Button, } from 'antd'
import EditableTable from './productTable'

export default class Create extends Component {
    constructor() {
        super();
        this.state = {
            createType: 'Invoice',
            productsServices: []
        }
        this.editData = this.editData.bind(this)
    }
    descriptionItem = (title, field, placeHolder) => (
        <Row style={{ marginBottom: 20 }} gutter={20}>
            <Col span={8} style={{ fontWeight: 600, paddingTop: 5, textAlign: 'right' }}>{title}</Col>
            <Col span={16}>
                <Input placeholder={placeHolder} style={{ width: '100%' }} onChange={val => this.setState({ [field]: val.target.value })} />
            </Col>
        </Row>
    )
    editData(val){
        this.setState({productsServices: val})
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
                            {this.descriptionItem('Date Sent', 'dateSent', '23/05/2019')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Prepared By', 'preparedBy', 'Jim Alexander')}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {this.descriptionItem('Ammount Paid', 'paid', '0.00')}
                        </Col>
                    </Row>
                    <EditableTable edited={this.editData}/>
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
                    <div style={{ margin: 'auto', marginTop: 20, textAlign: 'center', maxWidth: 250 }}>
                        <Button style={{ width: '100%' }} onClick={() => this.submitForm()}>Submit</Button>
                    </div>
                </div>
            )
        }
    }
    
    submitForm() {
        console.log(this.state);
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
                    <div style={{ marginTop: 20 }}>
                        {this.formType()}
                    </div>
                </div>
                <div style={{ marginTop: 20, maxWidth: 200, marginLeft: 40 }}>
                    <Button style={{ width: '100%' }} onClick={() => this.submitForm()}>Save</Button>
                </div>
            </div>
        )
    }
}
