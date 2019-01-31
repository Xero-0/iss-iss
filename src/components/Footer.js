import React, { Component } from 'react'
import { Row, Col } from "antd";

export default class Footer extends Component {
    render() {
        return (
            <div>
                <div style={{ height: 300, background: '#2980B9' }}>
                    <Row gutter={30} style={{ maxWidth: 800, margin: 'auto', padding: 40 }}>
                        <Col className='footer' span={12}>
                            <h3 className='footer'>Sitemap</h3>
                            Services <br />
                            Examples <br />
                            Pricing
                        </Col>
                        <Col className='footer' span={12}>
                            <h3 className='footer'>Info Sync Solutions</h3>
                            ABN <br />
                            Location 
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
