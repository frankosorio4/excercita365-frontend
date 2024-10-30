import { Grid, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useApiUsuario } from "../../../hooks/useApiUsuario";
import { useForm } from "react-hook-form";
import { useState } from "react";

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { login } = useApiUsuario();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function sendLogin(formValue) {
        try {
            const success = await login({
                email: formValue.email,
                password: formValue.password
            });

            if (success) {
                navigate("/home");
            } else {
                console.error("Falha no login.");
            }
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
        }
    }

    return (
        <>
            <Grid className="containerLogin" sx={{ flexDirection: "column" }}>
                <Grid className="loginForm" sx={{ flexDirection: "column" }}>
                    <form className="form">
                        <Grid className="logo">
                            <img src="/assets/logo-exercita365.png" alt="Logo Exercita365" />
                        </Grid>
                        <Grid className="camposEntrada" sx={{ flexDirection: "column" }}>
                            <TextField
                                className="email"
                                id="outlined-basic"
                                type="email"
                                variant="outlined"
                                name="email"
                                placeholder="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register("email", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 100,
                                        message: "Este campo aceita no máximo 100 caracteres."
                                    }
                                })}
                            />
                            <TextField
                                className="password"
                                id="outlined-password-input"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                name="senha"
                                placeholder="senha"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                {...register("password", {
                                    required: "Este campo é obrigatório.",
                                    maxLength: {
                                        value: 100,
                                        message: "Este campo aceita no máximo 100 caracteres."
                                    }
                                })}
                            />
                        </Grid>
                    </form>
                    <Grid className="containerButtonLogin">
                        <Link to="/cadastroUsuario">
                            <Button className="buttonRegister" variant="contained" size="medium">
                                Registre-se
                            </Button>
                        </Link>
                        <Button
                            onClick={handleSubmit(sendLogin)}
                            className="buttonLogin"
                            variant="contained"
                            size="medium">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default LoginForm;
