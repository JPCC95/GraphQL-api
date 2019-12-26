const {GraphQLServer} = require('graphql-yoga');
const resolvers = require('./schemas/resolvers');
const mongoose = require('mongoose');
require('dotenv/config')

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => {
    console.log('Connected to MongoDB!')
});

//New GraphQL Server
const server = new GraphQLServer({
    typeDefs: './src/schemas/schema.graphql',
    resolvers
})

//Run server
const port = process.env.PORT || 4000;

server.start(port, () => console.log(`Server running on port ${port}`));