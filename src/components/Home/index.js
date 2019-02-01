import React, { Component } from 'react'
import Hero from './Hero'
import Services from './Services'
import Info from './Info'
import Examples from './Examples'
import Contact from './Contact'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Hero />
                <div id='services' />
                <Services />
                <Info />
                <div id='examples' />
                <Examples />
                <Contact />
            </div>
        )
    }
}
