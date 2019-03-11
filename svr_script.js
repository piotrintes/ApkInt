const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    if (req.url == "/style.css") {
        fs.readFile('./style.css',(err,d)=>{
            res.write(d);
            res.end();
        });
    } else if (req.url == "/") {
        res.setHeader('Content-Type', 'text/plain');
        console.log(req.url);
        res.end('Hello World\n');
    } else {
        var d;
        var str = "./index.htm";
        fs.readFile(str,(err,d)=>{
            res.write(d);
            res.end('Zapytano o '+req.url+"\n\n");
        });
    }
    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
