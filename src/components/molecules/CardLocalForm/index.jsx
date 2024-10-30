import {
    Box,
    Divider,
    Card,
    CardContent,
    Typography,
    Grid,
    CardActions,
    IconButton,
    Button
} from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useNavigate } from "react-router-dom";
import MapaForm from "../MapaForm";
import { useApiLocal } from "../../../hooks/useApiLocal";

function CardLocalForm({ dadosLocal, visivel }) {
    const { removerLocal } = useApiLocal();
    const navigate = useNavigate();

    const listaAtividades = dadosLocal.atividades.map(
        (atividade) => atividade.nomeAtividade
    );

    function editarLocalSelecionado(idSelecionado) {
        navigate(`/cadastroLocal/${idSelecionado}`);
    }

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: { xs: "100%", sm: "80vw", md: "60rem" },
                marginBottom: 2,
                boxShadow: 4,
                overflow: "hidden",
            }}
        >
            <Grid
                height={{ xs: "300px", md: "352px" }}
                width={{ xs: "100%", md: "300px" }}
                sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: { md: 2 }
                }}
            >
                <MapaForm {...dadosLocal} />
                <IconButton
                    onClick={() => window.open(dadosLocal.linkmap, "_blank")}
                    size="large"
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        zIndex: 1000,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: 3,
                    }}
                >
                    <MapOutlinedIcon fontSize="large" />
                </IconButton>
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2,
                    flexGrow: 1,
                    marginBottom: { sm: 2, md: 2 },
                }}
            >
                <CardContent sx={{ paddingBottom: 0 }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                        {dadosLocal.nome}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {dadosLocal.descricao}
                    </Typography>
                    <Divider sx={{ mb: 1 }}>Endereço</Divider>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                        Logradouro: {dadosLocal.logradouro}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Município/Estado: {dadosLocal.municipio} / {dadosLocal.uf}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Latitude: {dadosLocal.latitude}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Longitude: {dadosLocal.longitude}
                    </Typography>
                </CardContent>

                <Divider sx={{ my: 2 }}>Atividades</Divider>
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 2
                    }}
                >
                    {listaAtividades.map((element, index) => (
                        <Typography key={index}>
                            {element.charAt(0).toUpperCase() + element.slice(1)}
                        </Typography>
                    ))}
                </Grid>
                {visivel && (
                    <CardActions
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2
                        }}
                    >
                        <Button onClick={() => editarLocalSelecionado(dadosLocal.id)} size="small">
                            Editar
                        </Button>
                        <Button onClick={() => removerLocal(dadosLocal.id)} size="small">
                            Excluir
                        </Button>
                    </CardActions>
                )}
            </Box>
        </Card>
    );
}

export default CardLocalForm;
