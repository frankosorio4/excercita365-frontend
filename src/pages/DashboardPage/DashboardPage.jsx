import LayoutComum from "../../components/molecules/LayoutComumLocais/LayoutComumLocais";
import ExerciseOpenAirFooter from "../../components/organisms/ExerciseOpenAirFooter";

function DashboardPage() {
    return (
        <>
            <LayoutComum titulo="Locais incríveis - Página Publica" showAuthButtons={true} visivel={false} />
            <ExerciseOpenAirFooter />
        </>
    );
}

export default DashboardPage;