const { createHash } = require('crypto');
const express = require('express');
const app = express();
const port = 80;

const verificationToken = "thisismyverificationtokenanditislongenough";
const endpoint = "https://TODO.com/challenge";

app.get('/challenge', (req, res) => {
  const challengeCode = req.query['challenge_code'];
  if (!challengeCode) {
    res.send("I am ignoring your request");
    return;
  }
  const hash = createHash('sha256');
  hash.update(challengeCode);
  hash.update(verificationToken);
  hash.update(endpoint);
  const responseHash = hash.digest('hex');
  const hashString = new Buffer.from(responseHash).toString();
  
  res.json({'challengeResponse': hashString});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
  
