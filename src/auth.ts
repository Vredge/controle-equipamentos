import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { email, z } from "zod";
import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { estaBloqueado, limparFalhas, registrarFalha } from "@/lib/rate-limit";


class LimiteDeTentativas extends CredentialsSignin {
    code = "limite";
}

// Hash de uma senha qualquer, usado quanto o e-mail não existe. Assim o login demora o mesmo tempo nos dois casos e ninguém descobre quais e-mails têm conta medindo o tempo de resposta.

const HASH_FALSO = bcrypt.hashSync("senha-que-nao-existe", 12);

const esquemaLogin = z.object({
    email: z.email(),
    senha: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: { email: {}, senha: {} },
            async authorize(credentials, request) {
                //  Dados chegaram no formato correto?, caso sim, Ok
                const dados = esquemaLogin.safeParse(credentials);
                if (!dados.success) return null;
                const email = dados.data.email.toLowerCase();

                // Caso não: 5 falhas seguidas no mesmo e-mail, ou 30 falhas do mesmo IP
                //  (alguém testando uma senha em várias contas), bloqueiam por 1 minuto.
                const ip = request.headers.get("x-real-ip") ?? "local";
                const chave = `login: ${ip}:${email}`;
                const chaveIp = `login-ip:${ip}`;

                if (estaBloqueado(chave, 5) || estaBloqueado(chaveIp, 30)) throw new LimiteDeTentativas();

                // Busca o user pelo e-mail
                const usuario = await prisma.user.findUnique({ where: { email } });

                // A hash da senha confere com a hash gravada?
                const senhaOk = await bcrypt.compare(dados.data.senha, usuario?.senhaHash ?? HASH_FALSO);

                if (!usuario || !usuario.ativo || !senhaOk) {
                    registrarFalha(chave, 60_000);
                    registrarFalha(chaveIp, 60_000);
                    return null;
                }

                limparFalhas(chave);
                return {
                    id: String(usuario.id),
                    name: usuario.nome,
                    email: usuario.email,
                    role: usuario.role,
                };
            },
        }),
    ],
});