const { getDb } = require('../db')
const { ObjectId } = require('mongodb')




module.exports = {
  
  getData: (req, res) => {
    const db = getDb()

    // current page
    const page = req.query.p || 0
    const booksPerPage = 3
    
    let books = []
  
    db.collection('books')
      .find()
      .sort({name: 1})
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .forEach(book => books.push(book))
      .then(() => {
        res.status(200).json(books)
      })
      .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
      })
  },

  getDataId: (req, res) => {

    const db = getDb()

    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
          res.status(200).json(doc)
        })
        .catch(err => {
          res.status(500).json({error: 'Could not fetch the document'})
        })
        
    } else {
      res.status(500).json({error: 'Could not fetch the document'})

        
      }

  },

  addbook: (req, res) => {

    const db = getDb()

    const book = req.body

    db.collection('books')
      .insertOne(book)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({err: 'Could not create new document'})
      })
  },

  deleteBook:  (req, res) => {
    const db = getDb()


    if (ObjectId.isValid(req.params.id)) {
  
    db.collection('books')
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not delete document'})
      })
  
    } else {
      res.status(500).json({error: 'Could not delete document'})
    }
  },
  
  updateBook:  (req, res) => {
    const db = getDb()

    const updates = req.body
  
    if (ObjectId.isValid(req.params.id)) {
  
      db.collection('books')
        .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json({error: 'Could not update document'})
        })
  
    } else {
      res.status(500).json({error: 'Could not update document'})
    }
  }

}






