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
    if (usuario.role) {
        console
    }
}
