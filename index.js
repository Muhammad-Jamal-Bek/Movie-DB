const express = require('express')
const app = express()
const port = 3000

app.get('/test', (req, res) => {
    const response={
        status:200, message:"OK"
    };
    res.send(response);
})

app.get('/time', (req, res) => {
    var date= new Date()
    const response={
        status:200, message: date.getHours()+":"+date.getMinutes()
    };
    res.send(response);
})

app.get('/hello', (req, res) => {
    const response={
        status:200, message: "Hello!"
    };
    res.send(response);
})

app.get('/hello/:id', (req, res) => {
    const response={
        status:200, message: "Hello "+req.params.id+"!"
    };
    res.send(response);
})
app.get('/search', (req, res) => {
    if (req.query.s!=null)
    {
    const response= {

        status:200, message:"ok ",data:req.query.s
    };
    res.send(response);
}
else {
    const response= {
    status:500, error:true, message:"you have to provide a search"
};

res.send(response);
}
})
app.listen(port, () => {
  console.log('server listening on port http://localhost:${port}')
})