import { Avatar, Link, Grid, Box, Typography, Container } from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import TextFieldControl from "@components/TextFieldControl";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

import { useLogin } from "@libs/queries/user";

const schema = z.object({
  userName: z.string().min(1, { message: "Informe o Nome de usuário" }),
  password: z.string().min(1, { message: "Informe a Senha" }),
});

export default function SignIn() {
  const { mutateAsync, isPending } = useLogin();

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: "",
      password: "",
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
          Entre
        </Typography>
        <Box sx={{ mt: 1 }}>
          <FormProvider {...form}>
            <TextFieldControl
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Nome de usuário"
              name="userName"
              autoComplete="given-name"
              autoFocus
            />
            <TextFieldControl
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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
            Entre
          </LoadingButton>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Não tem uma conta? Cadastre"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
