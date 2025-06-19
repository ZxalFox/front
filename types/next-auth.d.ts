import 'next-auth';
import 'next-auth/jwt';

// Usamos "module augmentation" para adicionar nossas propriedades aos tipos originais.

/**
 * Estende o tipo do token JWT para incluir nossas propriedades customizadas.
 */
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    idToken?: string;
  }
}

/**
 * Estende o tipo da Session para incluir nossas propriedades customizadas.
 */
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    idToken?: string;
    // Se você também quiser estender o objeto 'user'
    // user: {
    //   id: string; // Exemplo de como adicionar um ID ao usuário
    // } & DefaultSession['user'];
  }
}