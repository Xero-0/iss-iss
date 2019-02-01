import React, { Component } from 'react'
import { Row, Col } from 'antd'

import { content } from './content'

export default class Examples extends Component {
    state = {
        example: null
    }
    componentDidMount() {
        this.setState({ example: window.location.pathname.replace('/examples/', '') }, () => this.build());
    }
    build() {
        content.forEach(example => {
            if (example.url === this.state.example) {
                console.log(example);
            }
        })
    }
    render() {
        return (
            <div>
                <div style={{ width: '100%', border: '1px solid', height: 200, margin: '0 auto 30px' }} />
                <Row gutter={30} style={{ marginBottom: 100 }}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Row>
                            <div style={{ border: '1px solid', height: 250, marginBottom: 30 }} />
                        </Row>
                        <Row>
                            <div style={{ border: '1px solid', height: 400, marginBottom: 30 }} />
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Row>
                            <div style={{ border: '1px solid', height: 250, marginBottom: 30 }} />
                        </Row>
                        <Row>
                            <div style={{ border: '1px solid', height: 400, marginBottom: 30 }} />
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
