/**
 * se podría colocar que orthographyCheckUseCase recibe
 * todo el DTO "OrthographyDto" pero en los casos de uso
 * no se deben mandar valores de mas, solo los necesarios
 * para trabajar
 */

import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);

  return completion.choices[0];
};
