//import { listenerCount } from "cluster";
const listenerCount = require("cluster");

require('dotenv').config();

const server = require("./server");
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\n*** Amarachi! Server running on http://localhost:${port} ***\n`);
});