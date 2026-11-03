import type {
    StatusAtendimento,
    StatusPeca,
    TipoEquipamento,
    TipoMovimentacao,
    TipoServico,

} from "@prisma/client";


export const TIPOS_EQUIPAMENTO: Record<TipoEquipamento, string> = {
    COMPUTADOR: "Computador",
    NOTEBOOK: "Notebook",
    MONITOR: "Monitor",
    IMPRESSORA: "Impressora",
    NOBREAK: "Nobreak",
    ESTABILIZADOR: "Estabilizador",
    REDE: "Equipamento de rede",
    OUTRO: "Outro",
};

export const SERVICOS: Record<TipoServico, string> = {
    FORMATACAO: "Formatação",
    MANUTENCAO: "Manutenção/Instalação",
    CONFIGURACAO: "Configuração",
    VISTORIA: "Vistoria/Levantamento",
    OUTRO: "Outro",
};

export const STATUS: Record<StatusAtendimento, string>  = {
    RECEBIDO: "Recebido",
    EM_ANALISE: "Em análise",
    EM_SERVICO: "Em Serviço",
    AGUARDANDO_PECA: "Aguardando peça",
    PRONTO_RETIRADA: "Pronto para retirada",
    ENTREGUE: "Entregue",
    BAIXA: "Baixa patrimonial",
};

// define cores das tags de status do atendimento dos serviços.
export const COR_STATUS: Record<StatusAtendimento, string> = {
    RECEBIDO: "bg-slate-100 text-slate-700 ring-slate-300",
    EM_ANALISE: "bg-sky-50 text-sky-800 ring-sky-300",
    EM_SERVICO: "bg-blue-50 text-blue-800 ring-blue-300",
    AGUARDANDO_PECA: "bg-amber-50 text-amber-800 ring-amber-300",
    PRONTO_RETIRADA: "bg-emerald-50 text-emerald-800 ring-emerald-300",
    ENTREGUE: "bg-gray-100 text-gray-600 ring-gray-300",
    BAIXA: "bg-red-50 text-red-800 ring-red-300",
};

export const STATUS_ABERTOS: StatusAtendimento[] = [
    "RECEBIDO",
    "EM_ANALISE",
    "EM_SERVICO",
    "AGUARDANDO_PECA",
    "PRONTO_RETIRADA"
];

export const STATUS_MOVIMENTACAO: StatusAtendimento[] = [
    "EM_ANALISE",
    "EM_SERVICO",
    "PRONTO_RETIRADA"
];

export const TIPOS_MOVIMENTACAO: Record<TipoMovimentacao, string> = {
    ENTRADA: "Entrada",
    EM_ANDAMENTO: "Em andamento",
    DIAGNOSTICO: "Diagnóstico",
    TipoServicoPECA: "",
    NOTA: "Nota",
    SAIDA: "Saída",
};

export const STATUS_PECA: Record<StatusPeca, string> = {
    PENDENTE: "Pendente",
    RECEBIDA: "Recebida",
    SOLICITADA: "Solicitada",
    CONCLUIDA: "Concluída",
    CANCELADA: "Cancelada",
};

// Função que mostra o o número do atendimento com 4 dígitos. Exemplo: 7 -> "0007".
export function numeroAtendimento(id: number) {
    return String(id).padStart(4, "0");
}

// Função que formata data para padrão nacional brasileiro: dia/mês/ano.
export function FormatarData(data: Date | null| undefined, comHora = false) {
    if (!data) return "-";
    return data.toLocaleString("pt-Br", {
        timeZone: "America/Sao_paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        ...(comHora ? {hour:"2-digit", minute: "2-digit"} : {})
    });
}

// Função que calcula e retorna a quantidade de dias passados.
export function diasAtras(dias: number) {
    return new Date(Date.now() - dias * 24 * 60 * 60 * 1000); 
}
