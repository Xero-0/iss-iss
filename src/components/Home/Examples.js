import React, { Component } from 'react'
import { Row, Col } from "antd";

export default class Examples extends Component {
    render() {
        return (
            <div style={{ marginBottom: 65, marginTop: 25 }}>
                <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Examples</h1>

                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                        <div className='container examplesBox'>
                            <Row>
                                <Col span={12}>
                                    <div id='examples1' className='ohs'/>
                                </Col>
                                <Col span={12}>
                                    <h2 style={{marginTop: 33}}>Health and Safety</h2>
                                </Col>
                            </Row>
                            <span>
                                OH&S is normally the number one priority for fast moving company's
                                that have numerous plant and equipment operational at any time.
                                Checks are uploaded in real time to mitigate risk through access
                                to information.
                            </span><br/><br />
                            <a href='/examples/ohs' className='learnMoreText'>Learn More</a>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                        <div className='container examplesBox'>
                            <Row>
                                <Col span={12}>
                                    <div id='examples2' className='maintenance'/>
                                </Col>
                                <Col span={12}>
                                    <h2 style={{marginTop: 33}}>Maintenance</h2>
                                </Col>
                            </Row>
                            <span>
                            Maintenance required can be logged by field employees and submitted
                            to yard staff or mechanics to ensure machinery and vehicles are fixed.
                            Priority allocation can be included to identify the necessary requirement
                            for maintenance.
                            </span><br/><br />
                            <a href='/examples/maintenance' className='learnMoreText'>Learn More</a>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                        <div className='container examplesBox'>
                            <Row>
                                <Col span={12}>
                                    <div id='examples3' className='inspections'/>
                                </Col>
                                <Col span={12}>
                                    <h2 style={{marginTop: 33}}>Inspections</h2>
                                </Col>
                            </Row>
                            <span>
                            Routine checks and inspections are important for businesses that rely on
                            machinery to be operational at all times. Management of these resources
                            with smart apps will enable personal to be notified of any important
                            changes.
                            </span><br/><br />
                            <a href='/examples/inspections' className='learnMoreText'>Learn More</a>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                        <div className='container examplesBox'>
                            <Row>
                                <Col span={12}>
                                    <div id='examples4' className='quality-checks'/>
                                </Col>
                                <Col span={12}>
                                    <h2 style={{marginTop: 33}}>Quality Checks</h2>
                                </Col>
                            </Row>
                            <span>
                            Businesses that rely on quality standards for their flow of information
                            like ISO 9001 will identify the importance of having systems that are not 
                            only effective but fast to complete and informative. 
                            </span><br/><br />
                            <a href='/examples/quality-checks' className='learnMoreText'>Learn More</a>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                        <div className='container examplesBox'>
                            <Row>
                                <Col span={12}>
                                    <div id='examples5' className='inductions'/>
                                </Col>
                                <Col span={12}>
                                    <h2 style={{marginTop: 33}}>Inductions</h2>
                                </Col>
                            </Row>
                            <span>
                            Applications that dynamically show information relevant to particular 
                            jobs can streamline inductions by informing relevant parties more 
                            effectively. Reports can also be generated and emailed to employers 
                            as proof if necessary.
                            </span><br/><br />
                            <a href='/examples/inductions' className='learnMoreText'>Learn More</a>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
                        <div className='container examplesBox'>
                            <Row>
                                <Col span={12}>
                                    <div id='examples6' className='procedures' />
                                </Col>
                                <Col span={12}>
                                    <h2 style={{marginTop: 33}}>Procedures</h2>
                                </Col>
                            </Row>
                            <span>
                            What ever the process may be, replacing repetitive paper-based systems 
                            with easy to search, use and monitor apps, will streamline almost all 
                            possible processes. Metadata captures GPS and time data that represent
                            to employers the data that is relevant. 
                            </span><br/><br />
                            <a href='/examples/procedures' className='learnMoreText'>Learn More</a>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
