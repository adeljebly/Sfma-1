import { createTranslator } from "next-intl";
import ProfileClient from "./Components/ClientTab";
import ProfilePage from "./Components/ProfilePage";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages, namespace: "Profile" });

  return <ProfilePage />;
};

export default Page;
