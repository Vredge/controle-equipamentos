import { FormularioLogin } from "./formulario-login";
import { Aviso } from "@/components/ui";

export default async function PaginaLogin({ searchParams }:PageProps<"/login">) {
    const { desativado } = await searchParams;

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="mb-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Prefeitura Municipal de Bom Jardim - CTIC
                    </p>
                    <h1 className="mt-1 text-2xl font-bold text-primaria-escura"> Controle de Equipamentos</h1>
                </div>
                <div className="rounded-lg border-t-4 border-primaria bg-white p-6 shadow-md">
                    {desativado && (
                        <div className="mb-4">
                            <Aviso tipo="erro">
                                Sua conta foi desativado. Fale com o administrador.
                            </Aviso>
                        </div>
                    )}
                    <FormularioLogin/>
                </div>
            </div>
        </main>
    );
}