import openai from './chatgpt';

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createChatCompletion({
      model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 1.2,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 1,
      presence_penalty: 1,
    })
    .then((res) => {
      return res.data.choices[0].message?.content;
    })
    .catch(
      (err) => `ChatGPT was unable to find the answer. Error: ${err.message}.`
    );

  return res;
};

export default query;
