"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
async function init() {
    const app = (0, express_1.default)();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express_1.default.json());
    // create GrapQl Server
    const gqlServer = new server_1.ApolloServer({
        typeDefs: `
     type Query{
        hello: String
        say(name: String):String
     }
     `, // schema
        resolvers: {
            Query: {
                hello: () => `Hey I am a GraphQl Server`,
                say: (_, { name }) => `Hey ${name}, How are you`
            }
        }, //Actual function
    });
    // start the gqlServer
    await gqlServer.start();
    app.get('/', (req, res) => {
        res.json({ Message: "server is up and running" });
    });
    app.use('/graphql', (0, express5_1.expressMiddleware)(gqlServer));
    app.listen(PORT, () => {
        console.log(`server started at port : ${PORT}`);
    });
}
init();
//# sourceMappingURL=index.js.map