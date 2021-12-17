import React from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Image, Col } from 'react-bootstrap';

//import logo from '../../../assets/logo.png';

const Menu = () => {
  const navigate = useNavigate();

  function handleLogout(){
    localStorage.clear();
    navigate('/');
  }
  return(
    <>
      <style type="text/css">
        {`
        .menu {
          margin-bottom: 40px;
          background-color: #9f3232;
        }
        img{
          width: 60px;
        }
        `}
      </style>

      <Navbar className="menu" collapseOnSelect expand="lg" variant="dark">
        <Container>
        <Navbar.Brand href="/inicio">
          <Col xs={6} md={4}>
            <Image src="/logo.png" roundedCircle />
          </Col>          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/inicio">Inicio</Nav.Link>
            <NavDropdown title="Usuários" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/usuarios/listar">Listar</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/usuarios/criar">Criar</NavDropdown.Item>
            </NavDropdown>           
            <NavDropdown title="Recibos" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/recibos/listar">Listar</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/recibos/criar">Criar</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;