import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IContext } from '../interfaces/context.interface';
import { ReadStream } from 'fs';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
interface GraphQLFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream( options?:{ encoding?: string, highWaterMark?: number } ): ReadStream;
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Banking account number is a string of 5 to 17 alphanumeric values for representing an generic account number */
  AccountNumber: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: bigint;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: Buffer | string;
  /** A country code as defined by ISO 3166-1 alpha-2 */
  CountryCode: string;
  /** A field whose value conforms to the standard cuid format as specified in https://github.com/ericelliott/cuid#broken-down */
  Cuid: string;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: string;
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: string;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: Date | string;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: string;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: string;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: string;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: string;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: string;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: string;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: string;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: string;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: string;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: string;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: string;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: Record<string, any>;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: string;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: string;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: string;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: string;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: string;
  /** The locale in the format of a BCP 47 (RFC 5646) standard string */
  Locale: string;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: bigint;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: string | number;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: string;
  /** Floats that will have a value less than 0. */
  NegativeFloat: number;
  /** Integers that will have a value less than 0. */
  NegativeInt: number;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: string;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: number;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: number;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: number;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: string;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: string;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: string | number;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: number;
  /** Integers that will have a value greater than 0. */
  PositiveInt: number;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: string;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: string;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: string;
  /** In the US, an ABA routing transit number (`ABA RTN`) is a nine-digit code to identify the financial institution. */
  RoutingNumber: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: number;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: Date | string;
  /** A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones */
  TimeZone: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: Date | string | number;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
  /** A currency string, such as $21.25 */
  USCurrency: string;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: string;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: number;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: Promise<GraphQLFileUpload>;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: string;
  /** Represents NULL values */
  Void: void;
};

export type Admin = {
  __typename?: 'Admin';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  joinedDate?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type AdminInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type AdminLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Blog = {
  __typename?: 'Blog';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type BlogPostInput = {
  content: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type ChangePswInput = {
  con_password: Scalars['String'];
  id: Scalars['ID'];
  new_password: Scalars['String'];
  password: Scalars['String'];
};

export type ChangePswResponse = {
  __typename?: 'ChangePswResponse';
  message: Scalars['String'];
  status: Scalars['Int'];
};

export type DeleteAdminInput = {
  email: Scalars['String'];
};

export type DeleteBlogPostInput = {
  id: Scalars['ID'];
};

export type DeleteStaffInput = {
  email: Scalars['String'];
};

export type DeleteStudentInput = {
  email: Scalars['String'];
};

export type DeletedAdmin = {
  __typename?: 'DeletedAdmin';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export type DeletedStaff = {
  __typename?: 'DeletedStaff';
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  staffID?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  title?: Maybe<Title>;
};

export type DeletedStudent = {
  __typename?: 'DeletedStudent';
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  matricNo?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export enum FileDir {
  Avatar = 'avatar',
  Blogposts = 'blogposts'
}

export type FileInput = {
  file?: InputMaybe<Scalars['Upload']>;
  type: FileDir;
};

export type FileUpdateInput = {
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['ID'];
  type: FileDir;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export type JwtBox = {
  __typename?: 'JWTBox';
  value?: Maybe<Scalars['JWT']>;
};

export type JwToken = JwtBox | StringBox;

export enum Level {
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  L4 = 'L4',
  L5 = 'L5'
}

export type Mutation = {
  __typename?: 'Mutation';
  admin?: Maybe<ReturnRegisteredAdmin>;
  blogPost?: Maybe<ReturnBlogPost>;
  changePassword?: Maybe<ChangePswResponse>;
  deleteAdmin?: Maybe<DeletedAdmin>;
  deleteBlogPost?: Maybe<ReturnBlogPost>;
  deleteFile?: Maybe<UploadResponse>;
  deleteStaff?: Maybe<DeletedStaff>;
  deleteStudent?: Maybe<DeletedStudent>;
  staff?: Maybe<ReturnRegisteredStaff>;
  student?: Maybe<ReturnRegisteredStudent>;
  updateAdmin?: Maybe<ReturnRegisteredAdmin>;
  updateBlogPost?: Maybe<ReturnBlogPost>;
  updateFile?: Maybe<UploadResponse>;
  updateStaff?: Maybe<ReturnRegisteredStaff>;
  updateStudent?: Maybe<ReturnRegisteredStudent>;
  uploadFile?: Maybe<UploadResponse>;
};


export type MutationAdminArgs = {
  registerInput: AdminInput;
};


export type MutationBlogPostArgs = {
  registerInput: BlogPostInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePswInput;
};


export type MutationDeleteAdminArgs = {
  emailInput: DeleteAdminInput;
};


export type MutationDeleteBlogPostArgs = {
  input: DeleteBlogPostInput;
};


export type MutationDeleteFileArgs = {
  deleteInput: Scalars['ID'];
};


export type MutationDeleteStaffArgs = {
  emailInput: DeleteStaffInput;
};


export type MutationDeleteStudentArgs = {
  emailInput: DeleteStudentInput;
};


export type MutationStaffArgs = {
  registerInput: StaffInput;
};


export type MutationStudentArgs = {
  registerInput: StudentInput;
};


export type MutationUpdateAdminArgs = {
  updateInput: UpdateAdminInput;
};


export type MutationUpdateBlogPostArgs = {
  input: UpdateBlogPostInput;
};


export type MutationUpdateFileArgs = {
  updateInput: FileUpdateInput;
};


export type MutationUpdateStaffArgs = {
  updateInput: UpdateStaffInput;
};


export type MutationUpdateStudentArgs = {
  updateInput: UpdateStudentInput;
};


export type MutationUploadFileArgs = {
  input: FileInput;
};

export type Query = {
  __typename?: 'Query';
  blog?: Maybe<Blog>;
  blogs?: Maybe<Array<Maybe<Blog>>>;
  loginAdmin?: Maybe<ReturnRegisteredAdmin>;
  loginStaff?: Maybe<ReturnRegisteredStaff>;
  loginStudent?: Maybe<ReturnRegisteredStudent>;
  staff?: Maybe<Staff>;
  staffs?: Maybe<Array<Maybe<Staff>>>;
  student?: Maybe<Student>;
  students?: Maybe<Array<Maybe<Student>>>;
};


export type QueryBlogArgs = {
  id: Scalars['ID'];
};


export type QueryLoginAdminArgs = {
  loginInput: AdminLoginInput;
};


export type QueryLoginStaffArgs = {
  loginInput: StaffLoginInput;
};


export type QueryLoginStudentArgs = {
  loginInput: StudentLoginInput;
};


export type QueryStaffArgs = {
  id: Scalars['ID'];
};


export type QueryStudentArgs = {
  id: Scalars['ID'];
};

export type RegisteredAdmin = {
  __typename?: 'RegisteredAdmin';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type RegisteredStaff = {
  __typename?: 'RegisteredStaff';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  staffID?: Maybe<Scalars['String']>;
  title?: Maybe<Title>;
  user?: Maybe<User>;
};

export type RegisteredStudent = {
  __typename?: 'RegisteredStudent';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  level?: Maybe<Level>;
  matricNo?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ReturnBlogPost = {
  __typename?: 'ReturnBlogPost';
  blogpost?: Maybe<BlogPost>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

export type ReturnRegisteredAdmin = Token & {
  __typename?: 'ReturnRegisteredAdmin';
  accessToken: Scalars['String'];
  admin: RegisteredAdmin;
  refreshToken: Scalars['String'];
};

export type ReturnRegisteredStaff = Token & {
  __typename?: 'ReturnRegisteredStaff';
  accessToken: Scalars['String'];
  message: Scalars['String'];
  refreshToken: Scalars['String'];
  staff: RegisteredStaff;
  status: Scalars['Int'];
};

export type ReturnRegisteredStudent = Token & {
  __typename?: 'ReturnRegisteredStudent';
  accessToken: Scalars['String'];
  message: Scalars['String'];
  refreshToken: Scalars['String'];
  status: Scalars['Int'];
  student: RegisteredStudent;
};

export type Staff = {
  __typename?: 'Staff';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  joinedDate?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  staffID?: Maybe<Scalars['String']>;
  title?: Maybe<Title>;
  user: User;
};

export type StaffInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  staffID: Scalars['String'];
  title: Title;
};

export type StaffLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type StringBox = {
  __typename?: 'StringBox';
  value?: Maybe<Scalars['String']>;
};

export type Student = {
  __typename?: 'Student';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  joinedDate?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  level?: Maybe<Level>;
  matricNo?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  user: User;
};

export type StudentInput = {
  avatar: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  lastName: Scalars['String'];
  level?: InputMaybe<Level>;
  matricNo: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type StudentLoginInput = {
  matricNo: Scalars['String'];
  password: Scalars['String'];
};

export enum Title {
  Dr = 'Dr',
  Miss = 'Miss',
  Mr = 'Mr',
  Mrs = 'Mrs',
  Prof = 'Prof'
}

export type Token = {
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UpdateAdminInput = {
  avatar?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UpdateBlogPostInput = {
  content: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateStaffInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  lastName: Scalars['String'];
  phone: Scalars['String'];
  title: Title;
};

export type UpdateStudentInput = {
  avatar: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: InputMaybe<Gender>;
  lastName: Scalars['String'];
  level?: InputMaybe<Level>;
  phone: Scalars['String'];
};

export type UploadResponse = {
  __typename?: 'UploadResponse';
  imageUrl: Scalars['String'];
  message: Scalars['String'];
  status: Scalars['Int'];
};

export enum User {
  Admin = 'Admin',
  Staff = 'Staff',
  Student = 'Student'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']>;
  Admin: ResolverTypeWrapper<Admin>;
  AdminInput: AdminInput;
  AdminLoginInput: AdminLoginInput;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Blog: ResolverTypeWrapper<Blog>;
  BlogPost: ResolverTypeWrapper<BlogPost>;
  BlogPostInput: BlogPostInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  ChangePswInput: ChangePswInput;
  ChangePswResponse: ResolverTypeWrapper<ChangePswResponse>;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']>;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteAdminInput: DeleteAdminInput;
  DeleteBlogPostInput: DeleteBlogPostInput;
  DeleteStaffInput: DeleteStaffInput;
  DeleteStudentInput: DeleteStudentInput;
  DeletedAdmin: ResolverTypeWrapper<DeletedAdmin>;
  DeletedStaff: ResolverTypeWrapper<DeletedStaff>;
  DeletedStudent: ResolverTypeWrapper<DeletedStudent>;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  FileDir: FileDir;
  FileInput: FileInput;
  FileUpdateInput: FileUpdateInput;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  Gender: Gender;
  HSL: ResolverTypeWrapper<Scalars['HSL']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  JWTBox: ResolverTypeWrapper<JwtBox>;
  JWToken: ResolversTypes['JWTBox'] | ResolversTypes['StringBox'];
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  Level: Level;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']>;
  Locale: ResolverTypeWrapper<Scalars['Locale']>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Port: ResolverTypeWrapper<Scalars['Port']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']>;
  RegisteredAdmin: ResolverTypeWrapper<RegisteredAdmin>;
  RegisteredStaff: ResolverTypeWrapper<RegisteredStaff>;
  RegisteredStudent: ResolverTypeWrapper<RegisteredStudent>;
  ReturnBlogPost: ResolverTypeWrapper<ReturnBlogPost>;
  ReturnRegisteredAdmin: ResolverTypeWrapper<ReturnRegisteredAdmin>;
  ReturnRegisteredStaff: ResolverTypeWrapper<ReturnRegisteredStaff>;
  ReturnRegisteredStudent: ResolverTypeWrapper<ReturnRegisteredStudent>;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  Staff: ResolverTypeWrapper<Staff>;
  StaffInput: StaffInput;
  StaffLoginInput: StaffLoginInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringBox: ResolverTypeWrapper<StringBox>;
  Student: ResolverTypeWrapper<Student>;
  StudentInput: StudentInput;
  StudentLoginInput: StudentLoginInput;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  Title: Title;
  Token: ResolversTypes['ReturnRegisteredAdmin'] | ResolversTypes['ReturnRegisteredStaff'] | ResolversTypes['ReturnRegisteredStudent'];
  URL: ResolverTypeWrapper<Scalars['URL']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  UpdateAdminInput: UpdateAdminInput;
  UpdateBlogPostInput: UpdateBlogPostInput;
  UpdateStaffInput: UpdateStaffInput;
  UpdateStudentInput: UpdateStudentInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  UploadResponse: ResolverTypeWrapper<UploadResponse>;
  User: User;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccountNumber: Scalars['AccountNumber'];
  Admin: Admin;
  AdminInput: AdminInput;
  AdminLoginInput: AdminLoginInput;
  BigInt: Scalars['BigInt'];
  Blog: Blog;
  BlogPost: BlogPost;
  BlogPostInput: BlogPostInput;
  Boolean: Scalars['Boolean'];
  Byte: Scalars['Byte'];
  ChangePswInput: ChangePswInput;
  ChangePswResponse: ChangePswResponse;
  CountryCode: Scalars['CountryCode'];
  Cuid: Scalars['Cuid'];
  Currency: Scalars['Currency'];
  DID: Scalars['DID'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  DeleteAdminInput: DeleteAdminInput;
  DeleteBlogPostInput: DeleteBlogPostInput;
  DeleteStaffInput: DeleteStaffInput;
  DeleteStudentInput: DeleteStudentInput;
  DeletedAdmin: DeletedAdmin;
  DeletedStaff: DeletedStaff;
  DeletedStudent: DeletedStudent;
  Duration: Scalars['Duration'];
  EmailAddress: Scalars['EmailAddress'];
  FileInput: FileInput;
  FileUpdateInput: FileUpdateInput;
  GUID: Scalars['GUID'];
  HSL: Scalars['HSL'];
  HSLA: Scalars['HSLA'];
  HexColorCode: Scalars['HexColorCode'];
  Hexadecimal: Scalars['Hexadecimal'];
  IBAN: Scalars['IBAN'];
  ID: Scalars['ID'];
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JWT: Scalars['JWT'];
  JWTBox: JwtBox;
  JWToken: ResolversParentTypes['JWTBox'] | ResolversParentTypes['StringBox'];
  Latitude: Scalars['Latitude'];
  LocalDate: Scalars['LocalDate'];
  LocalEndTime: Scalars['LocalEndTime'];
  LocalTime: Scalars['LocalTime'];
  Locale: Scalars['Locale'];
  Long: Scalars['Long'];
  Longitude: Scalars['Longitude'];
  MAC: Scalars['MAC'];
  Mutation: {};
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  ObjectID: Scalars['ObjectID'];
  PhoneNumber: Scalars['PhoneNumber'];
  Port: Scalars['Port'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  RGB: Scalars['RGB'];
  RGBA: Scalars['RGBA'];
  RegisteredAdmin: RegisteredAdmin;
  RegisteredStaff: RegisteredStaff;
  RegisteredStudent: RegisteredStudent;
  ReturnBlogPost: ReturnBlogPost;
  ReturnRegisteredAdmin: ReturnRegisteredAdmin;
  ReturnRegisteredStaff: ReturnRegisteredStaff;
  ReturnRegisteredStudent: ReturnRegisteredStudent;
  RoutingNumber: Scalars['RoutingNumber'];
  SafeInt: Scalars['SafeInt'];
  Staff: Staff;
  StaffInput: StaffInput;
  StaffLoginInput: StaffLoginInput;
  String: Scalars['String'];
  StringBox: StringBox;
  Student: Student;
  StudentInput: StudentInput;
  StudentLoginInput: StudentLoginInput;
  Time: Scalars['Time'];
  TimeZone: Scalars['TimeZone'];
  Timestamp: Scalars['Timestamp'];
  Token: ResolversParentTypes['ReturnRegisteredAdmin'] | ResolversParentTypes['ReturnRegisteredStaff'] | ResolversParentTypes['ReturnRegisteredStudent'];
  URL: Scalars['URL'];
  USCurrency: Scalars['USCurrency'];
  UUID: Scalars['UUID'];
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  UpdateAdminInput: UpdateAdminInput;
  UpdateBlogPostInput: UpdateBlogPostInput;
  UpdateStaffInput: UpdateStaffInput;
  UpdateStudentInput: UpdateStudentInput;
  Upload: Scalars['Upload'];
  UploadResponse: UploadResponse;
  UtcOffset: Scalars['UtcOffset'];
  Void: Scalars['Void'];
};

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export type AdminResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Admin'] = ResolversParentTypes['Admin']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BlogResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlogPostResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['BlogPost'] = ResolversParentTypes['BlogPost']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export type ChangePswResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ChangePswResponse'] = ResolversParentTypes['ChangePswResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface CuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cuid'], any> {
  name: 'Cuid';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeletedAdminResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DeletedAdmin'] = ResolversParentTypes['DeletedAdmin']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletedStaffResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DeletedStaff'] = ResolversParentTypes['DeletedStaff']> = {
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['Title']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletedStudentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['DeletedStudent'] = ResolversParentTypes['DeletedStudent']> = {
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  matricNo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export type JwtBoxResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['JWTBox'] = ResolversParentTypes['JWTBox']> = {
  value?: Resolver<Maybe<ResolversTypes['JWT']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JwTokenResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['JWToken'] = ResolversParentTypes['JWToken']> = {
  __resolveType: TypeResolveFn<'JWTBox' | 'StringBox', ParentType, ContextType>;
};

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LocaleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Locale'], any> {
  name: 'Locale';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  admin?: Resolver<Maybe<ResolversTypes['ReturnRegisteredAdmin']>, ParentType, ContextType, RequireFields<MutationAdminArgs, 'registerInput'>>;
  blogPost?: Resolver<Maybe<ResolversTypes['ReturnBlogPost']>, ParentType, ContextType, RequireFields<MutationBlogPostArgs, 'registerInput'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['ChangePswResponse']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'input'>>;
  deleteAdmin?: Resolver<Maybe<ResolversTypes['DeletedAdmin']>, ParentType, ContextType, RequireFields<MutationDeleteAdminArgs, 'emailInput'>>;
  deleteBlogPost?: Resolver<Maybe<ResolversTypes['ReturnBlogPost']>, ParentType, ContextType, RequireFields<MutationDeleteBlogPostArgs, 'input'>>;
  deleteFile?: Resolver<Maybe<ResolversTypes['UploadResponse']>, ParentType, ContextType, RequireFields<MutationDeleteFileArgs, 'deleteInput'>>;
  deleteStaff?: Resolver<Maybe<ResolversTypes['DeletedStaff']>, ParentType, ContextType, RequireFields<MutationDeleteStaffArgs, 'emailInput'>>;
  deleteStudent?: Resolver<Maybe<ResolversTypes['DeletedStudent']>, ParentType, ContextType, RequireFields<MutationDeleteStudentArgs, 'emailInput'>>;
  staff?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStaff']>, ParentType, ContextType, RequireFields<MutationStaffArgs, 'registerInput'>>;
  student?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStudent']>, ParentType, ContextType, RequireFields<MutationStudentArgs, 'registerInput'>>;
  updateAdmin?: Resolver<Maybe<ResolversTypes['ReturnRegisteredAdmin']>, ParentType, ContextType, RequireFields<MutationUpdateAdminArgs, 'updateInput'>>;
  updateBlogPost?: Resolver<Maybe<ResolversTypes['ReturnBlogPost']>, ParentType, ContextType, RequireFields<MutationUpdateBlogPostArgs, 'input'>>;
  updateFile?: Resolver<Maybe<ResolversTypes['UploadResponse']>, ParentType, ContextType, RequireFields<MutationUpdateFileArgs, 'updateInput'>>;
  updateStaff?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStaff']>, ParentType, ContextType, RequireFields<MutationUpdateStaffArgs, 'updateInput'>>;
  updateStudent?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStudent']>, ParentType, ContextType, RequireFields<MutationUpdateStudentArgs, 'updateInput'>>;
  uploadFile?: Resolver<Maybe<ResolversTypes['UploadResponse']>, ParentType, ContextType, RequireFields<MutationUploadFileArgs, 'input'>>;
};

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  blog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType, RequireFields<QueryBlogArgs, 'id'>>;
  blogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Blog']>>>, ParentType, ContextType>;
  loginAdmin?: Resolver<Maybe<ResolversTypes['ReturnRegisteredAdmin']>, ParentType, ContextType, RequireFields<QueryLoginAdminArgs, 'loginInput'>>;
  loginStaff?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStaff']>, ParentType, ContextType, RequireFields<QueryLoginStaffArgs, 'loginInput'>>;
  loginStudent?: Resolver<Maybe<ResolversTypes['ReturnRegisteredStudent']>, ParentType, ContextType, RequireFields<QueryLoginStudentArgs, 'loginInput'>>;
  staff?: Resolver<Maybe<ResolversTypes['Staff']>, ParentType, ContextType, RequireFields<QueryStaffArgs, 'id'>>;
  staffs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Staff']>>>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentArgs, 'id'>>;
  students?: Resolver<Maybe<Array<Maybe<ResolversTypes['Student']>>>, ParentType, ContextType>;
};

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export type RegisteredAdminResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RegisteredAdmin'] = ResolversParentTypes['RegisteredAdmin']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisteredStaffResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RegisteredStaff'] = ResolversParentTypes['RegisteredStaff']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['Title']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisteredStudentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RegisteredStudent'] = ResolversParentTypes['RegisteredStudent']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  matricNo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnBlogPostResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnBlogPost'] = ResolversParentTypes['ReturnBlogPost']> = {
  blogpost?: Resolver<Maybe<ResolversTypes['BlogPost']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredAdminResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredAdmin'] = ResolversParentTypes['ReturnRegisteredAdmin']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes['RegisteredAdmin'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredStaffResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredStaff'] = ResolversParentTypes['ReturnRegisteredStaff']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  staff?: Resolver<ResolversTypes['RegisteredStaff'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReturnRegisteredStudentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ReturnRegisteredStudent'] = ResolversParentTypes['ReturnRegisteredStudent']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  student?: Resolver<ResolversTypes['RegisteredStudent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type StaffResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Staff'] = ResolversParentTypes['Staff']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staffID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['Title']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StringBoxResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['StringBox'] = ResolversParentTypes['StringBox']> = {
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType>;
  matricNo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeZoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeZone'], any> {
  name: 'TimeZone';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TokenResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  __resolveType: TypeResolveFn<'ReturnRegisteredAdmin' | 'ReturnRegisteredStaff' | 'ReturnRegisteredStudent', ParentType, ContextType>;
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UploadResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['UploadResponse'] = ResolversParentTypes['UploadResponse']> = {
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = IContext> = {
  AccountNumber?: GraphQLScalarType;
  Admin?: AdminResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Blog?: BlogResolvers<ContextType>;
  BlogPost?: BlogPostResolvers<ContextType>;
  Byte?: GraphQLScalarType;
  ChangePswResponse?: ChangePswResponseResolvers<ContextType>;
  CountryCode?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DeletedAdmin?: DeletedAdminResolvers<ContextType>;
  DeletedStaff?: DeletedStaffResolvers<ContextType>;
  DeletedStudent?: DeletedStudentResolvers<ContextType>;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  GUID?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  JWTBox?: JwtBoxResolvers<ContextType>;
  JWToken?: JwTokenResolvers<ContextType>;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  RegisteredAdmin?: RegisteredAdminResolvers<ContextType>;
  RegisteredStaff?: RegisteredStaffResolvers<ContextType>;
  RegisteredStudent?: RegisteredStudentResolvers<ContextType>;
  ReturnBlogPost?: ReturnBlogPostResolvers<ContextType>;
  ReturnRegisteredAdmin?: ReturnRegisteredAdminResolvers<ContextType>;
  ReturnRegisteredStaff?: ReturnRegisteredStaffResolvers<ContextType>;
  ReturnRegisteredStudent?: ReturnRegisteredStudentResolvers<ContextType>;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  Staff?: StaffResolvers<ContextType>;
  StringBox?: StringBoxResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  Token?: TokenResolvers<ContextType>;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  UploadResponse?: UploadResponseResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
};

