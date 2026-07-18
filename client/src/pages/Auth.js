import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { jwtDecode } from "jwt-decode";

const Auth = observer(() => {
  const { user } = React.useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const click = async () => {
    try {
      if (isLogin) {
        const data = await login(email, password)
        const token = data.token
        if (!token) throw new Error('Token não recebido da API')
        localStorage.setItem('token', token)
        const decoded = jwtDecode(token)
        user.setUser(decoded)
        user.setIsAuth(true)
        navigate(SHOP_ROUTE)
      } else {
        await registration(email, password)
        alert('✓ Conta criada com sucesso! Faça login para continuar.')
        navigate(LOGIN_ROUTE)
      }
    } catch(e) {
      console.error('Erro na autenticação:', e)
      alert('Erro: ' + (e.response?.data?.message || e.message))
    }
  }
  
  return (
    <Container className="auth d-flex justify-content-center align-items-center">
      <Card className="auth__card p-5">
        <h2 className="m-auto">{isLogin ? 'Autorização' : "Registar"}</h2>
        <Form className="auth__form d-flex flex-column">
          <Form.Control className="mt-3" placeholder="O seu email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Form.Control className="mt-3" placeholder="A sua password" value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
          <div className="auth__register d-flex align-items-center justify-content-between mt-3">
          {isLogin ?
            <div className="d-flex align-items-center">
              <span>Não tem conta?</span>
              <NavLink to={REGISTRATION_ROUTE} className="auth__register-link ms-2">
                Registrar
              </NavLink>
            </div>
            :
            <div>
              <span>Tem conta?</span>
              <NavLink to={LOGIN_ROUTE} className="auth__register-link ms-2">
                Entrar
              </NavLink>
            </div>
          }
            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? 'Entrar': 'Registrar'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
