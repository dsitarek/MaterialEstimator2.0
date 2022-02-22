import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { signOutUser, getUser, signInUser } from '../api/auth';
import signInButton from '../assets/btn_google_signin_light_normal_web.png';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = getUser();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navbar-container">
      <Navbar light expand="md" className="navbar">
        <NavbarBrand href="/">ME</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <NavLink href="/"><span className="nav-span">Home</span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Orders"><span className="nav-span">Orders</span></NavLink>
            </NavItem>
            {user ? (
              <>
                <UncontrolledDropdown nav inNavbar className="user-drop">
                  <DropdownToggle nav caret>
                    <img className="user-img" src={user.user_metadata.picture} alt="user" /><span className="nav-span-user">{user?.user_metadata.name}</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink onClick={signOutUser}>Sign Out</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : <><button type="button" className="login-btn-container" onClick={signInUser}><img className="login-btn" src={signInButton} alt="sign in" /></button></>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
