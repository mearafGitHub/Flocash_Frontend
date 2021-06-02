import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Form from './Form.js'
import PublicNav from './PublicNav.js'

export default class FormCheckout extends Component {
    render() {
        return (
            <div>
                <PublicNav/>
                <Form/>
            </div>
            
        );
    }
}
const NavWrapper = styled.nav`
    background: var(--coolWhite);
    width: 100%;
    box-shadow: 0.1rem 0.1rem 0.4rem var(--coolGrey);
    `