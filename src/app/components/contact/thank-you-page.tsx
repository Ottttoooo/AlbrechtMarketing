import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, Mail, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Component() {
    const t = useTranslations("contact.thankYou");
  return (
    <div className="min-h-screen bg-gradient-to-br bg-lightNeutral flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            {/* Thank You Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">{t("content.thankYouMessage")}</h1>
              <p className="text-gray-600">
                {t("content.thankYouDescription")}
              </p>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">{t("content.nextStepsTitle")}</span>
              </div>
              <p className="text-sm text-blue-600">
                {t("content.nextStepsDescription")}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="gap-2 flex flex-col">
              <Link href="/" className="w-full">
                <Button className="w-full" size="lg">
                  <Home className="w-4 h-4 mr-2" />
                  {t("content.backToHome")}
                </Button>
              </Link>

              <Link href="/contact/general" className="w-full">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                >
                  {t("content.sendUsMessage")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Footer Message */}
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500">
                {t("content.supportTitle")}{" "}
                <a
                  href="mailto:info@albrecht-marketing.com"
                  className="text-blue-600 hover:underline"
                >
                  info@albrecht-marketing.com
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
