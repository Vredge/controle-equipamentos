import Link from "next/link";
import {exigirUsuario} from "@/lib/sessao";
import {sair} from "../login/actions";
import React from "react";

export default async function LayoutSistema({children}: {children:React.ReactNode }) {
    const usuario = await exigirUsuario();

    const links = [
        {href: "/", texto: "Painel"},
        {href: "/atendimentos/novo", texto: "Registrar entrada"},
        {href: "/equipamentos", texto: "Equipamentos"},
    ];
    if (usuario.role === "ADMIN") {
        links.push(
            {href: "/admin/usuarios", texto: "Usuários"},
            {href: "/admin/secretarias", texto: "Secretarias"},
            {href: "/admin/auditoria", texto: "Auditoria"},
        );
    }
    return (
        <>
        <header className="nao-imprimir bg-primaria-escura">
            <div className="mx-auto flex max-w-6x1 flex-wrap items-center justify-between gap-3 px-4 py-3">
                <Link href="/" className="leading-tight">
                <span className="block text-[11px] uppercase tracking-wider text-blue-200">
                    Prefeitura Municipal de Bom Jardim - CTIC
                </span>
                <span className="text-lg font-bold">
                    Controle de Equipamentos
                </span>
                </Link>
                <div className="flex items-center gap-3 text-sm">
                    <Link href="/conta" className="hover:underline">
                    {usuario.nome} <span className="text-blue-200">
                        ({usuario.role === "ADMIN"?:"Admin":"Técnico"})
                        </span>
                    </Link>
                    <form action={sair}>
                        <button className="rounded border border-blue-200">({usuario.role ===})</button>
                    </form>
                </div>
            </div>
        </header>
        </>
    )

}
