import { replicateAdminAuth, replicateStudAuth } from "../../../utils/replacate.utils";
import { decryptToken } from "../../../utils/crypto.utils";
import { QueryResolvers, Student } from "../../generated";
import { getAllStudents } from "../../data/studentData";

// Arungbemi Comfort Oluwaseyi SCI17CSC046

// Arungbemi Comfort Oluwaseyi SCI17CSC046
const studentQueries: QueryResolvers = {
    // Get student by LoginUserId
    student: async (_, { id }, { loaders, auth, prisma }) => {
      const token = decryptToken(auth) as string;
      await replicateStudAuth(token, id, prisma);
      const query = await loaders.student.one(id);
      return query as Student;
    },
    // Get All Students
    students: async (_, _args, { auth }) => {
      const token = decryptToken(auth) as string;
      replicateAdminAuth(token);
      const query = await getAllStudents();
      return query as Array<Student>;
    },
  };
  
  export default studentQueries;
  
  
