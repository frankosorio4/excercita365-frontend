import { Grid } from "@mui/material";
import styles from "./CadastroLocalPage.module.css";
import CadastroLocalForm from "../../components/molecules/CadastroLocalForm";

function CadastroLocalPage() {
    return (
        <>
            {/* <Grid className={styles.containerPrincipalLocal}> */}
            <CadastroLocalForm />
            {/* </Grid> */}
        </>
    );
}

export default CadastroLocalPage;
