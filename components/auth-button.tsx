'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Carregando...</p>
  }

  if (session) {
    return (
      <div>
        <p>Olá, {session.user?.name}!</p>
        <button onClick={() => signOut()}>Sair</button>
      </div>
    )
  }
  
  return (
    <div className='bg-black'>
      <p>Você não está logado.</p>
      {/* Ao clicar, o next-auth redireciona para o Keycloak */}
      <button onClick={() => signIn('keycloak')}>Entrar</button>
    </div>
  )
}