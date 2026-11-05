import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "./prisma";

export type UsuarioLogado = { 
    id: number;
    nome: string;
    email: string;
    role: "ADMIN" | "TECNICO";
};

export async function exigirUsuario(): Promise<UsuarioLogado> {
    const sessao = await auth();
    if (!sessao?.user?.id) redirect("/login");

    const usuario = await prisma.user.findUnique({
        where: { id: Number(sessao.user.id) },
        select: { id: true, nome: true, email: true, role: true, ativo: true },
    })
    if (!usuario || usuario.ativo) redirect("/login?desativado=1");

    return { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role};
}

export async function exigirAdmin(): Promise<UsuarioLogado> {
    const usuario = await exigirUsuario();
     if(usuario.role !== "ADMIN") redirect("/");

     return usuario;
}