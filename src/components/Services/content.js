import React from 'react'
import { Icon, Row, Col } from 'antd'

export const steps = [{
    title: 'Mobile Data Collection',
    content:
        <div>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className='ipad-example' />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <h1 style={{ marginTop: 20 }}>Forms</h1>
                    <p>We use existing software and experience to develop a mobile data collection system that is simple, fast and reliable.</p>
                    <p>Without the need to transform your existing system, we can work with you and your team to establish or transform what works on paper; to a more efficient digital form. Recording daily activities, tracking maintenance and resources has never been easier.</p>
                    <p>Forms can be built to autofill fields, make complex calculations, and only ask/show what is relevant to specific jobs. Sifting through paperwork to find that prestart, timesheet or daily log is a problem of the past.</p>
                </Col>
            </Row>
            <div id='examples4' className='quality-checks' style={{margin: 0, marginTop: 30, height: 160, opacity: .8, borderRadius: 0, borderRight: '2px solid #527cb7',borderBottom: '2px solid #527cb7' }}/>

        </div>,
    icon: <Icon type="mobile" />
}, {
    title: 'Custom Reporting',
    content:
        <div>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className='portal-example' />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <h1 style={{ marginTop: 20 }}>Real-time Reporting</h1>
                    <p>Once data is collected with apps instead of paperwork, the possibilities are endless.</p>
                    <p>We build secure web-based portals for your information, fully customized to your requirements. These portals can be accessed from desktops and mobile devices.</p>
                    <p style={{ fontStyle: 'italic', fontWeight: 600 }}>Know what, where, and when everything is happening, realtime.</p>
                    <p>Automate timesheets, track resources, maintenance, and jobs. If you're capturing the data, its time to start using it.</p></Col>
            </Row>
            <div id='examples1' className='ohs' style={{margin: 0, marginTop: 30, height: 160, opacity: .8, borderRadius: 0, borderRight: '2px solid #527cb7',borderBottom: '2px solid #527cb7' }}/>

        </div>,
    icon: <Icon type="file-text" />
}, {
    title: 'Accessibility',
    content:
        <div>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className='menu-example' />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <h1 style={{ marginTop: 20 }}>Roles and Permissions</h1>
                    <p>Value communication? Set up your existing clients with a login to your company's portal. </p>
                    <p>Clients can then see relevant information to their jobs as it happens. Not only is this type of real-time access to information extremely valuable for your clients; it saves your administration team in contact time and having to build reports manually.</p>
                    <p>With branding and color schemes that match your company presence; clients, subcontractors and employees can obtain, or input information seamlessly.</p></Col>
            </Row>
            <div id='examples5' className='inductions' style={{margin: 0, marginTop: 30, height: 160, opacity: .8, borderRadius: 0, borderRight: '2px solid #527cb7',borderBottom: '2px solid #527cb7' }}/>
        </div>,
    icon: <Icon type="user" />
}, {
    title: 'Options',
    content:
        <div>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className='email-example' />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <h1 style={{ marginTop: 20 }}>Automated Emails and More</h1>
                    <p>Capturing data digitally offers many more benefits than just custom reports. Once records are created or marked as a particular status has been set more actions can occur. </p>
                    <p>For example, the image on the left shows an email that is automatically sent to a member of staff when a petty cash reimbursement is logged. It will build a list of items and is in a format that is understandable. </p>
                    <p>This simple functionality has been used from notifying maintenance teams of plant marked as not operational, to simply applying for leave.</p></Col>
            </Row>
            <div id='examples2' className='maintenance' style={{margin: 0, marginTop: 30, height: 160, opacity: .8, borderRadius: 0, borderRight: '2px solid #527cb7',borderBottom: '2px solid #527cb7' }}/>
        </div>,
    icon: <Icon type="setting" />
}];