import { useEffect, useState } from "react";
import { setCookie, eraseCookie, getCookie } from "./useCookies.js";
import { isTokenValid } from "./useValidaToken.js";

export const useApiUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalOnline, setTotalOnline] = useState(0);

    useEffect(() => {
        getContadorUsuariosLogados();
        const token = getCookie("authToken");
        if (token && isTokenValid(token)) {
            getUsuarios();
        } else {
            logout();
        }
    }, []);

    const getUsuarios = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/usuarios`);

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.mensagem);
                setError(errorData.mensagem);
                return;
            }

            const data = await response.json();
            console.log(data);
            setUsuarios(data);
            setTotalOnline(data.filter((usuario) => usuario.isOnline).length);
            console.log(
                "Total online:",
                data.filter((usuario) => usuario.isOnline).length
            );
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setError(error.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    const getContadorUsuariosLogados = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/usuarios`);

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }
            const data = await response.json();

            setTotalOnline(data.filter((usuario) => usuario.isOnline).length);
            console.log("Total online:", totalOnline);

        } catch (error) {
            console.error("Erro ao buscar contadores:", error);
        }
    };

    const login = async (dadosUsuario) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/login`, {
                method: "POST",
                body: JSON.stringify(dadosUsuario),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            const data = await response.json();
            const token = data.Authorization;

            // Armazenando em cookies
            setCookie("authToken", token, 1); 
            setCookie("usuarioLogado", dadosUsuario.email, 1);
            setCookie("usuarioId", data.usuarioId, 1);

            setTotalOnline(totalOnline + 1);
            console.log("Total online:", totalOnline);
            atualizarStatusUsuario(data.nome, data.usuarioId, true);
            console.log(totalOnline);
            
            return true;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    const cadastrarUsuario = async (dadosUsuario) => {
        const usuarioAdicionar = {
            ...dadosUsuario,
            isOnline: false
        };

        if (!usuarioAdicionar.nome) {
            alert("O usuário precisa ter um nome!");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/usuarios`, {
                method: "POST",
                body: JSON.stringify(usuarioAdicionar),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            alert("Usuário cadastrado com sucesso!");
            getUsuarios();
            return true;
        } catch (error) {
            console.error(
                "Erro ao cadastrar usuário:",
                error.message || "Erro desconhecido"
            );
            alert("Erro ao cadastrar usuário!");
        }
    };

    const atualizarStatusUsuario = async (dadosUsuario, id, status) => {
        const usuarioAtualizar = {
            ...dadosUsuario,
            isOnline: status
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/login/${id}`, {
                method: "PUT",
                body: JSON.stringify(usuarioAtualizar),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            console.log("Usuário atualizado com sucesso!");
            getUsuarios();
        } catch (error) {
            console.error(
                "Erro ao atualizar usuário:",
                error.message || "Erro desconhecido"
            );
        }
    };

    const logout = async (emailUsuarioLogado) => {
        try {
            if (emailUsuarioLogado) {
                const response = await fetch(`${import.meta.env.VITE_URL_API}/usuarios`);

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.mensagem);
                    return;
                }

                const dados = await response.json();

                for (const usuario of dados) {
                    if (usuario.email === emailUsuarioLogado) {
                        await atualizarStatusUsuario(usuario, usuario.id, false);
                        setTotalOnline((totalOnline) => totalOnline - 1);
                        eraseCookie("authToken");
                        eraseCookie("usuarioLogado");
                        eraseCookie("usuarioId");
                        break;
                    }
                }
            } else {
                eraseCookie("authToken");
                eraseCookie("usuarioLogado");
            }

            const pathsToExclude = ["/", "/cadastroUsuario", "/login"];
            if (!pathsToExclude.includes(window.location.pathname)) {
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Erro ao fazer logout:", error.message || "Erro desconhecido");
        }
    };

    return {
        usuarios,
        loading,
        error,
        totalOnline,
        getUsuarios,
        cadastrarUsuario,
        logout,
        atualizarStatusUsuario,
        login
    };
};
