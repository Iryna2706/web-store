import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { Context } from "..";


//navbar
const NavBar = observer(() => {
    const { user, product } = useContext(Context)
    const navigate = useNavigate()
 
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
      localStorage.removeItem('token')
      navigate(LOGIN_ROUTE)
    }

    const resetFilters = () => {
      product.clearFilters()
    }

    return (
        <Navbar bg="light" data-bs-theme="light">
        <Container>
          <NavLink to={SHOP_ROUTE} className="navbar__brand" onClick={resetFilters}>PMU Expert Store</NavLink>
          {user.isAuth ?
          <Nav className="ml-auto"> 
            <Button variant={"outline-dark"} onClick={() => navigate(ADMIN_ROUTE)} className="navbar__button">Administrador</Button>
            <Button variant={"outline-dark"} onClick={() => logOut()} className="navbar__button">Sair</Button>

          </Nav>
          :
          <Nav className="ml-auto">
            <Button
              variant={"outline-dark"}
              className="navbar__button"
              onClick={() => navigate(LOGIN_ROUTE)}
            >Autorização</Button>

          </Nav>
         }
        </Container>
      </Navbar>

    );
})

export default NavBar;