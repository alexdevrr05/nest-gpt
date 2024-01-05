/**
 * se podría colocar que orthographyCheckUseCase recibe
 * todo el DTO "OrthographyDto" pero en los casos de uso
 * no se deben mandar valores de mas, solo los necesarios
 * para trabajar
 */

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (options: Options) => {
  const { prompt } = options;

  return {
    prompt: prompt,
    apikey: process.env.OPENAI_API_KEY,
  };
};
