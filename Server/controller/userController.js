import User from "../models/user.model.js";
import bycrypt from 'bcryptjs'
import Bill from '../models/bill.model.js'


export const Signup = async (req, res) => {

  try {

    const userData = new User(req.body);
    userData.password = await bycrypt.hash(userData.password, 10)

    if (!userData) {
      return res.status(404).json({ msg: "User Data Not Found" })
    }
    await userData.save();
    res.status(200).json({ msg: "User Created Succeessfully" });
  }
  catch (error) {
    res.status(500).json({ error: error })
  }
}

export const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: 'User Not Found' });
    // Check password
    const isMatch = bycrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ msg: 'Invalid Passwrod' });
    res.json(user)

  } catch (error) {
    res.status(400).json({ error: error.message });

  }
}


export const newBill=async (req,res)=>{

    try {
        const billData=new Bill(req.body)
        if(!billData){
            return res.status(404).json({msg:"Data Not Inserted"})
        }
        
    
    const user = await User.findOne(billData.user);
    const bill=await Bill.find({user:user._id})
    await billData.save();
    // user.bills.push(bill[bill.length-1]._id)
    await user.save();

      res.status(200).json({msg:"Bill Created Succeessfully"})
        
    } catch (error) {
        res.status(500).json({error:error})
    }

}

export const getBill= async (req,res)=>{

  try {
    const userid=req.body.userid;
    console.log(userid)

    const user = await User.findOne({ email:userid});
    const bill=await Bill.find({user:user._id})
    console.log(bill[0]._id)
    res.status(200).json(bill)
    // user.bills.push(bill[0]._id)
    // await user.save();
   

  } catch (error) {
    res.status(404).json({msg:"Not Found"})
  }  
}