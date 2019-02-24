import React from 'react'
import { Icon, Row, Col } from 'antd'

export const steps = [{
    title: 'Mobile Data Collection',
    content:
        <div>
            <Row gutter={10}>
                <Col span={12}>
                    <div className='ipad-example' />
                </Col>
                <Col span={12}>
                    <h1>Forms</h1>
                </Col>
            </Row>
        </div>,
    icon: <Icon type="mobile" />
}, {
    title: 'Custom Reporting',
    content:
        <div>
            <Row gutter={10}>
                <Col span={12}>
                    <div className='portal-example' />
                </Col>
                <Col span={12}>
                    <h1>Real-time Reporting</h1>
                </Col>
            </Row>
        </div>,
    icon: <Icon type="file-text" />
}, {
    title: 'Accessibility',
    content:
    <div>
    <Row gutter={10}>
        <Col span={12}>
            <div className='menu-example' />
        </Col>
        <Col span={12}>
            <h1>Roles and permissions</h1>
        </Col>
    </Row>
</div>,
    icon: <Icon type="user" />
}, {
    title: 'Options',
    content:
    <div>
    <Row gutter={10}>
        <Col span={12}>
            <div className='email-example' />
        </Col>
        <Col span={12}>
            <h1>Automated emails</h1>
        </Col>
    </Row>
</div>,
    icon: <Icon type="setting" />
}];