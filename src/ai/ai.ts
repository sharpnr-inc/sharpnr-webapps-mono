import { SHARPNR_CONTEXT } from "./sharpnr_context";

export async function askAI(message: string) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "system",
            content: SHARPNR_CONTEXT,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    },
  );

  const data = await response.json();

  return data.choices?.[0]?.message?.content ?? "No response";
}
