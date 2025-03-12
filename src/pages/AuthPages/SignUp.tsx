import AuthLayout from "./AuthPageLayout";
import SignUpFormOne from "../../components/auth/SignUpFormOne";
import SignUpFormThree from "../../components/auth/SignUpFormThree";

export default function SignUp() {
  return (
    <>
      <AuthLayout>
        <SignUpFormThree />
      </AuthLayout>
    </>
  );
}
