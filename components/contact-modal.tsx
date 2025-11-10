"use client"

import { useState, useEffect } from "react"
import { X, Mail, MessageSquare, User, Phone, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/lib/useTranslation"
import { motion, AnimatePresence } from "framer-motion"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  prefilledSubject?: string
  prefilledMessage?: string
  inquiryType?: 'general' | 'language-course' | 'seminar' | 'volunteer' | 'partnership' | 'coaching' | 'studies-abroad'
  courseLanguage?: string
  courseLevel?: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export default function ContactModal({
  isOpen,
  onClose,
  prefilledSubject,
  prefilledMessage,
  inquiryType = 'general',
  courseLanguage,
  courseLevel
}: ContactModalProps) {
  const t = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: prefilledSubject || "",
    message: prefilledMessage || ""
  })

  // Prefill form data when modal opens if user is logged in
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          setFormData(prev => ({
            ...prev,
            name: user.fullname || user.username || "",
            email: user.email || "",
            phone: user.phone || "",
            subject: prefilledSubject || prev.subject,
            message: prefilledMessage || prev.message
          }))
        } catch (error) {
          console.error("Error parsing user data:", error)
        }
      } else {
        // Not logged in, just set prefilled values
        setFormData(prev => ({
          ...prev,
          subject: prefilledSubject || prev.subject,
          message: prefilledMessage || prev.message
        }))
      }
      // Reset states when modal opens
      setError(null)
      setFormErrors({})
      setSubmitted(false)
    }
  }, [isOpen, prefilledSubject, prefilledMessage])

  // Check if user is logged in
  const isUserLoggedIn = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      return !!storedUser
    }
    return false
  }

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate phone format (optional field, but if provided should be valid)
  const validatePhone = (phone: string): boolean => {
    if (!phone) return true // Phone is optional
    const phoneRegex = /^[\d\s\+\-\(\)]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7
  }

  // Validate form fields
  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.name.trim()) {
      errors.name = t("contact_error_name_required") || "Name is required"
    } else if (formData.name.trim().length < 2) {
      errors.name = t("contact_error_name_min") || "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      errors.email = t("contact_error_email_required") || "Email is required"
    } else if (!validateEmail(formData.email)) {
      errors.email = t("contact_error_email_invalid") || "Please enter a valid email address"
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = t("contact_error_phone_invalid") || "Please enter a valid phone number"
    }

    if (!formData.subject.trim()) {
      errors.subject = t("contact_error_subject_required") || "Subject is required"
    } else if (formData.subject.trim().length < 3) {
      errors.subject = t("contact_error_subject_min") || "Subject must be at least 3 characters"
    }

    if (!formData.message.trim()) {
      errors.message = t("contact_error_message_required") || "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = t("contact_error_message_min") || "Message must be at least 10 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setError(null)
    setFormErrors({})

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

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
          inquiryType: inquiryType,
          courseLanguage: courseLanguage,
          courseLevel: courseLevel,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        console.log('✅ Email sent successfully')
        setSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false)
          // Reset form but keep name and email if user is logged in
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            try {
              const user = JSON.parse(storedUser)
              setFormData({
                name: user.fullname || user.username || "",
                email: user.email || "",
                phone: user.phone || "",
                subject: "",
                message: ""
              })
            } catch (error) {
              setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
            }
          } else {
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
          }
          onClose()
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to send email')
      }

    } catch (error) {
      console.error("Error submitting contact form:", error)

      // Set error message
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        setError(t("contact_network_error") || "Network error. Please check your connection.")
      } else {
        setError(t("contact_error") || "Error submitting form. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field error when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
    // Clear general error when user makes changes
    if (error) {
      setError(null)
    }
  }

  const handleClose = () => {
    // Reset only subject and message, keep name and email if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setFormData({
          name: user.fullname || user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          subject: "",
          message: ""
        })
      } catch (error) {
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      }
    } else {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }
    setSubmitted(false)
    setIsSubmitting(false)
    setError(null)
    setFormErrors({})
    onClose()
  }

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              {t("contact_success_title") || "Message Sent!"}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600"
            >
              {t("contact_success_message") || "Thank you for your message. We'll get back to you soon!"}
            </motion.p>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            {t("contact_title") || "Contact Us"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {t("contact_name") || "Name"} *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder={t("contact_name_placeholder") || "Your name"}
                disabled={isSubmitting || isUserLoggedIn()}
                readOnly={isUserLoggedIn()}
                className={`${isUserLoggedIn() ? "bg-gray-50 cursor-not-allowed" : ""} ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
              />
              <AnimatePresence>
                {formErrors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-red-600"
                  >
                    {formErrors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t("contact_email") || "Email"} *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder={t("contact_email_placeholder") || "your.email@example.com"}
                disabled={isSubmitting || isUserLoggedIn()}
                readOnly={isUserLoggedIn()}
                className={`${isUserLoggedIn() ? "bg-gray-50 cursor-not-allowed" : ""} ${formErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
              />
              <AnimatePresence>
                {formErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-red-600"
                  >
                    {formErrors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {t("contact_phone") || "Phone"} {t("contact_optional") || "(optional)"}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder={t("contact_phone_placeholder") || "+49 123 456789"}
              disabled={isSubmitting}
              className={formErrors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            <AnimatePresence>
              {formErrors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs text-red-600"
                >
                  {formErrors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              {t("contact_subject") || "Subject"} *
            </Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder={t("contact_subject_placeholder") || "How can we help you?"}
              disabled={isSubmitting}
              className={formErrors.subject ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            <AnimatePresence>
              {formErrors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs text-red-600"
                >
                  {formErrors.subject}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {t("contact_message") || "Message"} *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder={t("contact_message_placeholder") || "Tell us more about your inquiry..."}
              disabled={isSubmitting}
              rows={4}
              className={formErrors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            <AnimatePresence>
              {formErrors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs text-red-600"
                >
                  {formErrors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {t("contact_cancel") || "Cancel"}
            </Button>
            <Button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-black"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? (t("contact_sending") || "Sending...")
                : (t("contact_send") || "Send Message")
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
