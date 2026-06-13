import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      nome: z.string().min(4, "Nome deve ter pelo menos 4 caracteres"),
      email: z.string().email(),
      telefone: z.string().min(9, "Telefone deve ter pelo menos 9 caracteres"),
    }),
  )
  .handler(async ({ data }) => {
    const url = import.meta.env.LEAD_API_URL ?? process.env.LEAD_API_URL;
    if (!url) throw new Error("URL da API não configurada.");

    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      throw new Error("Falha de rede ao contatar a API.");
    }

    if (!res.ok) throw new Error(`Erro ${res.status}: não foi possível cadastrar.`);
  });
