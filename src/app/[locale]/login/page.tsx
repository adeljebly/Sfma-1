import { createTranslator } from "next-intl";
import React from "react";
import LoginForm from "./Components/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterFormWrapper from "../Components/RegisterFormWrapper";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Login",
  });

  return (
    <div
      dir={`${locale === "en" ? "ltr" : "rtl"}`}
      className="flex justify-center container mx-auto"
    >
      <RegisterFormWrapper
        locale={locale}
        messages={messages}
        from_login={true}
      />
    </div>
  );
};

export default Page;
