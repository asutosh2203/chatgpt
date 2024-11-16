// import openai from './chatgpt';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
} from '@google/generative-ai';

// export const chatgptQuery = async (prompt: string, chatId: string, model: string) => {
//   const res = await openai
//     .createChatCompletion({
//       model,
//       messages: [
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//       temperature: 1,
//       top_p: 1,
//       max_tokens: 1000,
//       frequency_penalty: 2,
//       presence_penalty: 2,
//     })
//     .then((res) => {
//       return res.data.choices[0].message?.content;
//     })
//     .catch(
//       (err) => `ChatGPT was unable to find the answer. Error: ${err.message}.`
//     );

//   return res;
// };

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

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: 'Answer like a friendly gen-z.',
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 2048,
  responseMimeType: 'text/plain',
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export async function geminiQuery(
  prompt: string,
  chatId: string,
  history: Array<Content> = []
) {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history,
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (err: any) {
    console.log(err);
    return `Sorry, Gemini cannot assist you now. Error Code: ${err.status}, Error: ${err.statusText}.`;
  }
}
