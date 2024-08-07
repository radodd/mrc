"use strict";
// import { Request, Response, NextFunction, RequestHandler } from "express";
// import createHttpError from "http-errors";
// import supabase from "../server";
//@ts-ignore
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = void 0;
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const RequestHandler = require("express");
const createHttpError = require("http-errors");
// const supabase = require("../server");
//@ts-ignore
const getProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch product from Supabase
        const { data: project, error } = yield supabase
            .from("Projects")
            .select("*");
        if (error) {
            throw createHttpError(404, "Project not found");
        }
        // Respond with the product data
        res.status(200).json(project);
    }
    catch (error) {
        next(error);
    }
});
exports.getProjects = getProjects;
