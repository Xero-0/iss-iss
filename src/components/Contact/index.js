import React, { Component } from 'react'
import { Row, Col, Input, Button, Divider, notification } from 'antd'
import * as EmailValidator from 'email-validator';
import { Client } from 'fulcrum-app'

const client = new Client(process.env.REACT_APP_SECRET_KEY)


export default class Contact extends Component {
    state = {
        email: null,
        emailSent: null
    }
    getQuote() {
        if (this.state.email) {
            if (EmailValidator.validate(this.state.email)) {
                let obj = {
                    form_id: '987cbc89-7b02-486a-8c82-ea7411d5eca2',
                    form_values: {
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
    emailSection() {

        if (this.state.emailSent) {
            return (
                <div style={{ textAlign: 'center', margin: 40 }}>
                    <h2>Thanks for your time!</h2>
                    <h3>Somebody will be in contact shortly.</h3>
                </div>
            )
        } else {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h2>Enter your email address</h2>
                    <Input value={this.state.email} onChange={val => this.setState({ email: val.target.value })} style={{ width: '100%', maxWidth: 500, marginBottom: 20 }} placeholder='john_smith@gmail.com'></Input>
                    <Button onClick={() => this.getQuote()} style={{ width: '100%', maxWidth: 500, background: '#1abc9c', borderColor: '#1abc9c', marginBottom: 20 }} type='primary'>Enquire</Button>
                </div>
            )
        }

    }
    render() {
        return (
            <div style={{ textAlign: 'center', marginBottom: 100 }}>
                <div id='contactImage' />
                <h1>Contact</h1>
                <Divider />
                {this.emailSection()}
                <Divider />
                <Row gutter={16}>
                    <Col span={12}>
                        <h3>Email directly at:</h3>
                    </Col>
                    <Col span={12}>
                        Jim@infosync.solutions
                    </Col>
                </Row>


            </div>
        )
    }
}
