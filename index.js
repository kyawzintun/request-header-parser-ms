const express = require('express');
const app = express();
const cors = require('cors')
const useragent = require('useragent');
useragent(true);
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  let header = req.headers;
  let agent = useragent.parse(header['user-agent']);
  let obj = {
    "ipaddress": header.host,
    "language": getParsedAcceptLangs(header["accept-language"]),
    "software": agent.os.toString()
  };
  res.send(obj);
});

function getParsedAcceptLangs(hdr) {
  var pairs = hdr.split(',');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split(';');
    if (pair.length == 1) return pair[0];
  }
}

app.listen(port, function () {
  console.log('Node app is running on port', port);
});