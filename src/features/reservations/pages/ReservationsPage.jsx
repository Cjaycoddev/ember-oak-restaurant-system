import { useState } from "react";
import reservationImage from "../../../assets/images/interiors/reservation-hero.jpg";
import { supabase } from "../../../lib/supabase";

const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const normalizeName = (value) => {
  return value
    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(
      /(^|[\s'-])([a-zà-öø-ÿ])/g,
      (_, separator, letter) =>
        `${separator}${letter.toUpperCase()}`
    );
};

const normalizePhone = (value) => {
  return value.replace(/\D/g, "").slice(0, 10);
};

const isValidPhone = (phone) => {
  return /^(01|07)\d{8}$/.test(phone);
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

function ReservationsPage() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const today = getToday();

  const handleChange = (event) => {
    const { name, value } = event.target;

    let nextValue = value;

    if (name === "firstName" || name === "lastName") {
      nextValue = value
        .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, "")
        .replace(/\s+/g, " ");
    }

    if (name === "phone") {
      nextValue = normalizePhone(value);
    }

    setFormData((current) => ({
      ...current,
      [name]: nextValue,
    }));

    setSubmitMessage("");
    setSubmitError("");

    setFieldErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleNameBlur = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: normalizeName(value),
    }));
  };

  const handleEmailBlur = (event) => {
    const value = event.target.value.trim();

    setFormData((current) => ({
      ...current,
      email: value,
    }));

    if (value && !isValidEmail(value)) {
      setFieldErrors((current) => ({
        ...current,
        email:
          "Please enter a valid email address, for example: name@example.com",
      }));
    } else {
      setFieldErrors((current) => ({
        ...current,
        email: "",
      }));
    }
  };

  const handlePhoneBlur = () => {
    const phone = formData.phone;

    if (!phone) {
      setFieldErrors((current) => ({
        ...current,
        phone: "Please enter your 10-digit Kenyan phone number.",
      }));
      return;
    }

    if (!isValidPhone(phone)) {
      setFieldErrors((current) => ({
        ...current,
        phone:
          "Enter 10 digits starting with 07 or 01, for example 0712345678.",
      }));
    } else {
      setFieldErrors((current) => ({
        ...current,
        phone: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    const firstName = normalizeName(formData.firstName);
    const lastName = normalizeName(formData.lastName);
    const email = formData.email.trim();
    const phone = normalizePhone(formData.phone);

    if (!firstName) {
      errors.firstName = "Please enter your first name.";
    }

    if (!lastName) {
      errors.lastName = "Please enter your last name.";
    }

    if (!email) {
      errors.email = "Please enter your email address.";
    } else if (!isValidEmail(email)) {
      errors.email =
        "Please enter a valid email address, for example: name@example.com";
    }

    if (!phone) {
      errors.phone = "Please enter your 10-digit Kenyan phone number.";
    } else if (!isValidPhone(phone)) {
      errors.phone =
        "Enter 10 digits starting with 07 or 01, for example 0712345678.";
    }

    if (!formData.date) {
      errors.date = "Please select a reservation date.";
    } else if (formData.date < today) {
      errors.date = "Please choose today or a future date.";
    }

    if (!formData.time) {
      errors.time = "Please select a preferred time.";
    }

    if (!formData.guests) {
      errors.guests = "Please select the number of guests.";
    }

    setFormData((current) => ({
      ...current,
      firstName,
      lastName,
      email,
      phone,
    }));

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const isValid = validateForm();

      if (!isValid) {
        setSubmitError(
          "Please correct the highlighted fields before submitting your reservation."
        );
        return;
      }

      const cleanedFirstName = normalizeName(formData.firstName);
      const cleanedLastName = normalizeName(formData.lastName);
      const cleanedEmail = formData.email.trim().toLowerCase();
      const cleanedPhone = normalizePhone(formData.phone);

      // Convert:
      // 0712345678 -> +254712345678
      // 0112345678 -> +254112345678
      const internationalPhone = `+254${cleanedPhone.slice(1)}`;

      const reservationPayload = {
        firstName: cleanedFirstName,
        lastName: cleanedLastName,
        email: cleanedEmail,
        phone: internationalPhone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        requests: formData.requests.trim(),
      };

      const { data, error } = await supabase.functions.invoke(
        "create-reservation",
        {
          body: reservationPayload,
        }
      );

      if (error) {
        throw error;
      }

      if (!data?.success) {
        throw new Error(
          data?.error || "Reservation could not be created."
        );
      }

      setSubmitMessage(
        `Your reservation request has been received. Reference: ${data.reservation.reference}`
      );

      setFormData({
        date: "",
        time: "",
        guests: "2",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        requests: "",
      });

      setFieldErrors({});
    } catch (error) {
      setSubmitError(
        "We couldn't submit your reservation right now. Please check your details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="reservation-page">
      <section
        className="reservation-hero"
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            rgba(18, 14, 11, 0.88) 0%,
            rgba(18, 14, 11, 0.58) 48%,
            rgba(18, 14, 11, 0.28) 100%
          ), url(${reservationImage})`,
        }}
      >
        <div className="container reservation-hero__content">
          <p className="eyebrow">Reservations</p>

          <h1>
            A table worth
            <span> remembering.</span>
          </h1>

          <p className="reservation-hero__intro">
            Join us at Ember &amp; Oak for an experience shaped around
            exceptional food, warm hospitality, and the pleasure of taking
            your time.
          </p>
        </div>
      </section>

      <section className="reservation-section">
        <div className="container reservation-layout">
          <div className="reservation-copy">
            <p className="eyebrow">Your table awaits</p>

            <h2>
              Make your
              <span> reservation.</span>
            </h2>

            <p>
              Tell us when you would like to join us and we will do our best
              to accommodate you.
            </p>

            <p>
              Every request is reviewed by our team. Once your table is
              confirmed, you will receive a confirmation by email.
            </p>

            <div className="reservation-note">
              <span>EMBER &amp; OAK</span>

              <p>
                For larger gatherings or special occasions, our team will be
                happy to help arrange an experience suited to your party.
              </p>
            </div>
          </div>

          <div className="reservation-card">
            <div className="reservation-card__heading">
              <p className="eyebrow">Request a table</p>

              <h3>Reservation details</h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className="reservation-form"
              noValidate
            >
              <div className="reservation-form__row">
                <label>
                  Date

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                    aria-invalid={Boolean(fieldErrors.date)}
                  />

                  {fieldErrors.date && (
                    <small className="reservation-field-error">
                      {fieldErrors.date}
                    </small>
                  )}
                </label>

                <label>
                  Preferred time

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(fieldErrors.time)}
                  />

                  {fieldErrors.time && (
                    <small className="reservation-field-error">
                      {fieldErrors.time}
                    </small>
                  )}
                </label>
              </div>

              <label>
                Number of guests

                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  {Array.from({ length: 10 }, (_, index) => {
                    const guests = index + 1;

                    return (
                      <option key={guests} value={guests}>
                        {guests} {guests === 1 ? "guest" : "guests"}
                      </option>
                    );
                  })}
                </select>

                {fieldErrors.guests && (
                  <small className="reservation-field-error">
                    {fieldErrors.guests}
                  </small>
                )}
              </label>

              <div className="reservation-divider" />

              <div className="reservation-form__row">
                <label>
                  First name

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleNameBlur}
                    autoComplete="given-name"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]+"
                    maxLength="50"
                    placeholder="First name"
                    required
                    aria-invalid={Boolean(fieldErrors.firstName)}
                  />

                  {fieldErrors.firstName && (
                    <small className="reservation-field-error">
                      {fieldErrors.firstName}
                    </small>
                  )}
                </label>

                <label>
                  Last name

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleNameBlur}
                    autoComplete="family-name"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]+"
                    maxLength="50"
                    placeholder="Last name"
                    required
                    aria-invalid={Boolean(fieldErrors.lastName)}
                  />

                  {fieldErrors.lastName && (
                    <small className="reservation-field-error">
                      {fieldErrors.lastName}
                    </small>
                  )}
                </label>
              </div>

              <label>
                Email address

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  autoComplete="email"
                  inputMode="email"
                  maxLength="254"
                  placeholder="name@example.com"
                  required
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={
                    fieldErrors.email ? "email-error" : undefined
                  }
                />

                {fieldErrors.email && (
                  <small
                    id="email-error"
                    className="reservation-field-error"
                  >
                    {fieldErrors.email}
                  </small>
                )}
              </label>

              <label>
                Phone number

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handlePhoneBlur}
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="(01|07)[0-9]{8}"
                  minLength="10"
                  maxLength="10"
                  placeholder="0712345678"
                  required
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={
                    fieldErrors.phone ? "phone-error" : "phone-help"
                  }
                />

                <small id="phone-help">
                  Enter 10 digits starting with 07 or 01.
                </small>

                {fieldErrors.phone && (
                  <small
                    id="phone-error"
                    className="reservation-field-error"
                  >
                    {fieldErrors.phone}
                  </small>
                )}
              </label>

              <label>
                Special requests

                <textarea
                  name="requests"
                  value={formData.requests}
                  onChange={handleChange}
                  rows="4"
                  maxLength="1000"
                  placeholder="Dietary requirements, celebrations, accessibility needs..."
                />
              </label>

              {submitMessage && (
                <div
                  className="reservation-form__message reservation-form__message--success"
                  role="status"
                >
                  {submitMessage}
                </div>
              )}

              {submitError && (
                <div
                  className="reservation-form__message reservation-form__message--error"
                  role="alert"
                >
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                className="reservation-submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Sending request..."
                  : "Request a reservation"}
              </button>

              <p className="reservation-disclaimer">
                Your request is not confirmed until you receive a confirmation
                from Ember &amp; Oak.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ReservationsPage;