"use server";

import { Resend } from "resend";
import { getTranslations } from "next-intl/server"; // For i18n in server actions

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConsultationEmail(data: {
  step1?: {
    firstName: string;
    lastName: string;
    companyName: string;
    industry: string;
    companyAge: string;
    country: string;
    state: string;
    email: string;
    phone?: string;
  };
  step2?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    x?: string;
  };
  step3?: {
    phase: string;
    challenges: string;
  };
  step4?: {
    launchBudget: string;
    runningBudget: string;
  };
}) {
  const t = await getTranslations("Contact.consultation.multiStepForm"); // Use i18n on server

  // Format the email content from form data
  const emailContent = `
    <h1>${t("emailFormat.subject")}</h1>
    <h2>${t("emailFormat.step1")}</h2>
    <p>First Name: ${data.step1?.firstName || "N/A"}</p>
    <p>Last Name: ${data.step1?.lastName || "N/A"}</p>
    <p>Company Name: ${data.step1?.companyName || "N/A"}</p>
    <p>Industry: ${data.step1?.industry || "N/A"}</p>
    <p>Company Age: ${data.step1?.companyAge || "N/A"}</p>
    <p>Country: ${data.step1?.country || "N/A"}</p>
    <p>State: ${data.step1?.state || "N/A"}</p>
    <p>Email: ${data.step1?.email || "N/A"}</p>
    <p>Phone: ${data.step1?.phone || "N/A"}</p>

    <h2>${t("emailFormat.step2")}</h2>
    <p>Website: ${data.step2?.website || "N/A"}</p>
    <p>Instagram: ${data.step2?.instagram || "N/A"}</p>
    <p>Facebook: ${data.step2?.facebook || "N/A"}</p>
    <p>TikTok: ${data.step2?.tiktok || "N/A"}</p>
    <p>YouTube: ${data.step2?.youtube || "N/A"}</p>
    <p>X: ${data.step2?.x || "N/A"}</p>

    <h2>${t("emailFormat.step3")}</h2>
    <p>Phase: ${data.step3?.phase || "N/A"}</p>
    <p>Challenges: ${data.step3?.challenges || "N/A"}</p>

    <h2>${t("emailFormat.step4")}</h2>
    <p>Launch Budget: ${data.step4?.launchBudget || "N/A"}</p>
    <p>Running Budget: ${data.step4?.runningBudget || "N/A"}</p>
  `;

  try {
    await resend.emails.send({
      from: "info@albrecht-marketing.com",
      to: "mohammad.zaghloul@albrecht-marketing.com",
      subject: t("emailFormat.subject"),
      html: emailContent,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Unknown error occurred" };
    }
  }
}
