import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.write('epa');
    return res.end();
})

server.listen(3333);