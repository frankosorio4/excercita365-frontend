import { useEffect, useState } from "react";
import { setCookie, eraseCookie, getCookie } from "./useCookies.js";
//import { isTokenValid } from "./useValidaToken.js";

export const useApiUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);// parece no usarse para nada
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalOnline, setTotalOnline] = useState(0);
    const token = getCookie("authToken");

    useEffect(() => {
        getUsuariosLogados();
    }, []);

    const getUsuariosLogados = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/dashboard/usuarios`);

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.mensagem);
                setError(errorData.mensagem);
                return;
            }

            const data = await response.json();
            setUsuarios(data);
            setTotalOnline(data.online);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setError(error.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }

    const login = async (dadosUsuario) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/login`, {
                method: "POST",
                body: JSON.stringify(dadosUsuario),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response);

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
            //console.log("Total online:", totalOnline);// this console log not show the total online because the delay of the setState
            atualizarStatusUsuario(data.nome, data.usuarioId, true);

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
            const response = await fetch(`${import.meta.env.VITE_URL_API}/cadastrar`, {
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
            getUsuariosLogados();
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
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            console.log("Usuário atualizado com sucesso!");
            getUsuariosLogados();
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
                const response = await fetch(`${import.meta.env.VITE_URL_API}/usuarios`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.mensagem);
                    return;
                }

                const dados = await response.json();
                console.log(dados.email);

                if (dados.email === emailUsuarioLogado) {
                    await atualizarStatusUsuario(dados, dados.id, false);
                    setTotalOnline((totalOnline) => totalOnline - 1);
                    eraseCookie("authToken");
                    eraseCookie("usuarioLogado");
                    eraseCookie("usuarioId");
                }

            } else {
                eraseCookie("authToken");
                eraseCookie("usuarioLogado");
            }

            const pathsToExclude = ["/public", "/cadastroUsuario", "/login"];
            if (!pathsToExclude.includes(window.location.pathname)) {
                window.location.href = "/public";
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
        getUsuariosLogados,
        cadastrarUsuario,
        logout,
        atualizarStatusUsuario,
        login
    };
};
