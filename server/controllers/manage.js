import mongoose from "mongoose"
import User from "../models/user.js"
import Transaction from "../models/transaction.js";

export const getAdmins = async(req,res) => {
    try{
      const admins = await User.find({role : "admin"}).select("-password");
      res.status(200).json(admins);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: { path: "$affiliateStats", preserveNullAndEmptyArrays: true } }, // Ensure null entries are preserved
    ]);

    if (!userWithStats || userWithStats.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!userWithStats[0].affiliateStats) {
      return res.status(404).json({ message: "Affiliate stats not found for this user" });
    }

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
