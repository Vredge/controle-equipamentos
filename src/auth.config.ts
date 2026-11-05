import type { NextAuthConfig } from "next-auth";
// Configuração "leve" do login: não importa o Prisma nem o bcrypt.
// É usada pelo proxy.ts, que roda antes de TODAS as páginas e precisa serrápido.
export const authConfig = {
    pages: { signIn: "/login" },
    session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // a sessão expira em 8 horas
    updateAge: 60 * 60, // e é renovada a cada hora de uso
    },
    providers: [], // os providers ficam no auth.ts
    callbacks: {
        // Decide se a requisição pode seguir. Roda no proxy.ts.
        authorized({ auth, request }) {
        const logado = !!auth?.user;
        const caminho = request.nextUrl.pathname;
        if (caminho.startsWith("/login")) return true;
        if (!logado) return false; // false = manda para /login
        
        if (caminho.startsWith("/admin") && auth.user.role !== "ADMIN") {
            return Response.redirect(new URL("/", request.nextUrl));
        }
        return true;
    },
    // Copia id e perfil do usuário para dentro do token JWT...
    jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.role = user.role;
            }
            return token;
        },
        // ...e do token para a sessão que as páginas leem.
        session({ session, token }) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "TECNICO";
        return session;
        },
    },
} satisfies NextAuthConfig;