import React, { Component } from 'react'
import Header from '../Header'
import Footer from '../Footer'


export default class Examples extends Component {
    render() {
        return (
            <div>
                <div id='headerSvg' />

                <div style={{ maxWidth: 1000, margin: 'auto', paddingLeft: 20, paddingRight: 20 }}>
                    <Header />
                </div>
                <Footer />
            </div>
        )
    }
}
