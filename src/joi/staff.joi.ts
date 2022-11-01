import Joi from "joi";

// Mubarak haruna mairiga sci16csc064
// Ogungbola Emmanuel O. Sci17csc110 input your code here
const changePswMutation: MutationResolvers = {
  changePassword: async (_, { input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { id: loginUserId, role } = user;

    // Authenticate user
    if (!user || loginUserId === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    const { password: pwd, new_password, id: userId } = input;

    // Form Validation
    const validate = changePswInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );
    
    const loginUserRole = role.toLowerCase();

    // Check if Email Already Exist
    const userExist = await prisma[loginUserRole].findUnique({
      where: { id: userId },
    });
    
    if (!userExist)
      throw new AuthenticationError("This user those not exist!");
    
     // Authorized Genuine Login User
    if (loginUserId !== userId)
      throw new AuthenticationError("Not authorized: not a genuine user!");

    // Change Password
    const hashPwd: string = userExist.password;

    // Validate current password with that of the database
    const isMatched = await validatePassword({ pwd, hashPwd });

    if (!isMatched) throw new AuthenticationError("Password doesn't matched!");

    // Hashed and Replaced New Password Input
    const hashNewPwd = await hashPassword(new_password);

    const newPassword = await prisma[loginUserRole].update({
      where: { id: loginUserId },
      data: { password: hashNewPwd },
    });

    return {
      status: newPassword ? 200 : 500,
      message: newPassword
        ? "Password changed sucessfully!"
        : "An error occurred!",
    } as ChangePswResponse;
  },
};

export default changePswMutation;


// Amode Oluwatamilore Sci17csc042 input your code below
const staffLogin: QueryResolvers = {
  loginStaff: async (_, { loginInput: input }, { prisma }) => {
    const { email, password: pwd } = input;

    // Validate Input field
    const validate = StaffLoginInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Verify User and it's Role
    const staff = await prisma.staff.findUnique({ where: { email } });
    if (!staff) throw new AuthenticationError("Staff doesn't exist!");
    if (staff.user !== "Staff")
      throw new AuthenticationError("Invalid user type!");

    // Verify Password
    const hashPwd = staff.password;
    const hasMatched = await validatePassword({ pwd, hashPwd });
    if (!hasMatched) throw new AuthenticationError("Invalid Password!");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: staff.id,
      email: staff.email,
      role: staff.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: staff.id,
      email: staff.email,
      role: staff.user,
    });

    // Remove Password field for security reasons
    Reflect.deleteProperty(staff, "password");

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    console.log(encryptAccessToken);

    return {
      status: 201,
      message: "Login successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      staff
    } as ReturnRegisteredStaff;
  },
};

export default staffLogin;


// Alfa ufedo Elijah SCI17CSC036 input your code here
const studentLogin: QueryResolvers = {
  loginStudent: async (_, { loginInput: input }, { prisma }) => {
    const { matricNo, password: pwd } = input;

    // Validate Input field
    const validate = StudentLoginInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Verify User and it's Role
    const student = await prisma.student.findUnique({ where: { matricNo } });
    if (!student) throw new AuthenticationError("Student doesn't exist!");
    if (student.user !== "Student")
      throw new AuthenticationError("Invalid user type!");

    // Verify Password
    const hashPwd = student.password;
    const hasMatched = await validatePassword({ pwd, hashPwd });
    if (!hasMatched) throw new AuthenticationError("Invalid Password!");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: student.id,
      email: student.email,
      role: student.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: student.id,
      email: student.email,
      role: student.user,
    });

    // Remove Password field for security reasons
    Reflect.deleteProperty(student, "password");

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    console.log(encryptAccessToken)

    return {
      status: 201,
      message: "Login successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      student,
    } as ReturnRegisteredStudent;
  },
};

export default studentLogin;


// Adeyemi Ayomide Adetumininu SCI17CSC018 input your code here
const staffMutations: MutationResolvers = {
  // CREATE STAFF USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  staff: async (_, { registerInput: input }, { prisma }) => {
    const { email, staffID } = input;
    // Validate Input field
    const validate = StaffInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist as Student and Staff
    const studentExist = await prisma.student.findUnique({
      where: { email },
    });

    if (studentExist)
      throw new AuthenticationError("User already existed!");

    const staffExist = await prisma.staff.findUnique({
      where: { email },
    });

    if (staffExist)
      throw new AuthenticationError("Staff already existed!");

    // Hashed and Replaced Password Input
    const hashPwd = await hashPassword(input.password);
    input.password = hashPwd;
    input.staffID = staffID.toUpperCase();

    // Create New staff User
    const staffData = {
      ...input,
      id: uuid(),
    };

    const newStaff = await prisma.staff.create({
      data: staffData,
    });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newStaff, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: newStaff.id,
      email: newStaff.email,
      role: newStaff.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: newStaff.id,
      email: newStaff.email,
      role: newStaff.user,
    });

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Created Staff successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      staff: newStaff,
    } as ReturnRegisteredStaff;
  },

  // UPDATE STAFF USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateStaff: async (_, { updateInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a staff or an Admin
    if (role !== 'Staff' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");

    const { firstName, lastName, phone, gender, avatar, email } = input;

    // Validate Input field
    const validate = UpdateStaffInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist
    const staffExist = await prisma.staff.findUnique({
      where: { email },
    });

    if (!staffExist) {
      throw new AuthenticationError("Staff doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    // Update staff User
    const updateStaffData = {
      firstName,
      lastName,
      phone,
      gender,
      avatar,
    };

    const updatedStaff = await prisma.staff.update({
      where: { email: loginUserEmail },
      data: updateStaffData,
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: updatedStaff.id,
      email: updatedStaff.email,
      role: updatedStaff.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: updatedStaff.id,
      email: updatedStaff.email,
      role: updatedStaff.user,
    });

    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Updated Staff successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      staff: updatedStaff,
    } as ReturnRegisteredStaff;
  },

  // DElETE STAFF USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteStaff: async (_, { emailInput }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Staff or an Admin
    if (role !== 'Staff' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");
    const { email } = emailInput;

    // Validate Input field
    const validate = DelStaffInputSchema.validate(emailInput);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid staff ID!"
      );

    // Check if staff Already Exist
    const staffExist = await prisma.staff.findUnique({
      where: { email },
    });

    if (!staffExist) {
      throw new AuthenticationError("Staff doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    // Delete Staff
    const deletedStaff = await prisma.staff.delete({
      where: { email: loginUserEmail },
    });
    const { id: deletedId, firstName, lastName, staffID, title } = deletedStaff;

    return {
      status: 200,
      message: "Deleted Staff successfully!",
      id: deletedId,
      firstName,
      lastName,
      title,
      staffID,
    } as DeletedStaff;
  },
};

export default staffMutations;


// Ibitayo Godsmiracle Sci17CSC082
const staffQueries: QueryResolvers = {
  staff: async (_, { id }, { loaders, auth, prisma }) => {
    const token = decryptToken(auth) as string;
    await replicateStaffAuth(token, id, prisma);
    const query = await loaders.staff.one(id);
    return query as Staff;
  },
  
  staffs: async (_, _args, { auth }) => {
    const token = decryptToken(auth) as string;
    replicateAdminAuth(token);
    const query = await getAllStaffs();
    return query as Array<Staff>;
  },
};

export default staffQueries;



// Yashim Gabriel SCI17CSC075
const studentMutations: MutationResolvers = {
  // CREATE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  student: async (_, { registerInput: input }, { prisma }) => {
    const { firstName, lastName, matricNo, email, password } = input;

    // Validate Input field
    const validate = StudentInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Student Already Exist
    const studentExist = await prisma.student.findFirst({
      where: { OR: [{ email }, { matricNo }] },
    });

    if (studentExist) throw new AuthenticationError("Student already existed!");

    // Hashed and Replaced Password Input
    const hashPwd = await hashPassword(password);
    input.password = hashPwd;
    input.firstName = titleCase(firstName);
    input.lastName = titleCase(lastName);
    input.email = email.toLowerCase();
    input.matricNo = matricNo.toUpperCase();

    // Create New Student User
    const studentData = {
      ...input,
      id: uuid(),
    };

    const newStudent = await prisma.student.create({
      data: {
        ...studentData,
      },
    });

    // Remove the password field for security reasons
    Reflect.deleteProperty(newStudent, "password");

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: newStudent.id,
      email: newStudent.email,
      role: newStudent.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: newStudent.id,
      email: newStudent.email,
      role: newStudent.user,
    });

    // Encrypt Refresh and Access Token
    const encryptAccessToken = encryptToken(accessToken);
    const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Created student successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      student: newStudent,
    } as ReturnRegisteredStudent;
  },

  // UPDATE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateStudent: async (_, { updateInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === "" || role === "")
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Student or an Admin
    if (role !== "Student" && role !== "Admin")
      throw new AuthenticationError("Not authorized!");

    const {
      email,
      firstName,
      lastName,
      phone,
      level,
      gender,
      avatar,
    } = input;

    // Validate Input field
    const validate = UpdateStudentInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if Email Already Exist as Student and Staff
    const staffExist = await prisma.staff.findUnique({
      where: { email },
    });

    if (staffExist)
      throw new AuthenticationError("User already existed!");

    const studentExist = await prisma.student.findUnique({
      where: { email },
    });

    if (!studentExist) {
      throw new AuthenticationError("Student doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    input.firstName = titleCase(firstName);
    input.lastName = titleCase(lastName);

    // Update Student User
    const data = {
      firstName,
      lastName,
      phone,
      level,
      gender,
      avatar,
    };

    const updatedStudent = await prisma.student.update({
      where: { email: loginUserEmail },
      data,
    });

    // Generate Access and Refreshed Token
    const accessToken = await signAccessJWToken({
      id: updatedStudent.id,
      email: updatedStudent.email,
      role: updatedStudent.user,
    });

    const refreshToken = await signRefreshJWToken({
      id: updatedStudent.id,
      email: updatedStudent.email,
      role: updatedStudent.user,
    });

     // Encrypt Refresh and Access Token
     const encryptAccessToken = encryptToken(accessToken);
     const encryptRefreshToken = encryptToken(refreshToken);

    return {
      status: 201,
      message: "Updated student successfully!",
      accessToken: encryptAccessToken,
      refreshToken: encryptRefreshToken,
      student: updatedStudent,
    } as ReturnRegisteredStudent;
  },

  // DElETE STUDENT USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteStudent: async (_, { emailInput }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === "" || role === "")
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Student or an Admin
    if (role !== "Student" && role !== "Admin")
      throw new AuthenticationError("Not authorized!");

    const { email } = emailInput;

    // Validate Input field
    const validate = DelStudentInputSchema.validate(emailInput);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid student ID!"
      );

    // Check if Student Already Exist
    const studentExist = await prisma.student.findUnique({
      where: { email },
    });

    if (!studentExist) {
      throw new AuthenticationError("Student doesn't exist!");
    }

    // Authorized Genuine Login User
    if (loginUserEmail !== email) {
      throw new AuthenticationError("Not authorized: not a genuine user!");
    }

    // Delete Student
    const deletedStudent = await prisma.student.delete({
      where: { email: loginUserEmail },
    });

    const { id: deletedId, firstName, lastName, matricNo } = deletedStudent;

    return {
      status: 200,
      message: "Deleted student successfully!",
      id: deletedId,
      firstName,
      lastName,
      matricNo,
    } as DeletedStudent;
  },
};

export default studentMutations;


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



// Sadiq suwaibah Ohunene SCI17CSC127
const blogPostMutations: MutationResolvers = {
  // CREATE BLOGPOST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  blogPost: async (_, { registerInput: input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be an Admin
    if (role !== 'Admin')
      throw new AuthenticationError("Not authorized!");

    const { title: tit } = input;

    // Validate Input field
    const validate = BlogPostInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    const title = titleCase(tit);

    // Check if BlogPost Title Already Exist
    const blogPostExist = await prisma.blogPost.findUnique({
      where: { title },
    });

    if (blogPostExist)
      throw new AuthenticationError(
        "BlogPost with this title already existed!"
      );

    // Create New BlogPost User
    const data = {
      ...input,
      id: uuid(),
    };

    const newBlogPost = await prisma.blogPost.create({ data });

    return {
      status: 201,
      message: "Created blog post successfully!",
      blogpost: newBlogPost,
    } as ReturnBlogPost;
  },

  // UPDATE BLOGPOST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  updateBlogPost: async (_, { input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Coordinator or an Admin
    if (role !== 'Admin')
      throw new AuthenticationError("Not authorized!");

    const { id, title: tit, content, image } = input;

    // Validate Input field
    const validate = BlogPostInputSchema.validate(input);
    const { error } = validate;
    const title = titleCase(tit);

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Validation Error!"
      );

    // Check if BlogPost Already Exist
    const blogPostExist = await prisma.blogPost.findFirst({
      where: { id },
    });

    if (!blogPostExist) {
      throw new AuthenticationError("BlogPost doesn't exist!");
    }

    // Update BlogPost User
    const data = { title, content, image };
    const updatedBlogPost = await prisma.blogPost.update({
      where: { id },
      data,
    });

    return {
      status: 201,
      message: "Updated blog post successfully!",
      blogpost: updatedBlogPost,
    } as ReturnBlogPost;
  },

  // DElETE BLOGPOST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  deleteBlogPost: async (_, { input }, { prisma, auth }) => {
    const token = decryptToken(auth) as string;
    const user = getUser(token);
    const { email: loginUserEmail, role } = user;

    // Authenticate user
    if (!user || loginUserEmail === '' || role === '')
      throw new AuthenticationError("User not authenticated!");

    // Authorize the user to be either a Coordinator or an Admin
    if (role !== 'Coordinator' && role !== 'Admin')
      throw new AuthenticationError("Not authorized!");
      
    const { id: blogID } = input;

    // Validate Input field
    const validate = DelBlogPostInputSchema.validate(input);
    const { error } = validate;

    if (error)
      throw new ValidationError(
        (error?.details?.map((err) => err.message) as unknown as string) ||
          "Error! Invalid blogPost ID!"
      );

    // Check if BlogPost Already Exist
    const blogPostExist = await prisma.blogPost.findUnique({
      where: { id: blogID },
    });

    if (!blogPostExist) {
      throw new AuthenticationError("Blog post doesn't exist!");
    }

    // Delete BlogPost
    const deletedBlogPost = await prisma.blogPost.delete({
      where: { id: blogID },
    });

    return {
      status: 200,
      message: "Deleted blog post successfully!",
      blogpost: deletedBlogPost,
    } as ReturnBlogPost;
  },
};

export default blogPostMutations;



// Usman Abdulmajid Yunusa SCI17CSC145
const blogPostQueries: QueryResolvers = {
  blog: async (_, { id }, { loaders }) => {
    const query = await loaders.blogPost.one(id);
    return query as Blog;
  },

  blogs: async () => {
    const query = await getAllBlogPosts();
    return query as Array<Blog>;
  },
};

export default blogPostQueries;



// Ibrahim Ummy Salma Ozavize SCI16CSC068
export const startApolloServer = async (app: Application) => {
  // Test Prisma Connection
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log("\x1b[32m%s\x1b[0m", "😎 Prisma connected to database");
  } catch (err) {
    console.log("\x1b[31m%s\x1b[0m", "😔 Prisma failed to connect database");
  }

  const { port } = envConfig;
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    validationRules: [depthLimit(5)]
  });
  

  // This middleware must come before ApplyMiddleware method below
  app.use(graphqlUploadExpress());

  await server.start();

  server.applyMiddleware({ app, path: "/api/graphql" });

  // Throw unhandled rejection to a fallback handler
  process.on("unhandledRejection", (reason: Error) => {
    console.log("\x1b[31m%s\x1b[0m", `Unhandled Rejection: ${reason}`);
    throw reason;
  });

  // Kill app if there's an uncaught exception
  process.on("uncaughtException", (error: Error) => {
    console.log("\x1b[31m%s\x1b[0m", `UncaughtException Error: ${error}`);
    process.exit(1);
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
  console.log(`🚀 HTTP Server ready at http://localhost:${port}`);
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};


// Enebe Joseph Atima SCI17CSC068
config();
const { cryptoSecretKey } = constant;

const simpleCrypto = new SimpleCrypto('9bb61363-7a59-4686-b9da-f9dbcdc6bea3');

export const encryptToken = (token: string): string => {
  const cipherText = simpleCrypto.encrypt(token);
  return cipherText;
};

export const decryptToken = (auth: string): PlainData => {
  if (!auth || auth === "")
    throw new AuthenticationError("Not authentication!");

  const bearer = auth.split(" ")[0];
  const cipherText = auth.split(" ")[1];

  if ((bearer !== "Bearer" && bearer !== "Token") || cipherText === "")
    throw new AuthenticationError("Not authentication!");

  const token = simpleCrypto.decrypt(cipherText);
  return token;
};




// Osaro Kessington Odigie SCI16CSC104
const generatedSalt = (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    bcryptjs.genSalt(12, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await generatedSalt();
  return new Promise<string>(async (resolve, reject) => {
    try {
      bcryptjs.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const validatePassword = async ({
  pwd,
  hashPwd,
}: IValPwd): Promise<boolean> => {
  const hasHashed = bcryptjs.compare(pwd, hashPwd);
  return hasHashed;
};



// Jimoh fatimah sci17csc090
export const StudentInputSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  matricNo: Joi.string().length(11).uppercase().alphanum().required(),
  phone: Joi.string().min(5),
  level: Joi.string().valid("L1", "L2", "L3", "L4", "L5"),
  gender: Joi.string().valid("Male", "Female"),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().min(30).regex(/[.jpg]$/).required(),
});

export const UpdateStudentInputSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(5),
  email: Joi.string().email().required(),
  level: Joi.string().valid("L1", "L2", "L3", "L4", "L5"),
  gender: Joi.string().valid("Male", "Female"),
  avatar: Joi.string().min(30).regex(/[.jpg]$/).required(),
});

export const DelStudentInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
});



// Mubarak haruna mairiga sci16csc064
export const StaffInputSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  staffID: Joi.string().length(11).alphanum().uppercase().required(),
  phone: Joi.string().min(5),
  title: Joi.string().valid("Prof", "Dr", "Mr", "Mrs", "Miss"),
  gender: Joi.string().valid("Male", "Female"),
  email: Joi.string().min(5).email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().min(30).regex(/[.jpg]$/),
});

export const UpdateStaffInputSchema = Joi.object({
  title: Joi.string().valid("Prof", "Dr", "Mr", "Mrs", "Miss"),
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(5),
  gender: Joi.string().valid("Male", "Female"),
  email: Joi.string().min(5).email().required(),
  avatar: Joi.string().min(30).regex(/[.jpg]$/),
});

export const DelStaffInputSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
});



