import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    // data validation
    const { email, password, username } = req.body;
    // check if all three imput are send

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // email validation block
    // email formate checking
    const emailRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email);

    if (!emailRegex) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email", type: "email" });
    }
    // check is email already assign to any one
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // username validation block

    // email formate checking
    const nameRegex = /^[A-Za-z][A-Za-z0-9]{4,9}$/.test(username);

    if (!nameRegex) {
      return res.status(400).json({
        success: false,
        message: "Invalid user name, must be 5 letter",
      });
    }

    // check is username already assign to any one
    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // password validation block

    const passwordValidation =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

    if (!passwordValidation) {
      return res.status(400).json({
        success: false,
        message:
          "password must contain atlist one number, one uppercase letter, one smallercase letter and with minimum of 8 chareacter length",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    // update the details to database

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    req.session.user = newUser._doc.email;

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
      message: "user created",
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    req.session.user = user._doc.email;

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
      message: "login success",
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("authCookie");
    res.status(200).json({ success: true, message: "successfully logout" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).send("Error occurred while logging out");
  }
};

export const authCheck = (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.session.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
