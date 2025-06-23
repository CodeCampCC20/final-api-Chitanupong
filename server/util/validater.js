// Validate with yup
import { object, ref, string } from "yup";

export const registerSchema = object({
  username: string().min(2, "username ต้องมากกว่า 2 อักขระ"),
  password: string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Confirm Password ไม่ตรงกัน"
  ),
});


export const LoginSchema = object({
  username: string().min(2, "username ต้องมากกว่า 2 อักขระ"),
  password: string().min(6, "Password ต้องมากกว่า 6 อักขระ")
});

export const validate = (schema) => async (req, res, next) => {
  // code body
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(",");
    console.log(errTxt);
    const mergeErr = new Error(errTxt);
    next(mergeErr);
  }
};