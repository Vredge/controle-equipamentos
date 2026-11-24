"use client";

import { useActionState } from "react";
import { entrar } from "./actions";
import { Aviso, Campo, classeCampo } from "@/components/ui";
import { BotaoEnviar } from "@/components/botao-enviar";

export function FormularioLogin() {
    const [erro, acao] = useActionState(entrar, undefined);

    return (
        <form action={acao} className="space-y-4">
            <Campo rotulo="E-mail institucional">
                <input name="email" type="email" required autoComplete="username" className={classeCampo}></input>
            </Campo>
            <Campo rotulo="Senha">
                <input name="senha" type="password" required autoComplete="current-password" className={classeCampo}></input>
            </Campo>
        </form>
    );
}