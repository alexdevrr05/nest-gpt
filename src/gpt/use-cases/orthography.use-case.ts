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
    messages: [
      {
        role: 'system',
        content: `
        Se te proporcionarán textos en español con posibles errores ortográficos y gramaticales.
        
        Asegúrate de seguir las reglas de la Real Academia Española y corrige cualquier error encontrado.
        Responde en formato JSON indicando los errores y sus soluciones.
        
        Ejemplo de salida: 
        {
          userScore: number, // puntúa según la corrección, donde el mínimo es 0 y el máximo es 100
          errors: [{ original: string, correction: string }], // [{ 'error': 'solución' }]
          message: string, // usa emojis y texto para felicitar al usuario basado en su userScore
        }
      `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
    max_tokens: 150,
  });

  // console.log(completion.choices[0]);

  const jsonResp = JSON.parse(completion.choices[0].message.content);
  return jsonResp;
};
