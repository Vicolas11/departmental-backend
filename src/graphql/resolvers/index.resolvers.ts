import { resolvers as scalarResolvers } from "graphql-scalars";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import blogPostMutations from "./blogpost/mutations";
import studentMutations from "./student/mutations";
import changePswMutation from "./changepassword";
import blogPostQueries from "./blogpost/queries";
import staffMutations from "./staff/mutations";
import studentQueries from "./student/queries";
import uploadFileMutation from "./uploadfile";
import studentLogin from "./login/student";
import staffQueries from "./staff/queries";
import { Resolvers } from "../generated";
import staffLogin from "./login/staff";
import adminLogin from "./login/admin";

const resolvers: Resolvers = {
  ...scalarResolvers,
  Query: {
    ...studentQueries,
    ...blogPostQueries,
    ...studentLogin,
    ...staffQueries,
    ...adminLogin,
    ...staffLogin,
  },
  Upload: GraphQLUpload,
  Mutation: {
    ...changePswMutation,
    ...uploadFileMutation,
    ...studentMutations,
    ...staffMutations,
    ...blogPostMutations,
  },
};

export default resolvers;
