import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // --------------------------------------------------
  // VALIDATION RULES
  // --------------------------------------------------

  // Letters, spaces, apostrophes and hyphens only.
  // Supports accented letters as well.
  const nameRegex =
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  // Strict but practical email validation.
  const emailRegex =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

  // Kenyan local numbers:
  // 0712345678
  // 0112345678
  const localPhoneRegex = /^(01|07)\d{8}$/;

  // Kenyan international numbers:
  // +254712345678
  // +254112345678
  const internationalPhoneRegex = /^\+254(1|7)\d{8}$/;

  // --------------------------------------------------
  // NORMALIZE NAME
  // --------------------------------------------------

  const normalizeName = (value) => {
    return value
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase()
      .replace(
        /(^|[\s'-])([a-zà-öø-ÿ])/g,
        (_, separator, letter) =>
          `${separator}${letter.toUpperCase()}`
      );
  };

  // --------------------------------------------------
  // NORMALIZE PHONE
  // --------------------------------------------------

  const normalizePhone = (value) => {
    const phone = value.trim();

    // Local Kenyan number
    if (localPhoneRegex.test(phone)) {
      return `+254${phone.slice(1)}`;
    }

    // Already international Kenyan number
    if (internationalPhoneRegex.test(phone)) {
      return phone;
    }

    return null;
  };

  // --------------------------------------------------
  // FIELD VALIDATION
  // --------------------------------------------------

  const validateField = (name, value) => {
    const cleanValue = value.trim();

    switch (name) {
      case "firstName":
        if (!cleanValue) {
          return "Please enter your first name.";
        }

        if (cleanValue.length < 2) {
          return "First name must be at least 2 characters.";
        }

        if (cleanValue.length > 50) {
          return "First name must be 50 characters or less.";
        }

        if (!nameRegex.test(cleanValue)) {
          return "Use letters, spaces, hyphens, or apostrophes only.";
        }

        return "";

      case "lastName":
        if (!cleanValue) {
          return "Please enter your last name.";
        }

        if (cleanValue.length < 2) {
          return "Last name must be at least 2 characters.";
        }

        if (cleanValue.length > 50) {
          return "Last name must be 50 characters or less.";
        }

        if (!nameRegex.test(cleanValue)) {
          return "Use letters, spaces, hyphens, or apostrophes only.";
        }

        return "";

      case "email":
        if (!cleanValue) {
          return "Please enter your email address.";
        }

        if (cleanValue.length > 254) {
          return "Email address is too long.";
        }

        if (!emailRegex.test(cleanValue)) {
          return "Please enter a valid email address.";
        }

        return "";

      case "phone":
        // Phone is optional.
        if (!cleanValue) {
          return "";
        }

        // Only digits are allowed for local format.
        // Only +254... is allowed for international format.
        if (
          !localPhoneRegex.test(cleanValue) &&
          !internationalPhoneRegex.test(cleanValue)
        ) {
          return "Enter a valid Kenyan number: 0712345678 or +254712345678.";
        }

        return "";

      case "subject":
        if (!cleanValue) {
          return "Please enter a subject.";
        }

        if (cleanValue.length < 3) {
          return "Subject must be at least 3 characters.";
        }

        if (cleanValue.length > 150) {
          return "Subject must be 150 characters or less.";
        }

        return "";

      case "message":
        if (!cleanValue) {
          return "Please enter your message.";
        }

        if (cleanValue.length < 10) {
          return "Message must be at least 10 characters.";
        }

        if (cleanValue.length > 2000) {
          return "Message must be 2,000 characters or less.";
        }

        return "";

      default:
        return "";
    }
  };

  // --------------------------------------------------
  // CHANGE HANDLER
  // --------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    let cleanedValue = value;

    // Names
    if (name === "firstName" || name === "lastName") {
      // Remove numbers and invalid characters immediately.
      cleanedValue = value.replace(
        /[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g,
        ""
      );

      // Prevent repeated spaces.
      cleanedValue = cleanedValue.replace(/\s{2,}/g, " ");

      // Limit length.
      cleanedValue = cleanedValue.slice(0, 50);
    }

    // Phone
    if (name === "phone") {
      // Allow only digits and ONE leading plus sign.
      cleanedValue = value.replace(/[^\d+]/g, "");

      if (cleanedValue.includes("+")) {
        if (!cleanedValue.startsWith("+")) {
          cleanedValue = cleanedValue.replace(/\+/g, "");
        } else {
          cleanedValue =
            "+" + cleanedValue.slice(1).replace(/\+/g, "");
        }
      }

      // Maximum possible length: +254 + 9 digits = 13 chars.
      // Local number = 10 digits.
      cleanedValue = cleanedValue.slice(0, 13);
    }

    // Email
    if (name === "email") {
      cleanedValue = value.replace(/\s/g, "").slice(0, 254);
    }

    // Subject
    if (name === "subject") {
      cleanedValue = value.slice(0, 150);
    }

    // Message
    if (name === "message") {
      cleanedValue = value.slice(0, 2000);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));

    // Clear error as customer corrects the field.
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (status !== "idle") {
      setStatus("idle");
      setError("");
    }
  };

  // --------------------------------------------------
  // BLUR VALIDATION
  // --------------------------------------------------

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const fieldError = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "sending") {
      return;
    }

    const newErrors = {};

    Object.entries(formData).forEach(([name, value]) => {
      const fieldError = validateField(name, value);

      if (fieldError) {
        newErrors[name] = fieldError;
      }
    });

    setErrors(newErrors);

    // Find first invalid field.
    const firstInvalidField = Object.keys(newErrors)[0];

    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus();
      return;
    }

    setStatus("sending");
    setError("");

    const firstName = normalizeName(formData.firstName);
    const lastName = normalizeName(formData.lastName);
    const email = formData.email.trim().toLowerCase();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    const normalizedPhone = formData.phone.trim()
      ? normalizePhone(formData.phone)
      : "";

    try {
      const response = await fetch(
        "https://formspree.io/f/xkjnqgyg",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone: normalizedPhone,
            subject,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.errors?.[0]?.message ||
            "Something went wrong while sending your message."
        );
      }

      setStatus("success");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setErrors({});
    } catch (err) {
      console.error("Contact form error:", err);

      setStatus("error");

      setError(
        err.message ||
          "We couldn't send your message. Please try again."
      );
    }
  };

  // --------------------------------------------------
  // INPUT STYLING
  // --------------------------------------------------

  const inputClass = (field) =>
    `w-full rounded-2xl border ${
      errors[field]
        ? "border-red-500/80 focus:border-red-400 focus:ring-red-400/20"
        : "border-zinc-600/80 focus:border-amber-400 focus:ring-amber-400/20"
    } bg-zinc-950/80 px-6 py-4 text-white outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-zinc-500 focus:ring-2`;

  const labelClass =
    "mb-3 block text-sm font-medium uppercase tracking-[0.2rem] text-zinc-300";

  return (
    <section className="bg-black py-36">
      <div className="container">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="font-medium uppercase tracking-[0.35rem] text-amber-400">
            Get In Touch
          </span>

          <h2 className="mt-5 text-5xl font-medium text-white md:text-6xl">
            Send Us A Message
          </h2>

          <p className="mt-7 text-lg leading-8 text-zinc-400">
            We'd love to hear from you. Complete the form below and our team
            will respond as soon as possible.
          </p>

        </div>

        <div className="mx-auto max-w-5xl rounded-[2rem] border border-zinc-700/80 bg-zinc-900/70 p-10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm md:p-14">

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8"
          >

            {/* Names */}
            <div className="grid gap-8 md:grid-cols-2">

              <div>
                <label htmlFor="firstName" className={labelClass}>
                  First Name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="given-name"
                  maxLength={50}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                  className={inputClass("firstName")}
                />

                {errors.firstName && (
                  <p
                    id="firstName-error"
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className={labelClass}>
                  Last Name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="family-name"
                  maxLength={50}
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                  className={inputClass("lastName")}
                />

                {errors.lastName && (
                  <p
                    id="lastName-error"
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.lastName}
                  </p>
                )}
              </div>

            </div>

            {/* Contact details */}
            <div className="grid gap-8 md:grid-cols-2">

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="email"
                  maxLength={254}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "email-error" : undefined
                  }
                  className={inputClass("email")}
                />

                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number
                  <span className="ml-2 normal-case tracking-normal text-zinc-500">
                    (optional)
                  </span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0712345678"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={13}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? "phone-error" : "phone-help"
                  }
                  className={inputClass("phone")}
                />

                {errors.phone ? (
                  <p
                    id="phone-error"
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.phone}
                  </p>
                ) : (
                  <p
                    id="phone-help"
                    className="mt-2 text-xs text-zinc-500"
                  >
                    Use 0712345678 or +254712345678
                  </p>
                )}
              </div>

            </div>

            {/* Subject */}
            <div>

              <label htmlFor="subject" className={labelClass}>
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Reservation, Private Event, General Enquiry..."
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={150}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={
                  errors.subject ? "subject-error" : undefined
                }
                className={inputClass("subject")}
              />

              {errors.subject && (
                <p
                  id="subject-error"
                  className="mt-2 text-sm text-red-400"
                >
                  {errors.subject}
                </p>
              )}

            </div>

            {/* Message */}
            <div>

              <label htmlFor="message" className={labelClass}>
                Your Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="7"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={2000}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "message-error" : "message-help"
                }
                className={`${inputClass(
                  "message"
                )} resize-none px-6 py-5`}
              ></textarea>

              <div className="mt-2 flex items-center justify-between">
                {errors.message ? (
                  <p
                    id="message-error"
                    className="text-sm text-red-400"
                  >
                    {errors.message}
                  </p>
                ) : (
                  <p
                    id="message-help"
                    className="text-xs text-zinc-500"
                  >
                    Please provide at least 10 characters.
                  </p>
                )}

                <span className="text-xs text-zinc-600">
                  {formData.message.length}/2000
                </span>
              </div>

            </div>

            {/* Success */}
            {status === "success" && (
              <div
                role="status"
                className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-6 py-5 text-emerald-300 shadow-[0_10px_30px_rgba(16,185,129,0.08)]"
              >
                <p className="font-medium">
                  Message sent successfully.
                </p>

                <p className="mt-1 text-sm text-emerald-400/80">
                  Thank you for contacting Ember & Oak. Our team will get
                  back to you as soon as possible.
                </p>
              </div>
            )}

            {/* Error */}
            {status === "error" && (
              <div
                role="alert"
                className="rounded-2xl border border-red-400/40 bg-red-400/10 px-6 py-5 text-red-300"
              >
                <p className="font-medium">
                  We couldn't send your message.
                </p>

                <p className="mt-1 text-sm text-red-400/80">
                  {error}
                </p>
              </div>
            )}

            {/* Premium submit button */}
            <div className="pt-2">

              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl !border !border-amber-300 !bg-amber-400 px-11 py-4 !font-semibold tracking-wide !text-black shadow-[0_8px_30px_rgba(245,158,11,0.3)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] hover:!border-white hover:!bg-white hover:shadow-[0_18px_45px_rgba(245,158,11,0.4)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center !text-black">
                  {status === "sending" ? (
                    <>
                      <span className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="ml-3 text-lg !text-black transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </span>
              </button>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
}

export default ContactForm;