// import type { NextApiRequest, NextApiResponse } from 'next';
// import openai from '../../utils/chatgpt';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const models = await openai.listModels().then((res) => res.data.data);

//   const modelOptions = models.map((model) => ({
//     value: model.id,
//     label: model.id,
//   }));

//   res.status(200).json({ modelOptions });
// }
