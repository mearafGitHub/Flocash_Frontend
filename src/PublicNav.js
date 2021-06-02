import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import style from './FormStyle.css'
import logo from './flocash-logo.png';

export default class PublicNav extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-dark px-sm-6">
                <img className="logo" src={logo} alt="Logo" />
                
                <Link to="/" className="nav-item ml-auto">
                    
                </Link> 
            </NavWrapper>
        );
    }
}
const NavWrapper = styled.nav`
    background: white;
    width: 100%;
    box-shadow: 0rem 0.9rem 9rem whitesmoke;
`