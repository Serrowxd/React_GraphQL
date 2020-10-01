const { PrismaClient } = require("@prisma/client");
const { GraphQLServer } = require("graphql-yoga");
const { PubSub } = require("graphql-yoga");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const pubsub = new PubSub();

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (requests) => {
    return {
      ...requests,
      prisma,
      pubsub,
    };
  },
});

server.start(() => {
  console.log(`Server is running on http://localhost:4000`);
});
