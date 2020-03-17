import React, {
	Component
} from 'react';
import Button from '../../components/Button';
import Jumbotron from '../../components/Jumbotron';
import {
	Col,
	Row,
	Container
} from '../../components/Gird';
import {
	List,
	ListItem
} from '../../components/List';
import {
	Input,
	FormButton
} from '../../components/Form';

import API from '../../utils/API';
import {
	Link
} from 'react-router-dom';

class Books extends Component {
	state = {
		books: [],
		title: '',
		author: ''
	};

	componentDidMount() {
		this.loadBooks();
	}

	loadBooks = () => {
		API.getBooks()
			.then(res => this.setState({
				books: res.data,
				title: '',
				author: ''
			}))
			.catch(err => console.log(err))
	};

	deleteBook = id => {
		API.deleteBook(id)
			.then(res => this.loadBooks())
			.catch(err => console.log(err))
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.title && this.state.author) {
			API.saveBook({
				title: this.state.title,
				author: this.state.author
			})
				.then(res => this.loadBooks())
				.catch(err => console.log(err))
		}
	}

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-6">
						<Jumbotron>
							<h1>What Books Should I Read?</h1>
						</Jumbotron>
						<form>
							<Input
								value={this.state.title}
								onChange={this.handleInputChange}
								name="title"
								placeholder="Title (required)"
							/>
							<Input
								value={this.state.author}
								onChange={this.handleInputChange}
								name="author"
								placeholder="Author (required)"
							/>
							<FormButton
								disabled={!(this.state.author && this.state.title)}
								onClick={this.handleFormSubmit}
							>
								Submit Book
						</FormButton>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>Books On My List</h1>
						</Jumbotron>
						{this.state.books.length ? (
							<List>
								{this.state.books.map(book => (
									<ListItem key={book._id}>
										<Link to={'/books/' + book._id}>
											<strong>{book.title} by {book.author}</strong>
										</Link>
										<Button onClick={()=>this.deleteBook(book._id)} />
									</ListItem>
								))}
							</List>
						) : (
								<h3>No result to display.</h3>
						)}
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Books;