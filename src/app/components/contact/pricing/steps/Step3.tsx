"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { PricingStepProps } from "../../pricing-form";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useWatch } from "react-hook-form";

export const PricingStep3 = ({ form }: PricingStepProps) => {
  const t = useTranslations("contact.pricing.multiStepForm.step3");
  const selectedPackage = useWatch({
    control: form.control,
    name: "step1.selectedPackage",
  });

  const renderStartPackageQuestions = () => (
    <div className="space-y-6">
      {/* Existing Branding */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.existingBranding"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("start.existingBranding.label")}</FormLabel>
            <FormDescription>{t("start.existingBranding.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="complete" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("start.existingBranding.options.complete")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="partial" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("start.existingBranding.options.partial")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="none" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("start.existingBranding.options.none")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Website Complexity */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.websiteComplexity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("start.websiteComplexity.label")}</FormLabel>
            <FormDescription>{t("start.websiteComplexity.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="landing-page" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("start.websiteComplexity.options.landingPage")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="small-business" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("start.websiteComplexity.options.smallBusiness")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="comprehensive" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("start.websiteComplexity.options.comprehensive")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Content Creation Needs */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.contentCreationNeeds"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">{t("start.contentCreationNeeds.label")}</FormLabel>
              <FormDescription>{t("start.contentCreationNeeds.description")}</FormDescription>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "copywriting", label: t("start.contentCreationNeeds.options.copywriting") },
                { id: "photography", label: t("start.contentCreationNeeds.options.photography") },
                { id: "graphics", label: t("start.contentCreationNeeds.options.graphics") },
                { id: "video", label: t("start.contentCreationNeeds.options.video") },
                { id: "blog-content", label: t("start.contentCreationNeeds.options.blogContent") },
              ].map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="step3.packageSpecific.contentCreationNeeds"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={Array.isArray(field.value) && field.value.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const currentValue = Array.isArray(field.value) ? field.value : [];
                              return checked
                                ? field.onChange([...currentValue, item.id])
                                : field.onChange(
                                    currentValue.filter((value: string) => value !== item.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal !mt-0">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderGrowPackageQuestions = () => (
    <div className="space-y-6">
      {/* Current Performance */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.currentWebsiteTraffic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("grow.currentWebsiteTraffic.label")}</FormLabel>
            <FormDescription>{t("grow.currentWebsiteTraffic.description")}</FormDescription>
            <FormControl>
              <Input placeholder={t("grow.currentWebsiteTraffic.placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Target Audience */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.targetAudience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("grow.targetAudience.label")}</FormLabel>
            <FormDescription>{t("grow.targetAudience.description")}</FormDescription>
            <FormControl>
              <Input placeholder={t("grow.targetAudience.placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Geographic Targeting */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.geographicTargeting"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("grow.geographicTargeting.label")}</FormLabel>
            <FormDescription>{t("grow.geographicTargeting.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="local" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("grow.geographicTargeting.options.local")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="national" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("grow.geographicTargeting.options.national")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="international" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("grow.geographicTargeting.options.international")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Ad Platforms */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.preferredAdPlatforms"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">{t("grow.preferredAdPlatforms.label")}</FormLabel>
              <FormDescription>{t("grow.preferredAdPlatforms.description")}</FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: "google-ads", label: t("grow.preferredAdPlatforms.options.googleAds") },
                { id: "facebook-instagram", label: t("grow.preferredAdPlatforms.options.facebookInstagram") },
                { id: "linkedin", label: t("grow.preferredAdPlatforms.options.linkedin") },
                { id: "tiktok", label: t("grow.preferredAdPlatforms.options.tiktok") },
                { id: "youtube", label: t("grow.preferredAdPlatforms.options.youtube") },
              ].map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="step3.packageSpecific.preferredAdPlatforms"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={Array.isArray(field.value) && field.value.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const currentValue = Array.isArray(field.value) ? field.value : [];
                              return checked
                                ? field.onChange([...currentValue, item.id])
                                : field.onChange(
                                    currentValue.filter((value: string) => value !== item.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal !mt-0">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderMaintainPackageQuestions = () => (
    <div className="space-y-6">
      {/* Current SEO Performance */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.currentSeoPerformance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("maintain.currentSeoPerformance.label")}</FormLabel>
            <FormDescription>{t("maintain.currentSeoPerformance.description")}</FormDescription>
            <FormControl>
              <Input placeholder={t("maintain.currentSeoPerformance.placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Existing Campaigns */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.existingCampaigns"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("maintain.existingCampaigns.label")}</FormLabel>
            <FormDescription>{t("maintain.existingCampaigns.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="performing-well" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("maintain.existingCampaigns.options.performingWell")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="need-optimization" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("maintain.existingCampaigns.options.needOptimization")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no-campaigns" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("maintain.existingCampaigns.options.noCampaigns")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Maintenance Frequency */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.maintenanceFrequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("maintain.maintenanceFrequency.label")}</FormLabel>
            <FormDescription>{t("maintain.maintenanceFrequency.description")}</FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="weekly" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("maintain.maintenanceFrequency.options.weekly")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="biweekly" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("maintain.maintenanceFrequency.options.biweekly")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="monthly" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("maintain.maintenanceFrequency.options.monthly")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="as-needed" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t("maintain.maintenanceFrequency.options.asNeeded")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Priority Areas */}
      <FormField
        control={form.control}
        name="step3.packageSpecific.priorityAreas"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">{t("maintain.priorityAreas.label")}</FormLabel>
              <FormDescription>{t("maintain.priorityAreas.description")}</FormDescription>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "seo-optimization", label: t("maintain.priorityAreas.options.seoOptimization") },
                { id: "ad-performance", label: t("maintain.priorityAreas.options.adPerformance") },
                { id: "social-media", label: t("maintain.priorityAreas.options.socialMedia") },
                { id: "content-updates", label: t("maintain.priorityAreas.options.contentUpdates") },
                { id: "analytics-reporting", label: t("maintain.priorityAreas.options.analyticsReporting") },
              ].map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="step3.packageSpecific.priorityAreas"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={Array.isArray(field.value) && field.value.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const currentValue = Array.isArray(field.value) ? field.value : [];
                              return checked
                                ? field.onChange([...currentValue, item.id])
                                : field.onChange(
                                    currentValue.filter((value: string) => value !== item.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal !mt-0">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
      <p className="text-gray-600 mb-6">
        {t("description", { package: selectedPackage || "selected" })}
      </p>

      {selectedPackage === "start" && renderStartPackageQuestions()}
      {selectedPackage === "grow" && renderGrowPackageQuestions()}
      {selectedPackage === "maintain" && renderMaintainPackageQuestions()}
    </>
  );
};
