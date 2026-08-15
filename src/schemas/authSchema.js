import * as yup from "yup";

export const loginSchema = yup.object().shape({
  account: yup.string().required("Vui lòng nhập tài khoản"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username ít nhất 3 ký tự")
    .required("Bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Bắt buộc"),
});
