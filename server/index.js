
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { getChatbot } = require("./Chatbot");
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

// Our API can process both JSON and urlencoded body in the post request payload
// JSON comes from the app client while urlencoded comes from Postman since it's
// easier to add key-value pairs in Postman using the urlencoded format
app.use(express.json());
app.use(express.urlencoded());

app.get("/search.list", (req, res) => {
  const { userQuery } = req.body
  getChatbot().then((chatbot) => {
      chatbot.call({ input: userQuery }).then((response) => {
      res.json(["hi"]);
    });
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});