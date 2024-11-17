import Product from "../models/products.js";
import ProductStats from "../models/productstats.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js"
import getCountryIso3 from "country-iso-2-to-3"
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        // products will be the list of all products from database
        // Create product objects with stats
        // for every single product we will find the product with the id,
//         //For each product, it finds the corresponding ProductStats entry using ProductStats.findOne().
// Combines the original product data with its stats to create a new object.
        const productsWithStats = await Promise.all(products.map(async (product) => { // handling m asynchronus multiple calls 
            const stats = await ProductStats.findOne({ productId: product._id });
            return { ...product._doc, stats };
        }));

        res.status(200).json(productsWithStats);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}


export const getCustomers = async(req,res) => {
 try{
    const customers = await User.find({role: "user"}).select("-password");
    res.status(200).json(customers);
 } catch(error){
    res.status(404).json({ message: error.message });
}
}
//server side pagination
export const getTransactions = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query; // Default search is empty string

        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            return {
                [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1
            };
        };
        
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        // Search logic
        const transactions = await Transaction.find({
            // this or clause gets us all data as well as searched data
            
            $or: [
                { cost: { $regex: new RegExp(search.trim(), "i") } },
                { userId: { $regex: new RegExp(search.trim(), "i") } }
            ],
        })
        .sort(sortFormatted)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

        // Count total documents based on the same search criteria
        const total = await Transaction.countDocuments({
            $or: [
                { cost: { $regex: new RegExp(search.trim(), "i") } },
                { userId: { $regex: new RegExp(search.trim(), "i") } }
            ]
        });

        res.status(200).json({
            transactions,
            total
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getGeography = async (req, res) => {
    try {
      const users = await User.find();
  
      const mappedLocations = users.reduce((acc, { country }) => {
        const countryISO3 = getCountryIso3(country);
        if (!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
      }, {});
  
      const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return { id: country, value: count };
        }
      );
  
      res.status(200).json(formattedLocations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };