import { Router } from "express";
const router = Router();
import { User } from '../models/user.js';
import { asyncHandler } from "../utils/CatchError.js";
import { ExpressError } from "../utils/ExpressError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Otp } from "../models/otp.js";
import  twilio  from "twilio";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async(userId) =>{
  try {

    ///extra db call....
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      throw new ExpressError(500, "Something went wrong while generating referesh and access token")
  }
}

const accountID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountID, authToken);
router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      // id:req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      verified: req.body.verified || false,
      isPrime: req.body.isPrime || false
    })
   
    const userSaved = await user.save();
    if (!userSaved) {
      return res.status(401).send('Something went wrong')
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    //OTP taking for Otp model
    const otpEntry = new Otp({ 
      phoneNumber: userSaved.phoneNumber,
      otp: otp,
    });
    await otpEntry.save();
    console.log('otp entry saved');
    
    // Send OTP via Twilio
    // await client.messages.create({
    //   body: `Your OTP is: ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER, // write to twilio
    //   to: userSaved.phoneNumber
    // });
    res.status(200).send('OTP sent successfully');
    console.log(user);
  }
  catch (e) {
    console.log(e);
    res.send('fail');
  }
})

router.post('/otpVerify', asyncHandler(async (req, res) => {
  const { otp, phoneNumber } = req.body;
  const otpEntry = await Otp.findOne({ phoneNumber: phoneNumber });
  if (!otpEntry) {
    console.log("!otpEntry")
    return res.status(400).send('Invalid OTP');
  }
  if (otp!= otpEntry.otp) {
    console.log(otpEntry.otp)
    console.log(otp)
    return res.status(400).send('Invalid OTP');
  }
  await Otp.deleteOne({ phoneNumber: phoneNumber });
  const user = await User.findOne({phoneNumber: phoneNumber});
  if (!user) {
    return res.status(400).send('Invalid OTP');
  }
  user.verified = true;
  await user.save();
  res.status(200).send('OTP verified');
}))

router.post('/login', asyncHandler(async (req, res) => {
  try{
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Enter all values');
    throw new Error('Please enter all values');
    // console.log(Error.);  
    // throw new ExpressError(404, 'Please enter values')
    // return res.send('Enter all values');
  }
  const user = await User.findOne({ email: email })//user find
  // if (!user) {
  //   throw new ExpressError(404, "User does not exist")
  // }
  const isMatch = await user.comparePassword(password);
  console.log(user); // Debugging: log the user instance
  if (!isMatch) {
    throw new Error("Invalid user credentials")
    // return res.send('Enter all values');

  }
  //at this we find the user is verified
  //then we should generate tokens
  const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);
  console.log(accessToken);
  console.log(refreshToken);
//   const options = {
//     httpOnly: true,
//     secure: true
// }
// .cookie("accessToken", accessToken, options)
    // .cookie("refreshToken", refreshToken, options)
    

  return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
  }catch (err) {
    res.status(400).send(err.message);
  }
}))

export default router;