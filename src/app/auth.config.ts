import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: { signIn: "/login" },
    session: {
        strategy: "jwt",
        maxAge: 8*60*60, // Sessão expira em 8H
        updateAge: 60*60, // Renova a cada hora de uso
    },
    providers: [], // Os providers ficam em auth.ts
    callbacks: {
        authorized({ auth, request }) {
            const logado = !!auth?.user;
            const caminho = request.nextUrl.pathname;

            if (caminho.startsWith("/login")) return true;
            if (!logado) return false; // caso falso, retorna para /login

            if (caminho.startsWith("/admin") && auth.user.role !== "ADMIN") {
                return Response.redirect(new URL("/", request.nextUrl));
            }
            return true;
        },
    
    // Copia id e perfil do usuário para dentro do token JWT.
    jwt({token, user}) {
        if (user) {
            token.id = user.id;
            token.role = user.role;
        }
        return token;
    },
    session({ session, token }) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "TECNICO";
        return session;
        },
    },
} satisfies NextAuthConfig;