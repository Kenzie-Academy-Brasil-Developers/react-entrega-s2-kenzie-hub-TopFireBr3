import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "../../App.css";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FlexHeader } from "./style";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

import { toast, ToastContainer } from "react-toastify";

import Logo from "../../img"

function Login() {
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    delete data.twopassword;
    axios
      .post("https://kenzieshop.herokuapp.com/users/", data)
      .then((response) => console.log(response));
    toast.success("Login Concluído!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      history.push(`/HomePage`);
    }, 3000)
    .catch((error) => {
      console.log(error);
      toast.error("Login incorreto!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  return (
    <>
      <FlexHeader>
        <img src={Logo} alt="Logo" />
      </FlexHeader>
      <h3>Login</h3>
      <div className="container">
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
          <h5>Email</h5>
          <input placeholder="Digite seu email" {...register("email")} />
          {errors.email?.message}
          <h5>Senha</h5>
          <input
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
          />
          {errors.password?.message}
          <div>
            <button type="submit">Logar</button>
          </div>
        </form>
        <span>não possui uma conta?</span>
        <button onClick={history.push(`/Cadastro`)}>Cadastre-se</button>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default Login;
