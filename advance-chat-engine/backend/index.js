const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "407b5fdc-203f-4a97-b82d-5a4fdf41c52e" } }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
  }
  return res.json({ username: username, secret: "sha256..." });
});

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
