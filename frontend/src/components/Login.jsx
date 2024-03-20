import React from 'react'
import { Link } from "react-router-dom";
import "../css/Login.css";
const Login = () => {
  return (
    <div className="register">
    <form className="formsLogin">
    <><div className="formsLogin_campo">
            <label htmlFor='campoUser'>E-mail:</label> <br />
            <input type="email" id="campoUser" className="campoLogin-login" /> <br />
        </div><div className="formsLogin_campo">
                <label htmlFor="senha">Senha: </label> <br />
                <input type="password" id="senha" className="campoLogin-login" /> <br />
            </div><div className="formsLogin_campo">
                <input type="submit" value="Login" className='btnLogin-login' /> <br />
            </div><label>
                <input type="checkbox" checked="checked" name="remember" /> Me lembrar
            </label><p className="esqueceuSenha"> Não possui conta? <Link to='/'> Clique Aqui </Link> </p><br /></>
    </form>
    </div>
  )
}

export default Login;