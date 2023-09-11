"use client"

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { LoginSchemaType } from '../types';
import { LoginSchema } from '../schema';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { USER_DOES_NOT_EXIST } from '@/constants';

const users = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" },
  { email: "user3@example.com", password: "password3" },
];

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const [isUser, setIsUser] = useState(true);

  

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data: LoginSchemaType) => {
      onLoginUser(data);
    }

  const onLoginUser = async (data: LoginSchemaType) => {
    const { email, password } = data;
    const userData = JSON.stringify({ email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post("/api/login", userData, config);
      const { token } = response.data;
      if (response.status === 200 && token) {
        setIsUser(true);
        redirectToSearchPage();
        localStorage.setItem("token", token);
      } else {
        setIsUser(false);
      }
    } catch (error) {
      console.log(error)
      setIsUser(false);
    }
  }

  
  const router = useRouter();

  const redirectToSearchPage = () => {
    // Redirect to the search page
    router.push("/search")
  }

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const message = USER_DOES_NOT_EXIST;
  const severity = "error";
  const autoHideDuration = 2000;

  return (
    <div className="flex justify-center items-center -mt-14 h-full lg:h-screen">
      <div className="bg-neutral-50 py-6 px-6 rounded-lg shadow-lg h-full lg:h-1/2 w-1/3">
        <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold">Login</h1>
          <div>
            <TextField color="success" autoFocus label="Email" fullWidth {...register("email")} id="email" />
            {errors["email"] && (
              <span className="text-red-800 block my-2 mb-4">
                {errors["email"]?.message}
              </span>
            )}
          </div>
          <div>
            <TextField color="success" label="Password" type="password" fullWidth {...register("password")} id="password" />
            {errors["password"] && (
              <span className="text-red-800 block my-2">
                {errors["password"]?.message}
              </span>
            )}
          </div>
            <Button className="mt-4 p-2" variant="contained" color="inherit" fullWidth type="submit" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : "Login"}
            </Button>
        </form>
        <Snackbar color="primary" open={!isUser} autoHideDuration={autoHideDuration} anchorOrigin={{ horizontal: "center", vertical: "top" }} onClose={() => setIsUser(true)}>
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Login;

