import { AppBar, Button, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from "@mui/material";
// import "./style.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useApiUsuario } from "../../../hooks/useApiUsuario";
import { getCookie } from "../../../hooks/useCookies";
import { useTheme } from "@mui/material/styles";
import { Draw } from "@mui/icons-material";
const menuOptions = [
    { text: 'Pagina Inicial', link: '/home' },
    { text: 'Cadastrar Local', link: '/cadastroLocal' },
    { text: 'Listar Locais', link: '/listaLocal' },
    { text: 'Sair', action: 'logout' }
];

function ExerciseOpenAirHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout } = useApiUsuario();
    const [mobileManuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout(getCookie("usuarioLogado"));
        setAnchorEl(null);
        // navigate("/login");
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileManuOpen);
    }

    const handleOptionClick = (action) => {
        if (action === 'logout') {
            handleLogout();
        }
        setMobileMenuOpen(false);
    };




    return (
        <AppBar className="header" position="fixed"
            sx={{
                backgroundColor: "rgb(156,192,227)",
                boxShadow: "none",
                height: "60px",
            }}>
            <Toolbar className="navbar"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Typography className="logoHeader"
                    variant="h6" component="div"
                    sx={{
                        flexGrow: 1,
                        marginLeft: "20px",
                    }}>
                    <Link className="labelHome" to="/home" style={{ display: 'flex' }}>
                        <img src="/assets/logo-exercita365.png"
                            alt="Logo da página"
                            style={{ width: '50px', height: '50px' }} />
                    </Link>
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            arial-label="menu"
                            onClick={toggleMobileMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={mobileManuOpen}
                            onClose={toggleMobileMenu}
                        >
                            <div style={{ width: 250 }}>
                                <List>
                                    <ListItem>
                                        <ListItemText disabled> {getCookie("usuarioLogado")}</ListItemText>
                                    </ListItem>
                                    <Divider />
                                    {menuOptions.map((option, index) => (
                                        <ListItem
                                            button
                                            key={index}
                                            component={Link}
                                            to={option.link}
                                            onClick={() => handleOptionClick(option.action)}
                                        >
                                            <ListItemText primary={option.text} />
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </Drawer>
                    </>
                ) : (
                    <>



                        <Button
                            color="inherit"
                            component={Link}
                            to="/cadastroLocal"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: "white",
                            }}>Cadastrar Local
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/listaLocal"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: "white",
                            }}>Listar Locais
                        </Button>


                        <Button
                            color="inherit"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            className="sair">
                            <AccountCircleIcon sx={{ color: "withe", fontSize: 35 }} />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem disabled>{getCookie("usuarioLogado")}</MenuItem>
                            <MenuItem onClick={handleLogout}>Sair</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default ExerciseOpenAirHeader;
