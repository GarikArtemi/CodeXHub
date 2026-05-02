import { WebSocketServer } from "ws";
import pty from "node-pty";

const wss = new WebSocketServer({ port: 5000 });

wss.on("connection",(ws)=>{
  const shell = pty.spawn("bash",[],{
    name:"xterm-color",
    cols:80,
    rows:24
  });

  shell.on("data",(data)=>ws.send(data));
  ws.on("message",(msg)=>shell.write(msg.toString()));
});
