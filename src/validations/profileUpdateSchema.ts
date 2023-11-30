import * as yup from "yup";

export const profileSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório."),
  email: yup.string().email().required("E-mail é obrigatório."),
  old_password: yup.string().email(),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), ""], "As senhas devem ser iguais.")
    .when("password", {
      is: (field: any) => field,
      then: (schema) =>
        schema.nullable().required("Informe a confirmação da senha."),
    })
    .transform((value) => (!!value ? value : null)),
});
