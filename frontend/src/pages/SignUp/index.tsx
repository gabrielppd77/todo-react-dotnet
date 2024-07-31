import { Avatar, Grid, Box, Link, Typography, Container } from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import TextFieldControl from "@components/TextFieldControl";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

import { useRegister } from "@libs/queries/user";

const schema = z
  .object({
    userName: z.string().min(1, { message: "Informe o Nome de usuário" }),
    password: z.string().min(1, { message: "Informe a Senha" }),
    confirmPassword: z.string().min(1, { message: "Confirme a Senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const { mutateAsync, isPending } = useRegister();

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre
        </Typography>
        <Box sx={{ mt: 3 }}>
          <FormProvider {...form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextFieldControl
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="Nome de usuário"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldControl
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldControl
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirme a senha"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
          </FormProvider>
          <LoadingButton
            loading={isPending}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            onClick={form.handleSubmit(async (data) => {
              const response = await mutateAsync(data);
              setToken(response.token);
              navigate("/home");
            })}
          >
            Cadastrar
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já tem uma conta? Entre
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
