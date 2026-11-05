const falhas = new Map<string, {quantidade: number; expiraEm: number}>();

export function estaBloqueado(chave: string, limite: number) {
    const registro = falhas.get(chave);

    if (!registro || registro.expiraEm < Date.now()) return false;
    return registro.quantidade >= limite;
}

export function registrarFalha(chave:string, janelaMs: number) {
    const agora = Date.now();
    const registro = falhas.get(chave);

    if(!registro || registro.expiraEm < agora) {
        falhas.set(chave, {quantidade: 1, expiraEm: agora + janelaMs});
    } else {
        registro.quantidade++;
    }
}

export function limparFalhas(chave: string) {
    falhas.delete(chave);
}

setInterval(() => {
    const agora = Date.now();
    
    for (const [chave, registro] of falhas) {
        if (registro.expiraEm < agora) falhas.delete(chave);
    }
}, 10* 60* 1000).unref();