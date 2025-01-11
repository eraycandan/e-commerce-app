import * as yup from 'yup';

export const registerPageSchema = yup.object().shape({
    username: yup.string().required("kullanıcı adı boş olamaz"),
    password: yup.string().required("şifre alanı zorunlu"),
    confirmPassword: yup.string().required("şifre tekrarı zorunlu").oneOf([yup.ref('password', yup.password)], "şifreler eşleşmiyor"),
    term: yup.boolean().oneOf([true], "lütfen  sözleşmeyi onaylayınız").required("bu alan zorunludur")
})

