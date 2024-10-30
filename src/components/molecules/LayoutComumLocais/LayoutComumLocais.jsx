import { Badge, Grid, Typography, Button, Box } from "@mui/material";
import CardLocalForm from "../CardLocalForm";
import { useApiLocal } from "../../../hooks/useApiLocal";
import { useApiUsuario } from "../../../hooks/useApiUsuario";
import PeopleIcon from '@mui/icons-material/People';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Link } from "react-router-dom";
import { useEffect } from "react";

function LayoutComum({ titulo, showAuthButtons, showIcons, visivel }) {
    const { locais, totalLocais, getLocais } = useApiLocal();
    const { totalOnline } = useApiUsuario();

    useEffect(() => {
        getLocais();
    }, []);

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            sx={{
                minHeight: "100vh",
                padding: { xs: "10px", md: "20px" },
                width: "100%",
                maxWidth: "100%",
                margin: "60px auto",
                borderRadius: "10px",
                overflowX: "hidden",
            }}
        >
            {showAuthButtons && (
                <>
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{ textAlign: 'center', fontSize: { xs: "2rem", md: "2.5rem" } }}
                    >
                        Junte-se à nossa rede de pessoas apaixonadas por atividades físicas!
                    </Typography>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ textAlign: 'center', fontSize: { xs: "1.2rem", md: "1.5rem" } }}
                    >
                        Transforme sua vida com exercícios e alcance seus objetivos de saúde e bem-estar.
                    </Typography>
                    <Grid
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            gap: { xs: "10px", md: "20px" },
                            margin: "20px 0",
                            flexWrap: "wrap"
                            // flexDirection: { xs: "column", md: "row" },
                        }}
                    >
                        <Badge color="primary" badgeContent={totalOnline} max={999}>
                            <PeopleIcon sx={{ color: "black", fontSize: 35 }} />
                        </Badge>
                        <Badge color="primary" badgeContent={totalLocais} max={999}>
                            <FmdGoodIcon sx={{ color: "black", fontSize: 35 }} />
                        </Badge>
                    </Grid>

                    <Box mt={3} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Grid
                            sx={{
                                display: "flex",
                                gap: { xs: "10px", md: "15px" },
                                flexDirection: { xs: "column", sm: "row" },
                                width: { xs: "auto", md: "60%" },
                                justifyContent: "center",
                                marginBottom: { xs: "20px", md: "30px" },
                            }}
                        >
                            <Link to={`/cadastroUsuario`} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Cadastre-se
                                </Button>
                            </Link>
                            <Link to={`/login`} style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" color="primary" fullWidth>
                                    Login
                                </Button>
                            </Link>
                        </Grid>
                    </Box>
                </>
            )}

            {showIcons && !showAuthButtons && (
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        gap: { xs: "10px", md: "20px" },
                        margin: "20px 0",
                        flexWrap: "wrap",
                    }}
                >
                    <Badge color="primary" badgeContent={totalOnline} max={999}>
                        <PeopleIcon sx={{ color: "black", fontSize: 35 }} />
                    </Badge>
                    <Badge color="primary" badgeContent={totalLocais} max={999}>
                        <FmdGoodIcon sx={{ color: "black", fontSize: 35 }} />
                    </Badge>
                </Grid>
            )}

            <Typography
                variant="h4"
                sx={{ fontSize: { xs: "1.5rem", md: "2rem", xl: "3rem" }, textAlign: "center", margin: "20px 0" }}
            >
                {titulo}
            </Typography>

            <Grid
                container
                direction="column"
                alignItems="center"
                sx={{
                    marginTop: "60px",
                    width: "100%",
                    // backgroundColor: "#e5e5e5",
                    zIndex: 1,
                }}
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    sx={{
                        width: "100%",
                        // maxWidth: "1200px",
                        padding: { xs: "10px", sm: "20px" },
                        gap: { xs: "10px", md: "20px" },
                    }}
                >
                    {locais.map((local, index) => (
                        <CardLocalForm
                            dadosLocal={local}
                            key={index}
                            visivel={visivel}
                            sx={{
                                width: "100%",
                                maxWidth: { xs: "100%", md: "500px" },
                                margin: { xs: "10px 0", md: "20px 0" },
                                display: "flex",
                                justifyContent: "center",

                            }
                            }
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LayoutComum;
