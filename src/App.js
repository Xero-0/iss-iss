import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { BackTop } from 'antd'
import Home from './components/Home'
import Examples from './components/Examples'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import Invoice from './components/Invoice'

export default class App extends Component {
    backgroundSvgs() {
        if (window.location.pathname === '/') {
            return (
                <div>
                    <div id='headerSvg' />
                    <div id='middleSvg' />
                </div>
            )
        } else if (window.location.pathname.includes('/services')) {
            return (
                <div>
                    <div id='headerSvg' style={{
                        height: 170,
                        clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'
                    }} />
                    <div id='servicesSvg' />
                </div>)
        } else if (window.location.pathname.includes('/examples/')) {
            return <div id='headerSvg' style={{ height: 320 }} />
        } else if (window.location.pathname.includes('/pricing')) {
            return <div id='headerSvg' style={{
                height: 100,
                clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'
            }} />
        } else if (window.location.pathname.includes('/contact')) {
            return <div id='headerSvg' style={{
                height: 100,
                clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'
            }} />
        } else if (window.location.pathname.includes('/invoice')) {
            return <div id='headerSvg' style={{
                height: '100%',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                width:' 100%',
                position: 'fixed'
            }} className='noPrint'/>
        } else {
            return <div id='headerSvg' style={{ height: 320 }} />
        }
        
    }
    render() {
        return (
            <div>
                <BackTop id='backTop'>
                    <div className="ant-back-top-inner">Top</div>
                </BackTop>
                {this.backgroundSvgs()}
                <div style={{ maxWidth: 1000, margin: 'auto', paddingLeft: 20, paddingRight: 20, overflow: 'auto' }}>
                    <Header />
                    <Router>
                        <div>
                            <Route exact path='/' component={Home} />
                            <Route path='/services' component={Services} />
                            <Route path='/examples' component={Examples} />
                            <Route path='/pricing' component={Pricing} />
                            <Route path='/contact' component={Contact} />
                            <Route path='/invoice' component={Invoice} />
                        </div>
                    </Router>
                </div>
                <Footer />
            </div>
        )
    }
}
