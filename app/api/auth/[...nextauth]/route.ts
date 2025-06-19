import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,

      // --- MUDANÇA PRINCIPAL ---
      // 1. Usamos o ISSUER INTERNO como padrão para toda a comunicação de servidor.
      //    Isso resolve o erro ECONNREFUSED.
      issuer: process.env.INTERNAL_KEYCLOAK_ISSUER!,

      // 2. Definimos a URL de autorização EXPLICITAMENTE com a URL PÚBLICA
      //    para que o navegador do usuário seja redirecionado para o lugar certo.
      authorization: {
        url: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/auth`,
        params: { scope: "openid email profile" },
      },
    }),
  ],
  callbacks: {
    // Este callback é crucial para passar o token de acesso para o frontend
    async jwt({ token, account }) {
      if (account) {
        // Na primeira vez que o JWT é criado (logo após o login),
        // adicionamos o access_token e o id_token nele.
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    // Este callback torna o token de acesso visível para a sessão no lado do cliente
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.idToken = token.idToken as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
