import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from "apollo-cache-inmemory"
import { gql } from 'apollo-boost'

const client  = new ApolloClient({
    link: new WebSocketLink({
        uri: 'wss://apollo-music-a.herokuapp.com/v1/graphql',
        options: {
            reconnect: true
        }
    }),
    cache: new InMemoryCache(),
    typeDefs: gql`
        type Song {
            id: uuid!,
            title: String!,
            artist: String!,
            thumbnail: String!,
            duration: Float!,
            url: String!
        }

        input SongInput {
            id: uuid!,
            title: String!,
            artist: String!,
            thumbnail: String!,
            duration: Float!,
            url: String!
        }

        type Query {
            queue: [Song!]
        }

        type Mutation {
            addOrRemoveFromQueue(input: SongInput!): [Song!]
        }
    `
})

const data = {
    queue: []
}

client.writeData({data})

export default client;