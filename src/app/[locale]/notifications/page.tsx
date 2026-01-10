import { createTranslator } from "next-intl";
import Notifications from "./Components/Notifications";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "Training",
  });

  return (
    <div className="">
      <Notifications />
    </div>
  );
};

export default Page;
