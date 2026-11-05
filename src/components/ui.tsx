import type { StatusAtendimento } from "@prisma/client";
import { COR_STATUS, STATUS } from "../lib/rotulos";

export const classeBotao = "inline-flex items-center justify-center gap-2 rounded-md bg-primaria px-4 py-2 text-sm font-semibold text-white hover:bg-primaria-escura disabled:opacity-60";
export const classeBotaoSecundario = "inline-flex items-center justify-center gap-2 rounded-md border border-primaria px-4 py-2 text-sm font-semibold text-primaria hover:bg-primaria-clara";
export const classeCampo = "w-full rounded-md border border-borda bg-white px-3 py-2 text-sm focus:border-primaria focus:outline-none";

export function Cartao ({
    titulo, children, acao,}:
    {
        titulo?: string;
        children: React.ReactNode;
        acao?: React.ReactNode;
    }) {
        return (
            <section className="rounded-lg border border-borda bg-white p-5 shadow-sm">
                    {(titulo || acao) && (<div className="mb-4 flex items-center justify-between gap-4">
                        {titulo && 
                        <h2 className="text-lg font-bold text-primaria-escura"> 
                            {titulo}
                        </h2>}
                        {acao}
                    </div>
                    )}
                    {children}
            </section>
        );
    }

export function Campo ({
    rotulo,
    obrigatorio,
    children,
    dica,}:{
        rotulo: string;
        obrigatorio?: boolean;
        children: React.ReactNode;
        dica?: string;
    }) {
        return (
            <label className="block text-sm">
                <span className="mb-1 block font-semibold text-gray-700">
                    {rotulo} {obrigatorio && <span className="text-red-600">*</span>}
                </span>
                {children} {dica && <span className="mt-1 block text-xs text-gray-500">{dica}</span>}
            </label>
        );
    }

export function SeloStatus({ status }: { status: StatusAtendimento }) {
    return (
        <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${COR_STATUS[status]}`}>
            {STATUS[status]}
        </span>
    );
}

export function Aviso({tipo, children}: {tipo: "erro" | "sucesso"; children: React.ReactNode}) {
    const cores = tipo === "erro"
    ? "border-red-300 bg-red text-red-800"
    : "border-emerald-300 bg-emerald-50 text-emerald-800";
    return(
        <p role={tipo === "erro" ? "alert": "status"} className={`rounded-md-border px-3 py-2 text-sm ${cores}`}>
            {children}
        </p>
    );
}

export function Titulo({ children, sub }: { children: React.ReactNode; sub?: React.ReactNode }) {
    return (
        <div className="mb-6">
            <h1 className="text-2x1 font-bold text-primaria-escura">
                {children}
            </h1>
            {sub && <p className="mt-1 text-sm text-gray-600">{sub}</p>}
        </div>
    );
}