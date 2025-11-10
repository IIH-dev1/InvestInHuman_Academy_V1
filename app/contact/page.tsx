"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Facebook, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SectionReveal } from "@/components/section-reveal";
import { useTranslation } from "@/lib/useTranslation";
import { FlagTN, FlagDE } from "@/components/flag-icon";
import { motion, AnimatePresence } from "framer-motion";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone format (optional field, but if provided should be valid)
  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = t("contact_error_name_required") || "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = t("contact_error_name_min") || "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = t("contact_error_email_required") || "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = t("contact_error_email_invalid") || "Please enter a valid email address";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = t("contact_error_phone_invalid") || "Please enter a valid phone number";
    }

    if (!formData.subject.trim()) {
      errors.subject = t("contact_error_subject_required") || "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      errors.subject = t("contact_error_subject_min") || "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      errors.message = t("contact_error_message_required") || "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = t("contact_error_message_min") || "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);
    setFormErrors({});
    setSubmitStatus("idle");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via our API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          inquiryType: 'general',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Email sent successfully');
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);

      // Set error message
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        setError(t("contact_network_error") || "Network error. Please check your connection.");
      } else {
        setError(t("contact_error") || "Error submitting form. Please try again.");
      }
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }; const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear field error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Clear general error when user makes changes
    if (error) {
      setError(null);
    }

    // Clear submit status
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              {t("contact_page_title") || "📍 Contact"}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg">
              {t("contact_page_subtitle") || "Nous sommes là pour vous accompagner dans votre réussite"}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <SectionReveal>
                <h2 className="text-3xl font-bold text-black mb-8">
                  {t("contact_info_title") || "Nos Bureaux"}
                </h2>
              </SectionReveal>

              {/* Tunisia Office */}
              <SectionReveal delay={0.1}>
                <Card className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MapPin className="h-6 w-6 text-amber-500" />
                      <FlagTN size="md" className="inline-block" /> {t("contact_tunisia_office") || "Invest in Human – Tunisie"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">{t("contact_tunisia_city") || "Tunis, Tunisia"}</p>
                        <p className="text-gray-600 text-sm">{t("contact_tunisia_address") || "Carthage Centre, 31 Av. De Carthage, Tunis 1001"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <a href="mailto:info@investinhuman.tn" className="text-amber-600 hover:text-amber-700 hover:underline">
                        {t("contact_tunisia_email") || "info@investinhuman.tn"}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <a href="tel:+21695186916" className="text-gray-700 hover:text-amber-600">
                        {t("contact_tunisia_phone") || "+216 95 186 916"}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>

              {/* Germany Office */}
              <SectionReveal delay={0.2}>
                <Card className="border-2 hover:border-amber-500 transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MapPin className="h-6 w-6 text-amber-500" />
                      <FlagDE size="md" className="inline-block" /> {t("contact_germany_office") || "Invest in Human – Allemagne"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">{t("contact_germany_city") || "Ludwigshafen am Rhein, Germany"}</p>
                        <p className="text-gray-600 text-sm">{t("contact_germany_address") || "Pfalzgrafenstraße 22, 67061 Ludwigshafen am Rhein"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <a href="mailto:info@investinhuman.de" className="text-amber-600 hover:text-amber-700 hover:underline">
                        {t("contact_germany_email") || "info@investinhuman.de"}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <div className="flex flex-col gap-1">
                        <a href="tel:+4962115963353" className="text-gray-700 hover:text-amber-600">
                          {t("contact_germany_phone1") || "+49 621 15963353"}
                        </a>
                        <a href="tel:+4917631233484" className="text-gray-700 hover:text-amber-600">
                          {t("contact_germany_phone2") || "+49 176 31233484"}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>

              {/* General Contact */}
              <SectionReveal delay={0.3}>
                <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader>
                    <CardTitle className="text-xl">{t("contact_general") || "Contact Général"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <a href="mailto:info@investinhuman.de" className="text-amber-600 hover:text-amber-700 font-semibold hover:underline">
                        info@investinhuman.de
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <a href="mailto:info@investinhuman.tn" className="text-amber-600 hover:text-amber-700 font-semibold hover:underline">
                        info@investinhuman.tn
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <div className="text-gray-700">
                        <p className="font-medium">{t("contact_germany_phone1") || "+49 621 15963353"}</p>
                        <p className="font-medium">{t("contact_tunisia_phone") || "+216 98 615 862"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>

              {/* Social Media */}
              <SectionReveal delay={0.4}>
                <Card className="border-2 hover:border-amber-500 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{t("contact_social_media") || "Suivez-nous"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <a
                        href="https://www.linkedin.com/in/manel-bannouri-0751bb40/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        title="Follow us on LinkedIn"
                        className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-110"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                      <a
                        href="https://www.facebook.com/investinhumangermany"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        title="Follow us on Facebook"
                        className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-110"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            </div>

            {/* Contact Form */}
            <div>
              <SectionReveal delay={0.2}>
                <Card className="border-2 border-amber-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t("contact_form_title") || "Envoyez-nous un message"}</CardTitle>
                    <p className="text-gray-600">{t("contact_form_subtitle") || "Nous vous répondrons dans les plus brefs délais"}</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Error Message Alert */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2"
                          >
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("contact_name") || "Nom complet"} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t("contact_name_placeholder") || "Votre nom"}
                          className={`border-gray-300 focus:border-amber-500 focus:ring-amber-500 ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                            }`}
                          disabled={isSubmitting}
                        />
                        <AnimatePresence>
                          {formErrors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-xs text-red-600 mt-1"
                            >
                              {formErrors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("contact_email") || "Email"} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t("contact_email_placeholder") || "votre.email@exemple.com"}
                          className={`border-gray-300 focus:border-amber-500 focus:ring-amber-500 ${formErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                            }`}
                          disabled={isSubmitting}
                        />
                        <AnimatePresence>
                          {formErrors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-xs text-red-600 mt-1"
                            >
                              {formErrors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("contact_phone") || "Téléphone"} {t("contact_optional") || "(optional)"}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t("contact_phone_placeholder") || "+216 XX XXX XXX"}
                          className={`border-gray-300 focus:border-amber-500 focus:ring-amber-500 ${formErrors.phone ? "border-red-500 focus-visible:ring-red-500" : ""
                            }`}
                          disabled={isSubmitting}
                        />
                        <AnimatePresence>
                          {formErrors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-xs text-red-600 mt-1"
                            >
                              {formErrors.phone}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("contact_subject") || "Sujet"} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={t("contact_subject_placeholder") || "Demande d'information"}
                          className={`border-gray-300 focus:border-amber-500 focus:ring-amber-500 ${formErrors.subject ? "border-red-500 focus-visible:ring-red-500" : ""
                            }`}
                          disabled={isSubmitting}
                        />
                        <AnimatePresence>
                          {formErrors.subject && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-xs text-red-600 mt-1"
                            >
                              {formErrors.subject}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t("contact_message") || "Message"} <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t("contact_message_placeholder") || "Votre message..."}
                          rows={6}
                          className={`border-gray-300 focus:border-amber-500 focus:ring-amber-500 resize-none ${formErrors.message ? "border-red-500 focus-visible:ring-red-500" : ""
                            }`}
                          disabled={isSubmitting}
                        />
                        <AnimatePresence>
                          {formErrors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-xs text-red-600 mt-1"
                            >
                              {formErrors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence>
                        {submitStatus === "success" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-green-800">{t("contact_success_title") || "Message envoyé avec succès!"}</p>
                              <p className="text-sm text-green-700">{t("contact_success_message") || "Nous vous contacterons bientôt."}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <span>{t("contact_sending") || "Envoi en cours..."}</span>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            {t("contact_send") || "Envoyer le message"}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Website & Hours */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black mb-6">
                {t("contact_recruitment_partner") || "Visit Our Sister Company"}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("contact_recruitment_desc") || "InvestInHuman Recruitment - Part of the InvestInHuman Group"}
              </p>
              <a
                href="https://www.investinhuman.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-amber-600 hover:text-amber-700 font-semibold hover:underline"
              >
                🌐 www.investinhuman.de
              </a>
              <div className="mt-8 text-gray-600">
                <p className="text-lg font-semibold mb-2">{t("contact_business_hours") || "Horaires d'ouverture"}</p>
                <p>{t("contact_hours_weekdays") || "Lundi - Vendredi: 9h00 - 18h00"}</p>
                <p>{t("contact_hours_saturday") || "Samedi: 9h00 - 13h00"}</p>
                <p className="text-amber-600 font-semibold">{t("contact_hours_sunday") || "Dimanche: Fermé"}</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h3 className="text-3xl font-bold text-black mb-4">
              {t("contact_cta_title") || "Investissez dans l'humain"}
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              {t("contact_cta_subtitle") || "Formez, connectez, inspirez."}
            </p>
            <p className="text-gray-500 italic">
              ✨ {t("contact_tagline") || "Invest in Human – La formation et la coopération sans frontières."} ✨
            </p>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
