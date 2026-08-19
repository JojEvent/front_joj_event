import React from 'react'
import LoginForm from '../../composants/auth/LoginForm'
import { illust } from '../../assets'

const LoginAuth = () => {
  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Gauche – formulaire */}
      <div className="flex flex-1 justify-center items-center px-10">
        <LoginForm />
      </div>

      {/* Droite – illustration */}
      <div className="hidden lg:block w-[55%] overflow-hidden">
        <img
          src={illust}
          alt="Dakar 2026 mascotte"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  )
}

export default LoginAuth