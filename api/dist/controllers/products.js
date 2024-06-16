"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.createProduct = exports.getProducts = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
// Assuming you have a util file for Supabase interactions
const server_1 = __importDefault(require("../server"));
// import db from '../config/db';
// type SchemaType = 'products'
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield server_1.default.from("Product").select("*");
        if (error) {
            throw (0, http_errors_1.default)(500, "Failed to fetch products");
        }
        if (!data) {
            throw (0, http_errors_1.default)(404, "No products found");
        }
        console.log("DATA", data);
        res.json(data);
    }
    catch (error) {
        next();
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, imagePath, company, color, category } = req.body;
    try {
        if (!name ||
            !description ||
            !imagePath ||
            !company ||
            !color.length ||
            !category.length) {
            throw (0, http_errors_1.default)(400, "All fields are required and must have at least one category and color");
        }
        // Insert the product
        const { data, error: productError } = yield server_1.default
            .from("Product")
            .insert([{ name, description, imagePath, company, color, category }])
            .select("*")
            .single();
        console.log("DATA", data);
        if (productError) {
            console.log(productError);
            throw (0, http_errors_1.default)(500, "Failed to create product");
        }
        if (!data) {
            console.log("The Product:", data);
            throw (0, http_errors_1.default)(500, "Product data is missing");
        }
        console.log("Product Data", data);
        res.status(201).json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        // Validate product ID
        if (!productId) {
            throw (0, http_errors_1.default)(400, "Invalid product ID");
        }
        // Fetch product from Supabase
        const { data: product, error } = yield server_1.default
            .from("Product")
            .select("*")
            .eq("id", productId)
            .single();
        if (error) {
            throw (0, http_errors_1.default)(404, "Product not found");
        }
        // Respond with the product data
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getProduct = getProduct;
