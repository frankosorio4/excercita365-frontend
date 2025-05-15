import LayoutComum from "../../components/molecules/LayoutComumLocais/LayoutComumLocais";
import PublicFooter from "../../components/organisms/PublicFooter";

function DashboardPage() {
    return (
        <>
            <LayoutComum titulo="Locais incríveis - Página Publica" showAuthButtons={true} visivel={false} />
            <PublicFooter />
        </>
    );
}

export default DashboardPage;