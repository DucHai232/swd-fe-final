import React from 'react'
import Auth from '../../components/Auth/Auth'

const Login = () => {
    return (
        <Auth
            comp="login"
            // title={"Login"}
            route="register"
            bgColor="var(--color-register)"
            bgCard="var(--color-login)"
            bgBtn="var(--color-btn-login)"
        />
    )
}

export default Login