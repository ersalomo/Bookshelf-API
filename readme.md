{
 id: string,
 title: string,
 createdAt: string,
 updatedAt: string,
 tags: array of string,
 body: string,
},

{
 id: 'notes-V1StGXR8_Z5jdHi6B-myT',
 title: 'Sejarah JavaScript',
 createdAt: '2020-12-23T23:00:09.686Z',
 updatedAt: '2020-12-23T23:00:09.686Z',
 tags: ['NodeJS', 'JavaScript'],
 body: 'JavaScript pertama kali dikembangkan oleh Brendan Eich dari Netscape di bawah nama Mocha, yang nantinya namanya diganti menjadi LiveScript, dan akhirnya menjadi JavaScript. Navigator sebelumnya telah mendukung Java untuk lebih bisa dimanfaatkan para pemrogram yang non-Java.',
},

{
  "status": "success",
  "message": "Catatan berhasil ditambahkan",
  "data": {
    "noteId": "V09YExygSUYogwWJ"
  }
}

{
  "status": "error",
  "message": "Catatan gagal untuk ditambahkan"
}
<!-- ketika id tidak ditemukan -->
{
  "status": "fail",
  "message": "Catatan tidak ditemukan"
}

<!-- update, id not found -->
{
  "status": "fail",
  "message": "Gagal memperbarui catatan. Id catatan tidak ditemukan"
}

"scripts": {
  "start": "nodemon ./src/server.js",
  "lint": "eslint ./src"
},

// "nanoid": "^4.0.0",


 "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean

    id
    finieshed
    insertedAt
    updatedAt