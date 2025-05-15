import LoginForm from "../../components/molecules/LoginForm";
import PublicFooter from "../../components/organisms/PublicFooter";

function LoginPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <LoginForm />
            <PublicFooter />
        </div>
    );
}

export default LoginPage;