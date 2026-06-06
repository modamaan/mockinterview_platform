import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("[OpenAI] OPENAI_API_KEY is not set. AI features will not work.");
}

const openai = new OpenAI({ apiKey });

/**
 * Send a prompt to OpenAI and get a text completion back.
 * @param {string} prompt
 * @param {object} [options]
 * @param {string} [options.model]        - defaults to gpt-4o-mini
 * @param {number} [options.temperature]  - defaults to 0.7
 * @param {number} [options.maxTokens]    - defaults to 2048
 * @returns {Promise<string>}
 */
export const generateChatCompletion = async (prompt, options = {}) => {
  const {
    model = "gpt-4o-mini",
    temperature = 0.7,
    maxTokens = 2048,
  } = options;

  const completion = await openai.chat.completions.create({
    model,
    temperature,
    max_tokens: maxTokens,
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content.trim();
};

export default openai;
