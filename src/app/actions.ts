"use server";

import { Resend } from "resend";
import { getTranslations } from "next-intl/server"; // For i18n in server actions
import { ConsultationFormData, ContactFormData, PricingFormData } from '../types';

const resend = new Resend(process.env.RESEND_API_KEY);
const resend2 = new Resend(process.env.RESEND_API_KEY2);


export async function sendContactEmail(data: ContactFormData) {
  const t = await getTranslations("contact.general"); // Use i18n for general contact form

  // Verify reCAPTCHA token
  if (!data.recaptchaToken) {
    return { success: false, error: "reCAPTCHA verification failed" };
  }

  try {
    // Verify with Google's reCAPTCHA API
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${data.recaptchaToken}`,
      { method: "POST" }
    );

    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      return { success: false, error: "reCAPTCHA verification failed" };
    }

    // Format the email content
    const emailContent = `
      <h1>${t("emailFormat.subject")} (${data?.subject || "N/A"})</h1>
      <p><strong>${t("emailFormat.name")}:</strong> ${data.name}</p>
      <p><strong>${t("emailFormat.email")}:</strong> ${data.email}</p>
      <h2>${t("emailFormat.message")}</h2>
      <p>${data.message}</p>
    `;

    await resend2.emails.send({
      from: "info@albrecht-marketing.com",
      to: "mohammad.zaghloul@albrecht-marketing.com",
      subject: `${t("emailFormat.newContact")}: ${data.subject}`,
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

export async function sendConsultationEmail(data: ConsultationFormData) {
  const t = await getTranslations("contact.consultation.multiStepForm"); // Use i18n on server

  // Format the email content from form data
  const emailContent = `
    <h1>${t("emailFormat.subject")}</h1>
    <h2>${t("emailFormat.step1")}</h2>
    <p><strong>First Name:</strong> ${data.step1?.firstName || "N/A"}</p>
    <p><strong>Last Name:</strong> ${data.step1?.lastName || "N/A"}</p>
    <p><strong>Company Name:</strong> ${data.step1?.companyName || "N/A"}</p>
    <p><strong>Industry:</strong> ${data.step1?.industry || "N/A"}</p>
    <p><strong>Company Age:</strong> ${data.step1?.companyAge || "N/A"}</p>
    <p><strong>Country:</strong> ${data.step1?.country || "N/A"}</p>
    <p><strong>State:</strong> ${data.step1?.state || "N/A"}</p>
    <p><strong>Email:</strong> ${data.step1?.email || "N/A"}</p>
    <p><strong>Phone:</strong> ${data.step1?.phone || "N/A"}</p>

    <h2>${t("emailFormat.step2")}</h2>
    <p><strong>Website:</strong> ${data.step2?.website || "N/A"}</p>
    <p><strong>Instagram:</strong> ${data.step2?.instagram || "N/A"}</p>
    <p><strong>Facebook:</strong> ${data.step2?.facebook || "N/A"}</p>
    <p><strong>TikTok:</strong> ${data.step2?.tiktok || "N/A"}</p>
    <p><strong>YouTube:</strong> ${data.step2?.youtube || "N/A"}</p>
    <p><strong>X:</strong> ${data.step2?.x || "N/A"}</p>

    <h2>${t("emailFormat.step3")}</h2>
    <p><strong>Phase:</strong> ${data.step3?.phase || "N/A"}</p>
    <p><strong>Challenges:</strong> ${data.step3?.challenges || "N/A"}</p>

    <h2>${t("emailFormat.step4")}</h2>
    <p><strong>Launch Budget:</strong> ${data.step4?.launchBudget || "N/A"}</p>
    <p><strong>Running Budget:</strong> ${data.step4?.runningBudget || "N/A"}</p>
    <h2>${t("emailFormat.step5")}</h2>
    <p><strong>Additional Info:</strong> ${data.step5?.additionalInfo || "N/A"}</p>
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

export async function sendPricingEmail(data: PricingFormData) {
  const t = await getTranslations("contact.pricing.multiStepForm"); // Use i18n on server

  // Format the email content from form data
  const emailContent = `
    <h1>${t("emailFormat.subject")}</h1>
    
    <h2>${t("emailFormat.step1")}</h2>
    <p><strong>Selected Package:</strong> ${data.step1?.selectedPackage || "N/A"}</p>
    <p><strong>Selected Tier:</strong> ${data.step1?.selectedTier || "N/A"}</p>
    <p><strong>Company Name:</strong> ${data.step1?.companyName || "N/A"}</p>
    <p><strong>Industry:</strong> ${data.step1?.industry || "N/A"}</p>
    <p><strong>First Name:</strong> ${data.step1?.firstName || "N/A"}</p>
    <p><strong>Last Name:</strong> ${data.step1?.lastName || "N/A"}</p>
    <p><strong>Email:</strong> ${data.step1?.email || "N/A"}</p>

    <h2>${t("emailFormat.step2")}</h2>
    <p><strong>Current Situation:</strong> ${data.step2?.currentSituation || "N/A"}</p>
    <p><strong>Primary Goals:</strong> ${data.step2?.primaryGoals?.join(", ") || "N/A"}</p>
    <p><strong>Timeline:</strong> ${data.step2?.timeline || "N/A"}</p>

    <h2>${t("emailFormat.step3")}</h2>
    <p><strong>Package-Specific Requirements:</strong></p>
    ${Object.entries(data.step3?.packageSpecific || {}).map(([key, value]) => 
      `<p><strong>${key}:</strong> ${Array.isArray(value) ? value.join(", ") : value}</p>`
    ).join("")}

    <h2>${t("emailFormat.step4")}</h2>
    <p><strong>Budget Range:</strong> ${data.step4?.budgetRange || "N/A"}</p>
    <p><strong>Additional Services:</strong> ${data.step4?.additionalServices?.join(", ") || "None"}</p>
    <p><strong>Preferred Start Date:</strong> ${data.step4?.startDate || "N/A"}</p>

    <h2>${t("emailFormat.step5")}</h2>
    <p><strong>Phone:</strong> ${data.step5?.phone || "N/A"}</p>
    <p><strong>Communication Preference:</strong> ${data.step5?.communicationPreference || "N/A"}</p>
    <p><strong>Additional Info:</strong> ${data.step5?.additionalInfo || "N/A"}</p>
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