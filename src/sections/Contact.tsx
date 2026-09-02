/**
 * Contact.tsx
 *
 * Contact section for Phanindra Kaushik Chennu.
 * Features:
 *   - Client-side validated contact form (Name, Email, Message)
 *   - GitHub link (https://github.com/phanikaushik2630-ship-it)
 *   - Configurable placeholders for LinkedIn & Direct Email
 */

import { useState } from 'react'
import { SectionWrapper, SectionHeader, Card, Button } from '@/components/ui'

interface FormState {
  name:    string
  email:   string
  message: string
}

interface FormErrors {
  name?:    string
  email?:   string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name:    '',
    email:   '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Client-side validation logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear specific error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }, 1200)
  }

  return (
    <SectionWrapper id="contact" label="Contact Phanindra Kaushik Chennu" className="relative overflow-hidden">
      <SectionHeader
        label="Get in Touch"
        heading={
          <span>
            Let&apos;s build something <span className="gradient-text">meaningful</span> together.
          </span>
        }
        sub="Whether you have an internship opportunity, project collaboration, or technical question — feel free to drop a message."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Links & Social Placeholders */}
        <div data-reveal data-reveal-y="30" className="lg:col-span-5 flex flex-col gap-6">
          <Card hover className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-2">
                Connect Directly
              </span>
              <h3 className="text-xl font-bold text-primary">
                Phanindra Kaushik Chennu
              </h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Computer Science Engineering Student & Full-Stack Developer
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* GitHub Link (Active) */}
              <a
                href="https://github.com/phanikaushik2630-ship-it"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-2 border border-default hover:border-accent/40 group transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted font-medium">GitHub Profile</span>
                  <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-200">
                    phanikaushik2630-ship-it
                  </span>
                </div>
              </a>

              {/* LinkedIn Link (Active) */}
              <a
                href="https://www.linkedin.com/in/phanindra-kaushik-chennu-aa9114335/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-2 border border-default hover:border-accent/40 group transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted font-medium">LinkedIn Profile</span>
                  <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-200 truncate max-w-[220px]">
                    phanindra-kaushik-chennu
                  </span>
                </div>
              </a>

              {/* Direct Email Link (Active) */}
              <a
                href="mailto:phanikaushik2630@gmail.com"
                className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-2 border border-default hover:border-accent/40 group transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted font-medium">Direct Email</span>
                  <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-200">
                    phanikaushik2630@gmail.com
                  </span>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-default text-xs text-muted">
              📍 Machilipatnam / Andhra Pradesh, India
            </div>
          </Card>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div data-reveal data-reveal-y="40" data-reveal-delay="0.15" className="lg:col-span-7">
          <Card className="p-5 sm:p-7 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10 sm:py-12 gap-4">
                <div className="w-14 h-14 rounded-full bg-accent-dim border border-accent/30 flex items-center justify-center text-accent text-2xl animate-bounce">
                  ✓
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-muted max-w-md">
                  Thank you for reaching out. Phanindra Kaushik will get back to you promptly.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5">
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">
                  Send a Direct Message
                </h3>

                {/* Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-muted uppercase tracking-wider">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 min-h-[48px] rounded-lg bg-surface-2 border text-base md:text-sm text-primary placeholder:text-subtle transition-all duration-200 outline-none focus-ring ${
                      errors.name ? 'border-red-500/80 bg-red-500/5' : 'border-default focus:border-accent'
                    }`}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" className="text-xs text-red-400 mt-0.5">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-muted uppercase tracking-wider">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-4 py-3 min-h-[48px] rounded-lg bg-surface-2 border text-base md:text-sm text-primary placeholder:text-subtle transition-all duration-200 outline-none focus-ring ${
                      errors.email ? 'border-red-500/80 bg-red-500/5' : 'border-default focus:border-accent'
                    }`}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className="text-xs text-red-400 mt-0.5">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-muted uppercase tracking-wider">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, team, or opportunity..."
                    className={`w-full px-4 py-3 min-h-[120px] rounded-lg bg-surface-2 border text-base md:text-sm text-primary placeholder:text-subtle transition-all duration-200 outline-none focus-ring resize-none ${
                      errors.message ? 'border-red-500/80 bg-red-500/5' : 'border-default focus:border-accent'
                    }`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className="text-xs text-red-400 mt-0.5">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </SectionWrapper>
  )
}
