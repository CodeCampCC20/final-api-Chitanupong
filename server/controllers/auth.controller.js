import prisma from "../config/prisma.js";
import { createError } from "../util/createError.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      }
    })
    if (user) {
      createError(400, 'username already exist!')
    }

    const hashPassword = bcrypt.hashSync(password, 10)


    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword
      }
    })
    console.log(result);

    res.json({ message: 'Register user Successfully' })
  } catch (error) {
    next(error);
  }
}


export const registerDoctor = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, specialization } = req.body;

    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      }
    })
    if (doctor) {
      createError(400, 'username already exist!')
    }

    const hashPassword = bcrypt.hashSync(password, 10)


    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: hashPassword,
        specialization: specialization
      }
    })
    console.log(result);

    res.json({ message: 'Register doctor Successfully' })
  } catch (error) {
    next(error);
  }
}





export const login = async (req, res, next) => {
  try {

    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username: username
      }
    })

    if (!user) {
      createError(400, 'Username Or Password is Invalid')
    }
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      createError(400, 'Username Or Password is Invalid')
    }
    const payload = {
      id: user.id,
      username: user.name,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' })

    res.json({
      message: 'User Login Successfuly',
      payload: payload,
      token: token,
    })
  } catch (error) {
    next(error);
  }
}



export const loginDoctor = async (req, res, next) => {
  try {


    const { username, password } = req.body;
    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username
      }
    })

    if (!doctor) {
      createError(400, 'Username Or Password is Invalid')
    }
    const checkPassword = bcrypt.compareSync(password, doctor.password);

    if (!checkPassword) {
      createError(400, 'Username Or Password is Invalid')
    }
    const payload = {
      id: doctor.id,
      username: doctor.username,
      specialization: doctor.specialization,

    };


    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' })

    res.json({
      message: 'Doctor Login Successfuly',
      payload: payload,
      token: token,
    })
  } catch (error) {
    next(error);
  }
}

