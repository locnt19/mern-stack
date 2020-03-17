import axios from 'axios';

export default {
	// Get all books
	getBooks: function () {
		return axios.get('/api/books');
	},
	// Get the book with the given id
	getBook: function (id) {
		return axios.get('/api/books/' + id)
	},
	// Deletes the book with the given id
	deleteBook: function (id) {
		return axios.delete('/api/books/' + id)
	},
	// Save a book to the database
	saveBook: function (bookData) {
		return axios.post('/api/books', bookData);
	}
};