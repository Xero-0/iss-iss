import React, { Component } from 'react'
import { BackTop } from 'antd'
import Header from './Header'
import Hero from './Hero'
import Services from './Services'
import Info from './Info'
import Examples from './Examples'
import Contact from './Contact'
import Footer from './Footer'

export default class App extends Component {
    render() {
        return (
            <div>
                <div id='headerSvg' />
                <div id='middleSvg' />
                <BackTop id='backTop'>
                    <div className="ant-back-top-inner">Top</div>
                </BackTop>
                <div style={{ maxWidth: 1000, margin: 'auto', paddingLeft: 20, paddingRight: 20 }}>

                    <Header />
                    <Hero />
                    <div id='services' />
                    <Services />
                    <Info />
                    <div id='examples' />
                    <Examples />
                    <Contact />
                </div>
                <Footer />
            </div>


        )
    }
}
