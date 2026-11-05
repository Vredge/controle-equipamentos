export type EstadoFormulario = {
    erro?: string;
    sucesso?: string;
    valores?: Record<string, string>; //Devolve o que foi digitado quando há erro.
} | undefined;