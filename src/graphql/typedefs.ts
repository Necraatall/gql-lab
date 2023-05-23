import { gql } from "apollo-server-express";
import { User } from "./User";
import { Character } from "./Character";

const typeDefs = gql`
  ${User.types}
  ${Character.types}
  
  type Query {
    ${User.queries}
    ${Character.queries}
  }
  
  type Mutation {
    ${User.mutations}
  }


`;

export default typeDefs;