const express = require('express')
const { getDb, connectToDb } = require('./db')
const { getData ,getDataId ,addbook, deleteBook,updateBook } = require('./routes/books')

// init app & middleware
const app = express()

app.use(express.json())


// routes
//Get all books
app.get('/books', getData)

// Get a single book with id
app.get('/books/:id', getDataId)

//Add book to datebase
app.post('/books', addbook)

//Delete a book from the database
app.delete('/books/:id',deleteBook)

//Update a book from the database
app.patch('/books/:id', updateBook)


connectToDb((err) => {
  if(!err){
    app.listen('3000', () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})

