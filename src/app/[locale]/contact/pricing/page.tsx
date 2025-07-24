import React, { Suspense } from "react";
import PricingContactForm from "@/app/components/contact/pricing-form";

function pricingContactPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Suspense fallback={<div>Loading...</div>}>
      <PricingContactForm />
      </Suspense>
    </div>
  );
}

export default pricingContactPage;
