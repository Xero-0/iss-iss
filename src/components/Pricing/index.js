import React, { Component } from 'react'
import { Row, Col, Button, Divider, Select, Input, notification } from "antd";
import { Client } from 'fulcrum-app'
import * as EmailValidator from 'email-validator';

const client = new Client(process.env.REACT_APP_SECRET_KEY)

const questions = [
    { id: 1, question: 'Are you interested in mobile data collection?', type: 'option' },
    { id: 2, question: 'How many existing forms would you like converted?', type: 'number' },
    { id: 3, question: 'Do you want real-time custom reports?', type: 'option' },
    { id: 4, question: 'How many real-time reports do you require?', type: 'number' },
    { id: 5, question: 'Would you like training included?', type: 'option' },
    { id: 6, question: 'Additional Information and/or questions', type: 'input' },

]

export default class Pricing extends Component {
    state = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        email: null,
        emailSent: false
    }
    componentDidMount = () => {
        client.records.all({ form_id: '987cbc89-7b02-486a-8c82-ea7411d5eca2' })
            .then((page) => {
                console.log(page.objects);
            })
            .catch((error) => {
                console.log('Error getting your forms.', error.message);
            });
    }
    questionsBuild() {
        let questionList = []
        questions.forEach(question => {
            if (question.type === 'option') {
                let yesStatus = true
                let noStatus = true
                if (this.state[question.id] === 'yes') {
                    yesStatus = false
                } else if (this.state[question.id] === 'no') {
                    noStatus = false
                }
                questionList.push(
                    <div key={question.id}>
                        <Row style={{ padding: 20 }} gutter={16}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                                <h3>{question.question}</h3>
                            </Col>
                            <Col xs={16} sm={16} md={8} lg={8} xl={8} style={{ marginBottom: 16 }}>
                                <Button type="primary" ghost={yesStatus} style={{ width: '100%' }}
                                    onClick={() => this.setState({ [question.id]: 'yes' })}>Yes</Button>
                            </Col>
                            <Col xs={8} sm={8} md={4} lg={4} xl={4} style={{ marginBottom: 16 }}>
                                <Button type="primary" ghost={noStatus} style={{ width: '100%' }}
                                    onClick={() => this.setState({ [question.id]: 'no' })}>No</Button>
                            </Col>
                        </Row>
                        <Divider style={{ marginTop: 5 }} />
                    </div>

                )
            } else if (question.type === 'number') {
                questionList.push(
                    <div key={question.id}>
                        <Row style={{ padding: 20 }} gutter={16}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                                <h3>{question.question}</h3>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                                <Select style={{ width: '100%' }} placeholder='8' onChange={e => this.setState({ [question.id]: e })}>
                                    <Select.Option value='1'>1</Select.Option>
                                    <Select.Option value='2'>2</Select.Option>
                                    <Select.Option value='3'>3</Select.Option>
                                    <Select.Option value='4'>4</Select.Option>
                                    <Select.Option value='5'>5</Select.Option>
                                    <Select.Option value='6'>6</Select.Option>
                                    <Select.Option value='7'>7</Select.Option>
                                    <Select.Option value='8'>8</Select.Option>
                                    <Select.Option value='9'>9</Select.Option>
                                    <Select.Option value='10+'>10+</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                        <Divider style={{ marginTop: 5 }} />
                    </div>
                )
            } else if (question.type === 'input') {
                questionList.push(
                    <div key={question.id}>
                        <Row style={{ padding: 20 }} gutter={16}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ marginBottom: 16 }}>
                                <h3>{question.question}</h3>
                            </Col>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16} style={{ marginBottom: 16 }}>
                                <Input.TextArea value={this.state[6]} onChange={(e) => this.setState({ [question.id]: e.target.value })} style={{ width: '100%' }} placeholder='Is it possible to have automatically genorated emails?' autosize></Input.TextArea>
                            </Col>
                        </Row>
                        <Divider style={{ marginTop: 5 }} />
                    </div>
                )
            }
        })
        return questionList
    }
    emailSection() {
        if (this.state[1] === null &&
            this.state[2] === null &&
            this.state[3] === null &&
            this.state[4] === null &&
            this.state[5] === null &&
            this.state[6] === null) {
            return null
        } else if (this.state.emailSent) {
            return (
                <div style={{ textAlign: 'center', margin: 40 }}>
                    <h2>Thanks for your time!</h2>
                    <h3>Somebody will be in contact shortly.</h3>
                </div>
            )
        } else {
            return (
                <div style={{ textAlign: 'center', margin: 40 }}>
                    <h2>Enter your email address</h2>
                    <Input value={this.state.email} onChange={val => this.setState({ email: val.target.value })} style={{ width: '100%', maxWidth: 500, marginBottom: 20 }} placeholder='john_smith@gmail.com'></Input>
                    <Button onClick={() => this.getQuote()} style={{ width: '100%', maxWidth: 500, background: '#1abc9c', borderColor: '#1abc9c', marginBottom: 20 }} type='primary'>Get Quote</Button>
                    <h4 style={{ color: '#4c4c4c' }}>Unsure about the specifics? Thats fine, enter your email and what you can and somebody will be in contact very shortly.</h4>
                </div>
            )
        }

    }
    getQuote() {
        if (this.state.email) {
            if (EmailValidator.validate(this.state.email)) {
                let obj = {
                    form_id: '987cbc89-7b02-486a-8c82-ea7411d5eca2',
                    form_values: {
                        'f7ab': this.state[1],
                        'a414': this.state[2],
                        '1e8c': this.state[3],
                        'd94f': this.state[4],
                        '0a75': this.state[5],
                        '72c1': this.state[6],
                        'cd0c': this.state.email
                    }
                }
                client.records.create(obj)
                    .then(resp => {

                        console.log(resp);
                        this.setState({ emailSent: true })

                    })
                    .catch(err => {
                        notification.error({
                            message: 'Error',
                            description: 'An error has occured. Please check your internet connection.',
                        })
                        console.log(err)
                    })
            } else {
                notification.error({
                    message: 'Format Error',
                    description: 'Please check your email.',
                    placement: 'bottomRight'
                })
            }

        } else if (!this.state.email) {
            notification.warn({
                message: 'Missing Email.',
                description: 'Please input your email address.',
            })
        }
    }

    render() {
        return (
            <div style={{ marginBottom: 50 }}>
                <h1 style={{ textAlign: 'center' }}>Pricing</h1>
                <h3 style={{ textAlign: 'center' }}>Everything is made custom for your business. <br />Even the price.</h3>
                <div id='pricingImage' />
                <Divider />
                {this.questionsBuild()}
                {this.emailSection()}
            </div>
        )
    }
}
