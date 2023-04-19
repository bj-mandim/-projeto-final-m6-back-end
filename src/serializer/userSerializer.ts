import * as yup from 'yup';

const createUserSerializer = yup.object().shape({
  name: yup.string().required().min(2),
  email: yup.string().email().required(),
  cpf: yup.string().required().min(11),
  phone: yup.string().required(),
  birth: yup.string().required(),
  description: yup.string().required().min(10),
  is_announcer: yup.string().required(),
  password: yup.string().required(),
  id: yup.string().notRequired(),
});

export default createUserSerializer;
