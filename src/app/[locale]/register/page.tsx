import { createTranslator } from "next-intl";
import React from "react";
import RegisterForm from "./Components/RegisterForm";
import "react-toastify/dist/ReactToastify.css";
import RegisterFormWrapper from "../Components/RegisterFormWrapper";
import { ToastContainer } from "react-toastify";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Register",
  });

  return (
    <div
      dir={`${locale === "en" ? "ltr" : "rtl"}`}
      className="min-h-screen flex justify-center container mx-auto"
    >
      <RegisterFormWrapper
        locale={locale}
        messages={messages}
        from_login={false}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default Page;
