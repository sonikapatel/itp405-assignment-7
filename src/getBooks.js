var mysql = require('mysql');

function findRecord(id) {
  return new Promise(function (resolve, reject) {
    var connection = mysql.createConnection({
      host: 'itp460.usc.edu',
      user: 'student',
      password: 'ttrojan',
      database: 'itp405-midterm'
    });

    connection.connect();
    connection.query('SELECT books.id, author_id, publisher_id, title, publishers.id, publishers.name, authors.id, first_name, last_name FROM books, authors, publishers WHERE books.author_id = authors.id and books.publisher_id = publishers.id AND books.id = ?',[id], function (error, books) {
      if (error) {
        reject();
      } else {
        if(books.length ===0){
          reject({
              error:{
                "message":"Book not found"
              }
          })
        }else{
          resolve(books[0]);
        }
        }

    });
  });
}

module.exports = findRecord;
