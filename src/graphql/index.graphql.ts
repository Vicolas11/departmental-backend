import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { ApolloServer } from "apollo-server-express";
import { envConfig } from "../configs/env.config";
import { PrismaClient } from "@prisma/client";
import depthLimit from "graphql-depth-limit";
import type { Application } from "express";
import context from "./context";
import schema from "./schema";
import http from "http";

// Ibrahim Ummy Salma Ozavize SCI16CSC068

