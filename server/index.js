import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan" 
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/manage.js";
import salesRoutes from "./routes/sales.js";
import User from "./models/user.js"
import Product from "./models/products.js"
import ProductStats from "./models/productstats.js"
import Transaction from "./models/transaction.js"
import AffiliateStat from "./models/affiliateStat.js"
import OverAllStat from "./models/overallStat.js"
import {dataUser,dataProduct,dataProductStat,dataTransaction, dataOverallStat, dataAffiliateStat} from "./data/index.js"
/* CONFIGURATION */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
// data imports


// routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/managment", managementRoutes );
app.use("/sales", salesRoutes);

// Mongoose setup

const PORT = process.env.PORT  || 9000;
// User.insertMany(dataUser)
// Product.insertMany(dataProduct);
// ProductStats.insertMany(dataProductStat);
// Transaction.insertMany(dataTransaction);
// // OverAllStat.insertMany(dataOverallStat);
// AffiliateStat.insertMany(dataAffiliateStat);

mongoose.connect(process.env.MONGO_URL,{
}).then(()=> {
app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`))



