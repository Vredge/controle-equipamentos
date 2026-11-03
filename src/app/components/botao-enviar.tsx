"use client";

import { useFormStatus } from "react-dom";
import { classeBotao } from "./ui";

export function BotaoEnviar ({ children, className }: { children: React.ReactNode; className?: string }) {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className={className ?? classeBotao}>
            {pending ? "Salvando...": children}
        </button>
    );
}
