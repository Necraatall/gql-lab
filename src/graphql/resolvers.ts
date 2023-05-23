import { User } from './User'
import { Character } from './Character'

const resolvers = {
    Query: {
        ...User.resolvers.queries,
        ...Character.resolvers.queries,
    },
    Mutation: {
        ...User.resolvers.mutations,
    }
};

export default resolvers;