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
                <div className={this.state.service.url + ' container'} style={{ width: '100%', height: 250, marginBottom: 16 }} />
                <h1 style={{ textAlign: 'center' }}>{this.state.service.title}</h1>
                <div gutter={16} style={{ marginBottom: 100 }}>
                    <Row>
                        <div className='container' style={{ height: 250, marginBottom: 16 }} />
                    </Row>
                    <Row>
                        <div className='container' style={{ height: 400, marginBottom: 16 }} />
                    </Row>

                </div>
            </div>
        )
    }
}
