import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  callbacks: {
    // Este callback é crucial para passar o token de acesso para o frontend
    async jwt({ token, account }) {
      if (account) {
        // Na primeira vez que o JWT é criado (logo após o login),
        // adicionamos o access_token e o id_token nele.
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    },
    // Este callback torna o token de acesso visível para a sessão no lado do cliente
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string
        session.idToken = token.idToken as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }