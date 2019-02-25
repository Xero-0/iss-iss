import React, { Component } from 'react'
import { Steps, Button } from 'antd'
import {steps} from './content'

const Step = Steps.Step;

export default class services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    previousDisabled(){
        if (this.state.current === 0) {
            return true
        } 
        return false
    }
    render() {
        const { current } = this.state;
        return (
            <div style={{ minHeight: '80vh', marginBottom: 40 }}>
                <Steps current={current} style={{
                    background: 'white',
                    padding: '20px',
                    marginBottom: 20,
                    borderTop: '2px solid #527cb7',
                    borderLeft: '2px solid #527cb7',
                }}>
                    {steps.map(item => <Step key={item.title} title={item.title} icon={item.icon} />)}
                </Steps>
                <div className="steps-action" style={{textAlign: 'center', marginBottom: 20}}>
                    {current < steps.length - 1
                        && <Button type='primary' style={{ marginRight: 8, minWidth: 200, marginBottom: 10, backgroundColor: '#1abc9c', borderColor: '#1abc9c'}} onClick={() => this.next()}>Next</Button>}
                    {current === steps.length - 1
                        && <Button type="primary" style={{ marginRight: 8, minWidth: 200, marginBottom: 10, backgroundColor: '#1abc9c', borderColor: '#1abc9c', fontWeight: 700}} href='/pricing'>Pricing</Button>}
                    {current >= 0
                        && (
                            <Button style={{ minWidth: 150}} disabled={this.previousDisabled()} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                </div>
                <div className="steps-content" style={{
                    background: 'white',
                    padding: '20px',
                    minHeight: 350,
                    marginBottom: 20,
                }}>{steps[current].content}</div>
                
            </div>
        )
    }
}
