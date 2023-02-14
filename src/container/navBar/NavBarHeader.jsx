import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import {
    useLocation,
    Link,
} from "react-router-dom";


const NavBarHeader = (args) => {
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar {...args} expand={'sm'}>
                <Link to={`/`} className='text-decoration-none'>
                    <NavbarBrand > Vistaar </NavbarBrand>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <Link to={`/customers`} className='text-decoration-none'>
                                <NavLink active={location.pathname == '/customers' ? true : false}> Customers </NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`/accounts`} className='text-decoration-none'>
                                <NavLink active={location.pathname == '/accounts' ? true : false}> Accounts </NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`/products`} className='text-decoration-none'>
                                <NavLink active={location.pathname == '/products' ? true : false}> Products </NavLink>
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBarHeader;