import React, { Component } from 'react'
import { Row, Col } from "antd";

export default class Services extends Component {
    render() {
        return (
            <div style={{ marginTop: 25, marginBottom: 20 }}>
                <h1 style={{ textAlign: 'center', margin: 30 }}>Services</h1>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginBottom: 20}}>
                        <div className='container servicesBox'>
                        <div id='servicesIpad' />
                            <h2>Mobile data collection.</h2>
                            <h3 style={{ color: 'grey', fontStyle: 'italic' }}>Replace the outdated</h3>
                            <span>
                                We work with you to transform your existing systems into something easy, fast, efficient, and familiar.
                                Keep track of your jobs, inductions, maintenance, timesheets, audits, and any other activities. Forms are built to be simple and unobtrusive.
                            </span>
                            <br />
                            {/* <a href='/services/mobile-data-collection' style={{ position: 'absolute', right: 55 }} className='learnMoreText'>Learn More</a> */}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className='container servicesBox'>
                            <div id='servicesDesktop'/>
                            <h2>Real-time reports.</h2>
                            <h3 style={{ color: 'grey', fontStyle: 'italic' }}>Fully Customised</h3>
                            <span>
                                We build professional and realtime dashboards built to your requirements. Charts, graphs, tables all built with your specifications, nothing is to complicated.
                                These reports are accessible anywhere on any device, using the latest technologies in web development.
                            </span>
                            <br />
                            {/* <a href='/services/real-time-reports'style={{ position: 'absolute', right: 55 }} className='learnMoreText'>Learn More</a> */}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
