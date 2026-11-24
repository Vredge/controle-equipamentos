"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function entrar(_estadoAnterior: string | undefined, formData: FormData) {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            senha: formData.get("senha"),
            redirectTo: "/",
        });
    } catch (erro){
        if (erro instanceof AuthError) {
            if (erro.type === "CredentialsSignin" && "code" in erro && erro.code === "limite") {
                return "Muitas tentativas. Aguarde um minuto e tente novamente.";
            }
            return "E-mail ou senha inválidos.";
        }
        throw erro;
    }
}

export async function sair() {
    await signOut({ redirectTo: "/login" });
}
