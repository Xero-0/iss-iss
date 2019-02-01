import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { BackTop } from 'antd'
import Home from './components/Home'
import Examples from './components/Examples'

export default class App extends Component {
    render() {
        return (
            <div>
                <BackTop id='backTop'>
                    <div className="ant-back-top-inner">Top</div>
                </BackTop>
                <Router>
                    <div>
                        <Route exact path='/' component={Home} />
                        {/* {/* <Route path='/mobile-data-collection' component={Mobile} /> */}
                        {/* <Route path='/real-time-reports' component={Reports} /> */}
                        <Route path='/examples' component={Examples} />
                    </div>
                </Router>
            </div>
        )
    }
}
