import prisma from "../config/prisma.js";
import bcrypt from 'bcryptjs';



export const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id);
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
        role: true
      },
    });
    res.json({
      result: user
    });
  } catch (error) {
    next(error);
  }
};


export const getDoctorProfile = async (req, res, next) => {
  try {
    const { id } = req.doctor;
    console.log(id);
    const doctor = await prisma.doctor.findFirst({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
        role: true
      },
    });
    res.json({
      result: doctor
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { username, password } = req.body;

    const dataToUpdate = {};

    if (username) dataToUpdate.username = username;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataToUpdate.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctorProfile = async (req, res, next) => {
  try {
    const { id } = req.doctor;
    const { username, password } = req.body;

    const dataToUpdate = {};

    if (username) dataToUpdate.username = username;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataToUpdate.password = hashedPassword;
    }

    const updatedUser = await prisma.doctor.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
    });
  } catch (error) {
    next(error);
  }
};







