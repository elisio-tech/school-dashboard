import AuthLayout from "./AuthPageLayout";
import SignUpFormOne from "../../components/auth/SignUpFormOne";
import SignUpForm from "../../components/auth/stepForm/SignUpForm";

export default function SignUp() {
  return (
    <>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
