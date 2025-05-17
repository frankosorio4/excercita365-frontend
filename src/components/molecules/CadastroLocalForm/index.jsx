/* eslint-disable */
import { TextField, Button, FormLabel, FormControl, FormGroup, FormControlLabel, Checkbox, Box, Typography }
    from "@mui/material";
import { useForm } from "react-hook-form";
import "./index.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useApiLocal } from "../../../hooks/useApiLocal";
import useBuscaCep from "../../../hooks/useBuscaCep";
import useLatitudeLongitude from "../../../hooks/useLatitudeLongitude";
import { getCookie } from "../../../hooks/useCookies";
import { LocalContext } from "../../../context/LocalContext";

function CadastroLocalForm() {
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();

    const { atividadesDisponiveis } = useContext(LocalContext)
    const navigate = useNavigate();
    const { cadastrarLocal, editarLocal, getLocalPorId } = useApiLocal();
    const { id } = useParams();
    const [label, setLabel] = useState("Cadastrar");

    const handleInput = (event, maxLength) => {
        if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
        }
    };

    const consultaCep = async () => {
        let cepConsulta = getValues("cep").replace(/\D/g, "");
        if (cepConsulta !== "") {
            const dadosCep = await useBuscaCep(cepConsulta);
            setValue("logradouro", dadosCep.logradouro);
            setValue("bairro", dadosCep.bairro);
            setValue("cidade", dadosCep.localidade);
            setValue("estado", dadosCep.uf);
            const dadosLatLong = await useLatitudeLongitude(cepConsulta);
            setValue("latitude", dadosLatLong.lat);
            setValue("longitude", dadosLatLong.lng);
        }
    };

    const [atividades, setAtividades] = useState({
        caminhada: false,
        trilha: false,
        musculacao: false,
        natacao: false,
        surf: false,
        ciclismo: false,
        skate: false,
        corrida: false,
        futebol: false
    });

    const getAtividadesSelecionadas = (event) => {
        setAtividades({
            ...atividades,
            [event.target.name]: event.target.checked
        });
    };

    function sendLocal(formValue) {
        if (id != "" && id !== undefined) {
            editarLocal(
                {
                    ...formValue,
                    usuario: getCookie("usuarioLogado"),
                    atividades: atividades
                },
                id
            );
        } else {
            cadastrarLocal({
                ...formValue,
                usuario: getCookie("usuarioLogado"),
                atividades: atividades
            });

            navigate("/home", { replace: true });
        }

        navigate("/home", { replace: true });
    }

    function carregarDadosEdicao(idSelecionado) {
        getLocalPorId(idSelecionado).then((response) => {
            setValue("nome", response.nome);
            setValue("descricao", response.descricao);
            setValue("cep", response.cep);
            setValue("logradouro", response.logradouro);
            setValue("bairro", response.bairro);
            setValue("cidade", response.cidade);
            setValue("estado", response.estado);
            setValue("latitude", response.latitude);
            setValue("longitude", response.longitude);

            const novasAtividades = { ...atividades };

            response.atividades.forEach((atividade) => {
                novasAtividades[atividade.nomeAtividade] = true;
            });

            setAtividades(novasAtividades);
        });
    }

    function limparCampos() {
        setValue("nome", "");
        setValue("descricao", "");
        setValue("cep", "");
        setValue("logradouro", "");
        setValue("estado", "");
        setValue("cidade", "");
        setValue("bairro", "");
        setValue("numeroCasa", "");
        setValue("complemento", "");
        setValue("latitude", "");
        setValue("longitude", "");
        setAtividades({
            caminhada: false,
            trilha: false,
            musculacao: false,
            natacao: false,
            surf: false,
            ciclismo: false,
            skate: false,
            corrida: false,
            futebol: false
        });
    }

    useEffect(() => {
        if (id != "" && id !== undefined) {
            carregarDadosEdicao(id);
            setLabel("Editar");
        }
        limparCampos();
    }, [id]);

    useEffect(() => {
        // Initialize the atividades state with the available activities
        const initialAtividades = {};
        atividadesDisponiveis.forEach((atividade) => {
            initialAtividades[atividade.nomeAtividade] = false;
        });
        setAtividades(initialAtividades);
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "calc(100vh - 60px)", // Subtrai a altura do header e footer
                bgcolor: "#e5e5e5",
                px: 2
            }}>
            <Box
                component="form"
                onSubmit={handleSubmit(sendLocal)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: { xs: "100%", sm: "75%", md: "60%", lg: "50%", xl: "40%" },
                    maxWidth: "900px",
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                    marginTop: "80px",
                    marginBottom: "25px"
                }}>
                <Box sx={{ mb: 3 }}>
                    <img
                        src="/assets/logo-exercita365.png"
                        alt="Logo Exercita365"
                        style={{ width: "120px", height: "120px", marginTop: "10px" }}
                    />
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, alignSelf: 'start' }}>
                    Os campos com * são obrigatórios.
                </Typography>

                <TextField
                    label="Nome do Local *"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                    {...register("nome", {
                        required: "Este campo é obrigatório.",
                        maxLength: { value: 100, message: "Máximo de 100 caracteres." }
                    })}
                    InputLabelProps={{ shrink: true }}
                    sx={{ fontSize: { sm: "0.9rem", md: "1rem", lg: "1.1rem" } }}
                />

                <TextField
                    label="Descrição do Local *"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                    {...register("descricao", {
                        required: "Este campo é obrigatório.",
                        maxLength: { value: 150, message: "Máximo de 150 caracteres." }
                    })}
                    InputLabelProps={{ shrink: true }}
                    sx={{ fontSize: { sm: "0.9rem", md: "1rem", lg: "1.1rem" } }}
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        width: "100%",
                        mb: 2,
                        fontSize: { sm: "0.9rem", md: "1rem", lg: "1.1rem" }
                    }}>
                    <TextField
                        label="CEP *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.cep}
                        helperText={errors.cep?.message}
                        {...register("cep", {
                            required: "Este campo é obrigatório.",
                            onBlur: () => consultaCep(),
                            maxLength: { value: 8, message: "Máximo de 8 caracteres." }
                        })}
                        InputLabelProps={{ shrink: true }}
                        onInput={(event) => handleInput(event, 8)}
                    />
                    <TextField
                        label="Estado *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.estado}
                        helperText={errors.estado?.message}
                        {...register("estado", {
                            required: "Este campo é obrigatório.",
                            maxLength: { value: 2, message: "Máximo de 2 caracteres." }
                        })}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        width: "100%",
                        mb: 2
                    }}>
                    <TextField
                        label="Cidade *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.localidade}
                        helperText={errors.localidade?.message}
                        {...register("cidade", {
                            required: "Este campo é obrigatório.",
                            maxLength: { value: 30, message: "Máximo de 30 caracteres." }
                        })}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Bairro *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.bairro}
                        helperText={errors.bairro?.message}
                        {...register("bairro", {
                            required: "Este campo é obrigatório.",
                            maxLength: { value: 50, message: "Máximo de 50 caracteres." }
                        })}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        width: "100%",
                        mb: 2,
                        fontSize: { sm: "0.9rem", md: "1rem", lg: "1.1rem" }
                    }}>
                    <TextField
                        label="Logradouro *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.logradouro}
                        helperText={errors.logradouro?.message}
                        {...register("logradouro", {
                            required: "Este campo é obrigatório.",
                            maxLength: { value: 60, message: "Máximo de 60 caracteres." }
                        })}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        width: "100%",
                        mb: 2
                    }}>
                    <TextField
                        label="Numero"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        {...register("numeroCasa", {
                            maxLength: { value: 10, message: "Máximo de 10 caracteres." }
                        })}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Complemento"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("complemento", {
                            maxLength: { value: 50, message: "Máximo de 50 caracteres." }
                        })}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        width: "100%",
                        mb: 3
                    }}>
                    <TextField
                        label="Latitude"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.latitude}
                        helperText={errors.latitude?.message}
                        {...register("latitude", {
                            maxLength: { value: 11, message: "Máximo de 10 caracteres." }
                        })}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Longitude"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.longitude}
                        helperText={errors.longitude?.message}
                        {...register("longitude", {
                            maxLength: { value: 11, message: "Máximo de 10 caracteres." }
                        })}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>

                <FormControl
                    component="fieldset"
                    variant="standard"
                    sx={{ width: "100%", mb: 3 }}>
                    <FormLabel component="legend" sx={{ fontWeight: "bold", textAlign: "center", color: "primary.main" }}>Atividades Esportivas</FormLabel>
                    <FormGroup
                        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", mt: 2, justifyContent: "center" }}>
                        {atividadesDisponiveis.map((atividade, index) => (
                            <div className="atividade-item" key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={atividades[atividade.nomeAtividade] || false}
                                            onChange={getAtividadesSelecionadas}
                                            name={atividade.nomeAtividade}
                                        />
                                    }
                                    label={
                                        atividade.nomeAtividade.charAt(0).toUpperCase() +
                                        atividade.nomeAtividade.slice(1)
                                    }
                                    sx={{ flex: "1 0 45%" }}
                                />
                            </div>
                        ))}
                    </FormGroup>
                </FormControl>

                <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 2, width: "100%" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: { xs: "100%", sm: "40%", md: "30%" } }} // Modificado para que o botão se ajuste ao tamanho da tela
                    >
                        {label}
                    </Button>
                    <Button
                        component={Link}
                        to="/home"
                        variant="contained"
                        color="secondary"
                        sx={{ width: { xs: "100%", sm: "40%", md: "30%" } }} // Modificado para que o botão se ajuste ao tamanho da tela
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CadastroLocalForm;