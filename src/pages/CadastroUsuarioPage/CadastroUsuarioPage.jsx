/* eslint-disable */
import { Grid } from "@mui/material";
import CadastroUsuarioForm from "../../components/molecules/CadastroUsuarioForm";
import styles from "./CadastroUsuarioPage.module.css";

function CadastroUsuarioPage() {
 return (
  <Grid className={styles.containerUsuarioPrincipal}>
   <CadastroUsuarioForm />
  </Grid>
 );
}

export default CadastroUsuarioPage;
