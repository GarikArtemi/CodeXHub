import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.post("/login",(req,res)=>{
  const token = jwt.sign({user:"demo"}, "secret");
  res.json({token});
});

app.get("/projects",(req,res)=>{
  res.json([{name:"project1"}]);
});

app.listen(4000,()=>console.log("API running on 4000"));
