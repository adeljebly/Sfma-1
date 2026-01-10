import { createTranslator } from "next-intl";
import React from "react";
import AboutSection from "./Components/AboutSection";
import QouteSection from "./Components/QouteSection";
import MotivatorsSection from "./Components/MotivatorsSection";
import Our_Vision from "./Components/Our_Vision";
import ValuesSection from "./Components/ValuesSection";
import Our_Goals from "./Components/Our_Goals";
import PillarsSection from "./Components/PillarsSection";
import Our_Tasks from "./Components/Our_Tasks";
import Our_Message from "./Components/Our_Message";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "AboutPage",
  });

  return (
    <div className="mt-10">
      <AboutSection
        title={t("AboutSection.title")}
        description={t("AboutSection.description")}
        lang={locale}
      />
      <QouteSection />
      <MotivatorsSection
        title={t("MotivatorsSection.title")}
        description={t("MotivatorsSection.description")}
        p={[
          t("MotivatorsSection.p_1"),
          t("MotivatorsSection.p_2"),
          t("MotivatorsSection.p_3"),
          t("MotivatorsSection.p_4"),
          t("MotivatorsSection.p_5"),
          t("MotivatorsSection.p_6"),
        ]}
        lang={locale}
      />
      <Our_Tasks />
      <Our_Vision />
      <Our_Message />
      <ValuesSection />
      <Our_Goals
        title={t("OurGoalsSection.title")}
        description={t("OurGoalsSection.description")}
        p={[
          t("OurGoalsSection.p_1"),
          t("OurGoalsSection.p_2"),
          t("OurGoalsSection.p_3"),
          t("OurGoalsSection.p_4"),
          t("OurGoalsSection.p_5"),
        ]}
        lang={locale}
      />
      <PillarsSection
        title={t("PillarsSection.title")}
        description={t("PillarsSection.description")}
        p={[
          t("PillarsSection.p_1"),
          t("PillarsSection.p_2"),
          t("PillarsSection.p_3"),
          t("PillarsSection.p_4"),
          t("PillarsSection.p_5"),
          t("PillarsSection.p_6"),
          t("PillarsSection.p_7"),
          t("PillarsSection.p_8"),
          t("PillarsSection.p_9"),
        ]}
        lang={locale}
      />
    </div>
  );
};

export default Page;
