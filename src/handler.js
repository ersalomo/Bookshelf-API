const { nanoid } = require('nanoid');
const { books } = require('./books');

const addBooksHandler = (req, h) => {
  const { 
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  
  const id = nanoid(16)
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400)
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400)
    return response;
  }
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  }
  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
        
      },
    }).code(201)
    return response
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500)
  return response
}
const getAllBooksHandler = (req, h) => {
  const { reading, finished, name } = req.query
  
  if (reading !== undefined) {
    const isReading = Number(reading) === 1
    const result = books.filter((book) => {
      return book.reading === isReading
    })
    return h.response({
      status: 'success',
      data: { 
        books: result.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200)
  }

  if (finished !== undefined) {
    const isFinish = Number(finished) === 1
    const result = books.filter((book) => {
      return book.finished === isFinish
    })
    return h.response({
      status: 'success',
      data: {
        books: result.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200)
  }

  if (name !== undefined) {
    const re = new RegExp((name), 'gi') // masih terdapat kekurangan, Myself needs to study some stuff
    const hasil = books.filter((book) => {
      return re.test(book.name)
    })
    return h.response({
      status: 'success',
      data: {
        books: hasil.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200)
  }
  return {
    status: 'success',
    data: {
      books: books.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  }
}
const getBookByIdHandler = (req, h) => {
  const { id } = req.params;
  
  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
  return response;
}
const editBookByIdHandler = (req, h) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === id)

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400)
    return response
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200)
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',

  }).code(404);
  return response;
}
const deleteBookByIdHandler = (req, h) => {
  const { bookId } = req.params
  const index = books.findIndex((book) => book.id === bookId)
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404)
  return response;
}

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
