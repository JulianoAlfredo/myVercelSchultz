const express = require('express');
const cors = require("cors");
const mysql = require('mysql2');
const { exec } = require('child_process');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const app = express();

// Usar CORS e JSON para lidar com requisições
app.use(cors());
app.use(express.json());



app.post('/api/redirect', (req, res) =>{

  /*{
  "username": "almeidajulianos",
  "user_id": 1530344706,
  "url": "https://manybot-files.s3.eu-central-1.amazonaws.com/1779020/wa/2024/11/12/original_ebfa34a2eaa5aa8ea22c2a0ddd9206bd.mp4"
} */
  const {user_id, username, url} = req.body
  try{

    axios.post("http://190.102.40.62:5000/compararVideo", {
      "username": username,
      "user_id": user_id,
      "url": url
    }).then(x =>{
      if(x){
        res.json("concluido")

      } else{
        res.json("erro")

      }
    })
  } catch(err){
    console.error(err)
  }
  
})


// Exportar o app
module.exports = app;

// Iniciar o servidor na porta desejada
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});