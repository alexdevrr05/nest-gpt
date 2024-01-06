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
          Te serán proveídos textos en Español con posibles errores ortográficos (tildes también) y gramaticales.
          Las palabras usadas deben de existir en el diccionario de la Real Academia Española.
          
          Tu misión será responder en formato JSON.
          Tu tarea es corregir sus errores gramaticales y retornar soluciones, 
          También debes dar un porcentaje de acierto por el usuario.
          
          Si no hay errores, debes de retonar un mensaje de felicitaciones.
          
          Ejemplo de salida: 
          {
            userScore: number,
            errors: string[]. // ['error -> solución']
            message: string, // usa emojis y texto para felicitar al usuario
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

  console.log(completion.choices[0]);

  return completion.choices[0];
};
