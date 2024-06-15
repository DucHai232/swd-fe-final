import React from 'react'
import Auth from '../../components/Auth/Auth'

const Register = () => {
    return (
        <Auth
            comp="register"
            // title={"Register"}
            route="login"
            bgColor="var(--color-login)"
            bgCard="var(--color-register)"
            bgBtn="var(--color-btn-register)"
        />
    )
}

export default Register