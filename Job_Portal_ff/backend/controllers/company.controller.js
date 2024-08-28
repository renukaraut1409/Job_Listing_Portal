import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        // Check if the company is already registered
        const existingCompany = await Company.findOne({ name: companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "This company is already registered.",
                success: false
            });
        }

        // Create a new company
        const newCompany = await Company.create({
            name: companyName,
            userId: req.id // Ensure req.id is set correctly from authentication middleware
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company: newCompany,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while registering the company.",
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // Logged-in user id

        // Fetch all companies associated with the user
        const companies = await Company.find({ userId });
        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while fetching companies.",
            success: false
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Fetch company by ID
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while fetching the company.",
            success: false
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        // Prepare update data
        const updateData = { name, description, website, location };

        // Handle file upload if provided
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            updateData.logo = cloudResponse.secure_url;
        }

        // Update company information
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            company: updatedCompany,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while updating the company.",
            success: false
        });
    }
};
