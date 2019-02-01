import React, { Component } from 'react'
import { Row, Col } from 'antd'

import { content } from './content'

export default class Examples extends Component {
    state = {
        example: {
            url: '',
            title: '',
            images: {
                header: '',
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
        content.forEach(example => {
            if (example.url === window.location.pathname.replace('/examples/', '')) {
                this.setState({
                    example
                })
            }
        })
    }
    render() {
        console.log(this.state);

        return (
            <div>
                <div className={this.state.example.url} style={{ width: '100%', height: 250, marginBottom: 16 }} />
                <h1 style={{textAlign: 'center'}}>{this.state.example.title}</h1>
                <Row gutter={16} style={{ marginBottom: 100 }}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Row>
                            <div className='container' style={{ height: 250, marginBottom: 16 }} />
                        </Row>
                        <Row>
                            <div className='container' style={{ height: 400, marginBottom: 16 }} />
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Row>
                            <div className='container' style={{ height: 250, marginBottom: 16 }} />
                        </Row>
                        <Row>
                            <div className='container' style={{ height: 400, marginBottom: 16 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
