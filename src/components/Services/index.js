import React, { Component } from 'react'
import { Row, Col } from 'antd'

import { content } from './content'

export default class services extends Component {
    state = {
        service: {
            url: '',
            title: '',
            subTitle: '',
            image: '',
            content: ''
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
                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                        <div style={{ background: '#fff', marginBottom: 50, padding: 20 }} className='container'>
                            <div className={this.state.service.url} style={{ height: '40vh', }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                        <h1 className='servicesTitle'>{this.state.service.title}</h1>
                        <h3 style={{ color: '#4c4c4c' }}>{this.state.service.subTitle}</h3>
                    </Col>
                </Row>
                <div gutter={16} style={{ marginBottom: 100 }}>
                    <div style={{ height: 400, marginBottom: 16 }}>
                    {this.state.service.content}
                    </div>
                </div>
            </div>
        )
    }
}
