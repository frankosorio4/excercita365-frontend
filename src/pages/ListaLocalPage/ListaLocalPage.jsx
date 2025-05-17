import LayoutComum from "../../components/molecules/LayoutComumLocais/LayoutComumLocais";

function ListaLocalPage() {
 return (
    <LayoutComum
            titulo={`Locais criados por você `}
            showAuthButtons={false}
            showIcons={false}
            visivel={true}
        />
 );
}

export default ListaLocalPage;
