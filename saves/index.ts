/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';



// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
	type Book {
		name: String
		published: String
	}

	type Author {
		author: String
		titles: [Book]
	}

	union SearchResult = Book | Author

	type Query {
		GetAuthors: [Author!]!
		GetBooks(name: String): [SearchResult!]!
	}


`;
// pole objektu s knizky a ten ma predpis jako ISBN
const authors = [
	{
		author: 'Brian W. Aldis',
		titles: [
			{
				name: 'Nonstop',
				published: '16.1.1965',
			},
			{
				name: 'Helikonie I',
				published: '16.1.1960',
			},

		],
	},
	{
		author: 'Tolkien',
		titles: [
			{
				name: 'Pan prstenu',
				published: '16.2.1930',
			},
			{
				name: 'Silmarilion',
				published: '16.11.1945',
			},

		],
	},
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

const resolvers = {
	Query: {
		GetAuthors: () => authors,
		GetBooks: (parent, args, contextValue, info) => {
			const nameFilter = args.name
			let books = authors.map(author => author.titles).flat().sort(compareBooks)
			if (nameFilter !== undefined || nameFilter !== null) {
				books = books.filter(book => book.name === nameFilter)
			}
			// Wrap each book in a SearchResult object
			const searchResults = books.map(book => ({ __typename: 'Book', ...book }))
			return searchResults
		}
	},
};

function compareBooks(a: any, b: any) {
	if (a.name < b.name) {
		return -1
	}
	else if (b.name < a.name) {
		return 1
	}
	return 0
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);