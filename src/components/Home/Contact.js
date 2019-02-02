import React, { Component } from 'react'

export default class Contact extends Component {
    render() {
        return (
            <div>
                <div style={{ maxWidth: 500, margin: 'auto', marginBottom: 65, textAlign: 'center' }}>
                    <div id='contactImage' />
                    <h1>Get in Contact</h1>
                    <h3 style={{ marginBottom: 35 }}>Curious about how we can transform your information system?</h3>
                    <a href='/contact' className='contactButton'>Contact</a>
                </div>
            </div>
        )
    }
}
