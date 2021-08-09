import * as Yup from 'yup';
const primaryValidator = 'Characters too long';
const phoneRegEx =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('')
    .min(8, 'Email must be 8 or greater characters long')
    .max(20, primaryValidator)
    .required(''),
  password: Yup.string()
    .min(8, 'Password must be 8 or greater characters long')
    .max(30, primaryValidator),
  phone: Yup.string()
    .matches(phoneRegEx, 'Invalid phone number')
    .min(3, 'Phone number must be 10 or greater characters long')
    .max(12, primaryValidator),
});
