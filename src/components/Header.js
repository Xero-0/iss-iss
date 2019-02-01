import React, { Component } from 'react'
import { Row, Col, notification } from 'antd'
import './index.css'

export default class Header extends Component {
    render() {
        return (
            <div style={{
                maxWidth: 1000,
                margin: '25px auto auto'
            }}>
                <Row gutter={10}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ textAlign: 'center', marginBottom: 15, padding: 5 }}>
                        <Row>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                <a href='/'><div id='logo' /></a>
                            </Col>
                            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                <a href='/'><h2 id='companyName'>Info Sync Solutions</h2></a>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'center', marginBottom: 25, padding: 5, lineHeight: 2.5 }}>
                        <a href='/#services' className='navOption'>Services</a>
                        <a href='/#examples' className='navOption'>Examples</a>
                        <a href='#/' className='navOption'>Pricing</a>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ textAlign: 'center', marginBottom: 25, padding: 5, lineHeight: 2.5 }}>
                        <span className='contactButton' onClick={() => {
                            notification.success({
                                message: 'Hey',
                                description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                                placement: "bottomRight"
                            });

                        }}>Contact</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
