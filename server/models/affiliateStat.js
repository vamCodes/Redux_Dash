import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    affiliateSales: {  // Added missing comma here
        type: [mongoose.Types.ObjectId],
        ref: "Transaction"
    }
}, {
    timestamps: true
});

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;