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
      temperature: 1,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 2,
      presence_penalty: 2,
    })
    .then((res) => {
      return res.data.choices[0].message?.content;
    })
    .catch(
      (err) => `ChatGPT was unable to find the answer. Error: ${err.message}.`
    );

  return res;
};

// const query = async (prompt: string, chatId: string, model: string) => {
//   const res = await openai
//     .createCompletion({
//       model: 'text-davinci-001',
//       prompt,
//       temperature: 1,
//       max_tokens: 1000,
//       top_p: 1,
//       best_of: 10,
//       frequency_penalty: 2,
//       presence_penalty: 2,
//     })
//     .then((res) => {
//       return res.data.choices[0].text;
//     })
//     .catch(
//       (err) => `ChatGPT was unable to find the answer. Error: ${err.message}.`
//     );

//   return res;
// };

//for DALL-E
// const query = async (prompt: string, chatId: string, model: string) => {
//   const res = await openai
//     .createImage({
//       prompt,
//       n: 1,
//       size: '1024x1024',
//     })
//     .then((res) => {
//       return res.data.data[0].url;
//     })
//     .catch(
//       (err) => `ChatGPT was unable to find the answer. Error: ${err.message}.`
//     );

//   return res;
// };

export default query;
