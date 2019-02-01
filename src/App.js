import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { BackTop } from 'antd'
import Home from './components/Home'
import Examples from './components/Examples'
import Header from './components/Header'
import Footer from './components/Footer'

export default class App extends Component {
    backgroundSvgs() {
        if (window.location.pathname === '/') {
            return (
                <div>
                    <div id='headerSvg' />
                    <div id='middleSvg' />
                </div>
            )
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
                <div style={{ maxWidth: 1000, margin: 'auto', paddingLeft: 20, paddingRight: 20 }}>
                    <Header />
                    <Router>
                        <div>
                            <Route exact path='/' component={Home} />
                            {/* {/* <Route path='/mobile-data-collection' component={Mobile} /> */}
                            {/* <Route path='/real-time-reports' component={Reports} /> */}
                            <Route path='/examples' component={Examples} />
                        </div>
                    </Router>
                </div>
                <Footer />
            </div>
        )
    }
}
