import React from "react";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "Information we collect",
    body: [
      "We collect your personal data when you register or sign up, make purchases, or interact with us via the Platform or our services.",
      "This includes but is not limited to: name, date of birth, address, phone number, email ID, proof of identity/address documents, payment details (bank account, debit/credit card info), and biometric or facial information (only where applicable and with consent).",
      "You always have the option not to provide information by choosing not to use a specific service or feature.",
      "We also track user behavior and preferences for internal analytics. Transaction-related data from third-party platforms may also be collected, and their use of your data will be subject to their own privacy policies.",
    ],
    callout: "⚠️ Fraud Alert: We will never ask for sensitive data like PINs or passwords. If you receive such requests, report them immediately to law enforcement.",
  },
  {
    title: "Usage of your information",
    body: [
      "We use your information to provide and improve services, fulfil orders, customize your experience, send updates and offers, detect and prevent fraud, enforce our policies, and conduct research and surveys.",
      "We may also use your data for marketing, but you will always have the option to opt out.",
    ],
  },
  {
    title: "Sharing of personal data",
    body: [
      "We may share your data with our group companies, affiliates, and partners; sellers, logistics providers, and payment partners; and third-party services or reward programs you opt into.",
      "We may disclose data to government agencies or law enforcement when required, to protect the rights, property, or safety of users or the public, or in good faith if needed to respond to legal notices.",
    ],
  },
  {
    title: "Security precautions",
    body: [
      "We follow reasonable security practices to protect your data — it is stored securely, and a secure server is used for transactions.",
      "However, data transmission over the internet is not 100% secure, and users are advised to protect their login details.",
    ],
  },
  {
    title: "Data deletion & retention",
    body: [
      "You can delete your account through your profile or by contacting us.",
      "We may retain your data if there are pending services, grievances, or legal reasons. After deletion, we may keep anonymized data for analytics.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You may access, update, or correct your personal data directly via your account.",
    ],
  },
  {
    title: "Consent",
    body: [
      "By visiting or using our Platform, you consent to the collection and processing of your data under this Privacy Policy, and authorize us and our partners to contact you via SMS, call, email, etc., unless you opt out.",
      'To withdraw consent, write to our Grievance Officer (contact below) with the subject line: "Withdrawal of consent for processing personal data".',
      "Note: withdrawal will not be retrospective and may limit our ability to provide services.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. We encourage you to review it periodically. Major changes will be communicated as per legal requirements.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#2E2E2E] font-sans">
      {/* Hero */}
      <section className="bg-[#FAF7F4] border-b border-[#E8DDD3]">
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-[#B76E79] font-medium mb-3">
            Legal
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-[#2E2E2E] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#2E2E2E]/65 max-w-xl leading-relaxed">
            This Privacy Policy describes how Shop Sangam (parent company of
            Zaishree) collects, uses, shares, protects, or otherwise
            processes your personal data through www.zaishree.com.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-3xl mx-auto px-6 pt-14">
        <h2 className="font-serif text-xl text-[#2E2E2E] mb-3">Introduction</h2>
        <div className="space-y-3">
          <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
            Please note that while some sections of the Platform may be
            accessible without registration, we do not offer
            products/services outside India and your data will be primarily
            stored and processed in India.
          </p>
          <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
            By visiting our Platform, providing your information, or
            availing any product/service, you expressly agree to be bound
            by this Privacy Policy, our Terms of Use, and the applicable
            product/service terms, and to be governed by the laws of India
            including those related to data protection and privacy.
          </p>
          <p className="text-sm text-[#2E2E2E]/70 leading-relaxed font-medium">
            If you do not agree, please do not use or access our Platform.
          </p>
        </div>
      </section>

      {/* Numbered / titled sections */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-xl text-[#2E2E2E] mb-3">{s.title}</h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm text-[#2E2E2E]/70 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {s.callout && (
                <div className="mt-4 bg-[#FAF7F4] border border-[#E8DDD3] rounded-sm px-5 py-4">
                  <p className="text-sm text-[#B76E79] leading-relaxed">{s.callout}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Grievance Officer */}
      <section className="border-t border-[#E8DDD3] bg-[#2E2E2E] text-white">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-xs tracking-[0.2em] uppercase text-[#B76E79] font-medium mb-4">
            Grievance officer
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/80">
            <p><span className="text-white/50">Name:</span> Preeti</p>
            <p><span className="text-white/50">Designation:</span> Privacy &amp; Compliance Officer</p>
            <p><span className="text-white/50">Company:</span> Shop Sangam (Zaishree)</p>
            <p><span className="text-white/50">Address:</span> Shakarpur, East Delhi, Delhi, 110092</p>
            <p><span className="text-white/50">Email:</span> support@zaishree.com</p>
            <p><span className="text-white/50">Phone:</span> +91 96347 43329</p>
            <p className="sm:col-span-2">
              <span className="text-white/50">Working hours:</span> Monday – Friday, 9:00 AM – 6:00 PM
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#FAF7F4] border-t border-[#E8DDD3]">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <p className="text-sm text-[#2E2E2E]/65 mb-3">
            Looking for our Terms & Conditions or shipping/returns policy?
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              to="/terms"
              className="text-sm tracking-wide uppercase text-[#B76E79] border-b border-[#B76E79] pb-0.5 hover:text-[#A85F6B] hover:border-[#A85F6B] transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/policy"
              className="text-sm tracking-wide uppercase text-[#B76E79] border-b border-[#B76E79] pb-0.5 hover:text-[#A85F6B] hover:border-[#A85F6B] transition-colors"
            >
              Our policies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}