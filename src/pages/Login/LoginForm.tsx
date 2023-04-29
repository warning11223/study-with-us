import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/authSlice";

import s from "./LoginForm.module.scss";
import React from "react";
import { Link } from "react-router-dom";

type Inputs = {
  email: string,
  password: string,
  checkbox: boolean
};

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    const payload = {
      email: data.email,
      password: data.password,
      rememberMe: data.checkbox
    };
    dispatch(authThunks.login(payload));
  };

  //console.log(watch("example")) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.login}>
      <h1 className={s.login__title}>Sign in</h1>
      <div className={s.login__container}>
        <span className={s.login__span}>Email</span>
        <input {...register("email", { required: true })} type={"email"} className={s.login__input} />
        {errors.email && <span style={{color: "red", marginTop: "-15px"}}>Email is required</span>}

        <span className={s.login__span}>Password</span>
        <input {...register("password", { required: true })} type={"password"} className={s.login__input} />
        {errors.password && <span style={{color: "red", marginTop: "-15px"}}>Password is required</span>}

        <div className={s.login__rememberme}>
          <input {...register("checkbox", { required: false })} type={"checkbox"} name={"checkbox1"} />
          <label htmlFor="checkbox1">Remember me</label>
        </div>

        <Link to={"/forgot-password"} className={s.login__forgotPassword}>Forgot Password?</Link>

        <input type="submit" className={s.login__btn} value={'Sign in'}/>
      </div>
    </form>
  );
};
