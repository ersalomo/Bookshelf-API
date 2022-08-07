const {
  addBooksHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  getAllReadingBooks,
} = require('./handler');

const routes = [
  {
    method: '*', // means=>artinya route dapat diakses menggunakan seluruh method yang ada pada HTTP.
    path: '/{any*}',
    /**
     * ini berfungsi untuk menangani permintaan masuk pada
     * path yang belum Anda tentukan. Ini merupakan salah
     * satu teknik dalam menetapkan routing yang dinamis
     * menggunakan Hapi.
     */
    handler: (req, h) => {
      return 'Halaman tidak dapat ditemukan';
    },
  },
  // localhost:5000?name=harry&location=bali
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },

];

module.exports = routes;
