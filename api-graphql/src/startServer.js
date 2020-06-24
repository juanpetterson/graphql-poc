import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

function startServer({ typeDefs, resolvers }) {
  mongoose.connect(process.env.DB_URL),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => console.log(`🔥 Server started at ${url}`));
}

export default startServer;
