import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em casa! */}
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/equipments">
                <i className="fa fa-archive"></i> Equipamentos
            </Link>
            <Link to="/places">
                <i className="fa fa-globe"></i> Locais
            </Link>
        </nav>
    </aside>