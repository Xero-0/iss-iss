import React, { Component } from 'react'
import { Row, Col } from "antd";

export default class Hero extends Component {
    render() {
        return (
            <div style={{marginBottom: 60}}>
                <Row gutter={30}>
                    <Col xs={24} sm={24} md={12} lg={14} xl={14}>
                        <div className='heroBox worker-ipad'>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10} xl={10}>
                        <div className='heroBox' style={{fontSize:22, height:'100%'}}>
                            <h1 id='heroText'>Apps for <span style={{textDecoration: 'underline'}}>your</span> business</h1>
                            Transform your existing paperwork.
                            <br />
                            Build apps that are familiar, reliable,
                            easy and fast.

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
