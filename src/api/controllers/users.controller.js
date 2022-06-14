const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");


const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const createdUser = newUser.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      user: null,
    });
  } catch (error) {
    return next(error);
  }
};


const login = async (req, res, next) => {
  try {
    
    const userInfo = await User.findOne({ username: req.body.username });
    
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      
      userInfo.password = null;
      
      const token = jwt.sign(
        {
          id: userInfo._id,
          username: userInfo.username,
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        user: userInfo,
        token: token,
      });
    } else {
      return res.json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Users: allUsers,
    });
  } catch (error) {
    return next(error);
  }
};


const getUsersByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const UsersByID = await User.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Users: UsersByID,
    });
  } catch (error) {
    return next(error);
  }
};


const deleteUsers = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const UserBorrado = await User.findByIdAndDelete(id);
  
      return res.status(200).json(UserBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchUser = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchUser = new User(req.body);
  
      patchUser._id = id;

      const UserData= await User.findById(id)

      // patchUser.autor =[...cuadroData.autor, ...patchCuadro.autor]

      if (UserData.imagen) {
        deleteFile(UserData.imagen);
        }

      if (req.file) {
        patchUser.imagen = req.file.path;
      }
  
      const UserDB = await User.findByIdAndUpdate(id, patchUser);
      
      return res.status(200).json({ nuevo: patchUser, vieja: UserDB });
    } catch (error) {
      return next(error);
    }
  };

module.exports = { login, register, logout, getAllUsers, getUsersByID, deleteUsers, patchUser };
