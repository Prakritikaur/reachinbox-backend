import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const trainingData = [
  {
    text: "I am applying for a job position. If the lead is interested, share the meeting booking link: https://cal.com/example"
  },
  {
    text: "If the client asks for a demo, thank them and share the demo link."
  },
  {
    text: "If the email is about pricing, politely explain pricing tiers."
  }
];

export async function suggestReply(emailText) {
  try {
    // 1️⃣ Store the training data in memory
    const vectorStore = await MemoryVectorStore.fromTexts(
      trainingData.map(item => item.text),
      trainingData,
      new OpenAIEmbeddings()
    );

    // 2️⃣ Create retriever + model
    const retriever = vectorStore.asRetriever();
    const model = new OpenAI({ temperature: 0.7 });

    // 3️⃣ RAG-based reply generation
    const chain = RetrievalQAChain.fromLLM(model, retriever);
    const response = await chain.call({
      query: `Suggest a professional reply to this email:\n${emailText}`
    });

    return response.text;
  } catch (error) {
    console.error("Error generating reply:", error);
    return "Sorry, I couldn’t generate a reply right now.";
  }
}
