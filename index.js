const express = require('express')
const app = express()
const port = 3000
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

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

app.get("/movies/add", (req, res) => {
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
    const year_check= parseInt(year)
    if(title!=''&&year!=''&&year.length==4&&!isNaN(year_check)){
        if(rating==''){
            movies.push({ title: title, year: parseInt(year), rating: 4})
            res.send({ status: 200, data: movies});
        }
        else{
        movies.push({ title: title, year: parseInt(year), rating: parseInt(rating) })
        res.send({ status: 200, data: movies });}
    }
    else{
        res.send({status: 403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }
});

app.get('/movies/read', (req, res) => {
    
    const response={
        status:200, data: movies
    };
    res.send(response);
})
app.get('/movies/read/by-date', (req, res) => {
    var sorted_year=movies.sort(function(a, b) {
        var keyA = new Date(a.year),
          keyB = new Date(b.year);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      })
    const response={
        status:200, data: sorted_year
    };
    res.send(response);
})

app.get('/movies/read/by-rating', (req, res) => {
    var sorted_year=movies.sort(function(a, b) {
        var keyA = new Date(a.rating),
          keyB = new Date(b.rating);
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      })
    const response={
        status:200, data: sorted_year
    };
    res.send(response);
})

app.get('/movies/read/by-title', (req, res) => {
    var sorted_year=movies.sort(function(a,b) {
        if (a.title<b.title) return -1;
        if (a.title>b.title) return 1;
        return 0;
    });
    const response={
        status:200, data: sorted_year
    };
    res.send(response);
})

app.get('/movies/read/id/:id', (req, res) => {
    if (movies[req.params.id]==null){
        const response= {

        status:404, error:true, message:'the movie '+req.params.id+' does not exist'}

        res.status(404);
        res.send(response);
    }else{
    const response= {

        status:200, data:movies[req.params.id]}
    res.send(response);
    }
})

app.get('/movies/read/id', (req, res) => {
    const response= {

        status:404, error:true, message:"Please enter an id!"}

    res.status(404);
    res.send(response);})

app.get('/movies/update', (req, res) => {
    const response={
        status:200, message:"OK"
    };
    res.send(response);
})

app.get("/movies/delete/:id", (req, res) => {
    const { id } = req.params;
    if(id<=movies.length && id>=0)
    {
        movies.splice(id-1, 1);
        res.send({ status: 200, data: movies });
    }else {
        res.status(404).send({
        status: 404,
        error: true,
        message: `the movie ${req.params.id} does not exist`,})
    }
});

app.get("/movies/update/:id", (req, res) => {
    const { id } = req.params;
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
    if(title!=""){movies[id].title=title;}
    if(year!="" && year.length==4 && !isNaN(parseInt(year))){movies[id].year=parseInt(year);}
    if(rating!=""&& rating>0){movies[id].rating=parseInt(rating);}
    res.send({ status: 200, data: movies });
})

app.listen(port, () => {
  console.log('server listening on port http://localhost:${port}')
})