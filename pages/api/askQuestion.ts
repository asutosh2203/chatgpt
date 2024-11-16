// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { geminiQuery /*chatgptQuery*/ } from "../../utils/queryApi";
import { adminDb } from "../../firebaseAdmin";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import util from "util";
import { getMessageFromChat } from "../../utils/commonFunctions";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!" });
  }

  //ChatGPT query
  // const response = await chatgptQuery(prompt, chatId, model);
  // const responseArray = response?.split('\n');

  let prevMessages = await getMessageFromChat(
    chatId,
    session?.user?.email!,
    "createdAt",
    "asc"
  );

  let history: Array<any> = [];

  prevMessages.forEach((mes) => {
    let historyObj = { role: "", parts: [{}] };

    if (typeof mes.data().text != "string") {
      let str = mes.data().text.join(" ");
      historyObj = { ...historyObj, parts: [{ text: str }] };
    } else {
      historyObj = { ...historyObj, parts: [{ text: mes.data().text }] };
    }

    if (mes.data().user._id != "g-gem") {
      historyObj = { ...historyObj, role: "user" };
    } else {
      historyObj = { ...historyObj, role: "model" };
    }

    history.push(historyObj);
  });

  history = history.slice(0, -1);
  if (history.length > 20) {
    history = history.slice(-20);
  }

  // Gemini query
  const geminiResponse = await geminiQuery(prompt, chatId, history);
  // let geminiResponseArray = geminiResponse[0]?.split("\n");
  // geminiResponseArray = geminiResponseArray.filter(responses => responses != '')

  const message: ResponseMessage = {
    text: geminiResponse || "Gemini was unable to find the answer.",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "g-gem",
      name: "Google Gemini",
      avatar: "https://i.imgur.com/V0CZWvw.jpeg",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  const response = { answer: message.text[0], history: history, err: geminiResponse[1] };

  res.status(200).json(response);
}
