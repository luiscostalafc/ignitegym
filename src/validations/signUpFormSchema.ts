import * as yup from "yup";

export const signUpFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}/,
      "Senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um caracter especial e um número"
    ),
  password_confirm: yup
    .string()
    .oneOf(["", yup.ref("password")], "As senhas devem ser iguais"),
});
