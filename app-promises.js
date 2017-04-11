var express = require('express');
var app = express();
var findAll = require('./src/getReviews');
var findRecord = require('./src/getBooks');

app.get('/api/v1/reviews', function (request, response) {
  findAll().then(function(reviews) {
    response.json(reviews);
  }, function(error) {
    response.status(404).json(error);
  });
});

app.get('/api/v1/books/:id', function (request, response) {
  findRecord(request.params.id).then(function(book) {
    response.json({
      "book":{
        "id": book.id,
        "title" : book.title,
        "publisher": {
          "id": book.publisher_id,
          "name": book.name
      },
      "author": {
        "id": book.author_id,
        "first_name": book.first_name,
        "last_name": book.last_name
      }
    }
    });
  }, function(error) {
    response.status(404).json(error);

});
});
app.listen(8000);
