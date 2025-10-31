import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';


async function init() {
    
const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

// create GrapQl Server
const gqlServer = new ApolloServer({
     typeDefs:`
     type Query{
        hello: String
        say(name: String):String
     }
     `,// schema
  resolvers:{
    Query:{
        hello:()=>`Hey I am a GraphQl Server`,
        say:(_,{name}:{name:string})=>`Hey ${name}, How are you`
    }
  },//Actual function
})
// start the gqlServer
await gqlServer.start()

app.get('/', (req ,res)=>{
    res.json({Message: "server is up and running"})
})

app.use('/graphql', expressMiddleware(gqlServer))

app.listen(PORT, ()=>{
    console.log(`server started at port : ${PORT}`);
})

}

init();