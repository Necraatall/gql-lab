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
		cowriters: [String]
	}

	type Author_Inner {
		name:String,
		pseudonyms: [String!]!,
		borned: String,
		died: String
	}

	type Author {
		author: Author_Inner
		titles: [Book]
	}

	type Query {
		GetAuthors: [Author!]!
		GetAuthor(name: String): Author_Inner!
		GetBooks(name: String): [Book!]!
		GetBook(name: String): [Book!]!
	}

`;
// pole objektu s knizky a ten ma predpis jako ISBN
const authors = [
	{
		author:
		{
			name: 'Brian W. Aldis',
			pseudonyms: ['Brian W. Aldis'],
			borned: '15.03.1956',
			died: '16.05.1986',
		},
		titles: [
			{
				name: 'Nonstop',
				published: '16.1.1965',
				cowriters: [''],
			},
			{
				name: 'Helikonie I',
				published: '16.1.1960',
				cowriters: [''],
			},

		],
	},
	{
		author:
		{
			name: 'J. R. R. Tolkien',
			pseudonyms: ['Tolkien'],
			borned: '15.03.1916',
			died: '16.05.1986',
		},
		titles: [
			{
				name: 'Pan prstenu',
				published: '16.2.1930',
				cowriters: [''],
			},
			{
				name: 'Silmarilion',
				published: '16.11.1945',
				cowriters: [''],
			},

		],
	},
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		GetAuthors: () => authors,
		GetBooks: () => {
			const books = authors.map(author => author.titles).flat().sort(compareStrings)
			return books
		},
		GetBook: (parent, args, contextValue, info) => {
			const nameFilter = args.name
			let books = authors.map(author => author.titles).flat().sort(compareStrings)
			if (nameFilter !== undefined || nameFilter !== null) {
				books = books.filter(book => book.name === nameFilter)
			}
			return books
		},

		GetAuthor: (parent, args, contextValue, info) => {
			const authorFilter = args.name
			let filteredAuthor = null
			if (authorFilter) {
				filteredAuthor = authors.find(author => author.author.name === authorFilter)?.author || null
			}
			return filteredAuthor
		}

	},
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function compareStrings(a: any, b: any) {
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