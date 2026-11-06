import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import bcrypt from "bcryptjs";
import { error } from "console";
import { create } from "domain";
import { email } from "zod";

const prisma = new PrismaClient();

const SECRETARIAS = [
    "Administração",
    "Agricultura",
    "Assistência Cultural",
    "Cultura",
    "Educação",
    "Esporte e Lazer",
    "Fazenda",
    "Gabinete do Prefeito",
    "Meio Ambiente",
    "Obras",
    "Saúde",
    "Turismo",
];

async function main(){
    const { ADMIN_NOME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if(!ADMIN_NOME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
        throw new Error("Defina ADMIN_NOME, ADMIN_EMAIL e ADMIN_PASSWORD no .env");
    }

    // upsert cria caso não exista, se existir, não faz nada.
    await prisma.user.upsert({
        where: { email: ADMIN_EMAIL.toLowerCase() },
        update: {},
        create: {
            nome: ADMIN_NOME,
            email: ADMIN_EMAIL.toLowerCase(),
            senhaHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
            role: "ADMIN",
        },
    });
    for (const nome of SECRETARIAS) {
        await prisma.secretarias.upsert({where:{ nome }, update: {}, create: { nome } });
    }

}

main().catch((erro) => {
    console.error(erro);
    process.exit(1);
}).finally(()=> prisma.$disconnect());