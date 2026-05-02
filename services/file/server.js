import express from "express";
import fs from "fs";

const app = express();
const BASE = "./workspace";

app.get("/files",(req,res)=>{
  if(!fs.existsSync(BASE)) fs.mkdirSync(BASE);
  res.json(fs.readdirSync(BASE));
});

app.listen(6000,()=>console.log("File service 6000"));
