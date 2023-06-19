const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { DynamicTool } = require("langchain/tools");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const MODEL_NAME = "gpt-3.5-turbo-0613"

// Chatbot is a langchain agent using the custom AlgoliaTool we built

const getChatbot = async () => {
  const Chatbot = await initializeAgentExecutorWithOptions(
    [
      new DynamicTool({
        name: "FOO",
        description:
          "call this to get the value of foo. input should be an empty string.",
        func: () => "baz",
      })
    ], // only tool we need for search

    // TODO: which props to specify?
    // https://js.langchain.com/docs/api/chat_models_openai/interfaces/OpenAIChatInput
    new ChatOpenAI({ modelName: MODEL_NAME }),
    {
      openAIApiKey: OPENAI_API_KEY,
      agentType: "openai-functions",
      verbose: true,
    }
  );
  return Chatbot;
}

module.exports = {
  getChatbot
};