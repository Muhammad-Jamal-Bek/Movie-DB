const express = require('express')
const app = express()
const port = 3000

app.get('/test', (req, res) => {
    const response={
        status:200, message:"OK"
    };
    res.send(response)
})

app.get('/time', (req, res) => {
    var date= new Date()
    const response={
        status:200, message: date.getHours()+":"+date.getMinutes()
    };
    res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
