import * as yup from 'yup';


export const loginPageSchema = yup.object().shape({
    username: yup.string().required("kullanıcı adı boş olamaz"),
    password: yup.string().required("şifre alanı zorunlu")
})