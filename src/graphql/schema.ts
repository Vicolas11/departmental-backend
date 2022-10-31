import { typeDefs as scalarsTypeDefs } from "graphql-scalars";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import resolvers from "./resolvers/index.resolvers";
import { join } from "path";

const path = join(__dirname, './typedefs');
const typeDefsArray: string[] = loadFilesSync(`${path}/**/*.graphql`);
// Merge all the .graphql files into an Array
const typeDefs = mergeTypeDefs([...typeDefsArray, ...scalarsTypeDefs]);
const schema = makeExecutableSchema({ typeDefs, resolvers});
// console.log(schema)
export default schema;