import React, { Component } from 'react'
import { Row, Col } from 'antd'

import { content } from './content'

export default class services extends Component {
    state = {
        service: {
            url: '',
            title: '',
            images: {
                dataCollection: '',
                reports: '',
            },
            content: {
                dataCollection: '',
                reports: ''
            }
        }
    }
    componentDidMount() {
        this.build()
    }
    build() {
        content.forEach(service => {
            if (service.url === window.location.pathname.replace('/services/', '')) {
                this.setState({
                    service
                })
            }
        })
    }
    render() {
        console.log(this.state);

        return (
            <div>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        {/* <div className={this.state.service.url} style={{ width: '100%', height: 250, marginBottom: 16, padding: 50 }} /> */}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <h1 style={{textAlign: 'center'}}>{this.state.service.title}</h1>

                    </Col>
                </Row>
                <div gutter={16} style={{ marginBottom: 100 }}>
                    <div className='container' style={{ height: 250, marginBottom: 16 }} />
                    <div className='container' style={{ height: 400, marginBottom: 16 }} />
                </div>
            </div>
        )
    }
}
