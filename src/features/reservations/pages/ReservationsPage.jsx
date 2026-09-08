import { useMemo, useState } from "react";
import reservationImage from "../../../assets/images/interiors/reservation-hero.jpg";
import { supabase } from "../../../lib/supabase";

const MIN_LEAD_TIME_MINUTES = 60;
const MAX_STANDARD_GUESTS = 10;
const MAX_LARGE_PARTY_GUESTS = 50;
const NAIROBI_TIME_ZONE = "Africa/Nairobi";

const getToday = () => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: NAIROBI_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(new Date());
};

const getNairobiParts = (date = new Date()) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: NAIROBI_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);
  const values = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  }

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
  };
};

const getNairobiDateTimeFromForm = (date, time) => {
  if (!date || !time) return null;

  const reservationDateTime = new Date(
    `${date}T${time}:00+03:00`
  );

  if (Number.isNaN(reservationDateTime.getTime())) {
    return null;
  }

  return reservationDateTime;
};

const isWithinMinimumLeadTime = (date, time) => {
  const reservationDateTime = getNairobiDateTimeFromForm(
    date,
    time
  );

  if (!reservationDateTime) return false;

  const minimumAllowedDateTime = new Date(
    Date.now() + MIN_LEAD_TIME_MINUTES * 60 * 1000
  );

  return reservationDateTime >= minimumAllowedDateTime;
};

const getMinimumReservationDateTime = () => {
  return new Date(
    Date.now() + MIN_LEAD_TIME_MINUTES * 60 * 1000
  );
};

const normalizeName = (value = "") => {
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

const normalizePhone = (value = "") => {
  return value.replace(/\D/g, "").slice(0, 10);
};

const isValidPhone = (phone) => {
  return /^(01|07)\d{8}$/.test(phone);
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

const isValidName = (name) => {
  return (
    name.length >= 2 &&
    name.length <= 50 &&
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(
      name
    )
  );
};

function ReservationsPage() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    customGuests: "",
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

  const today = useMemo(() => getToday(), []);

  const minimumReservationTime = useMemo(() => {
    const minimumDateTime = getMinimumReservationDateTime();
    const parts = getNairobiParts(minimumDateTime);

    return `${String(parts.hour).padStart(2, "0")}:${String(
      parts.minute
    ).padStart(2, "0")}`;
  }, []);

  const isLargeParty = formData.guests === "more";

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

    if (name === "requests") {
      nextValue = value.slice(0, 1000);
    }

    if (name === "customGuests") {
      nextValue = value.replace(/\D/g, "").slice(0, 2);
    }

    setFormData((current) => ({
      ...current,
      [name]: nextValue,
      ...(name === "guests" && value !== "more"
        ? { customGuests: "" }
        : {}),
    }));

    setSubmitMessage("");
    setSubmitError("");

    setFieldErrors((current) => ({
      ...current,
      [name]: "",
      ...(name === "guests"
        ? { customGuests: "" }
        : {}),
    }));
  };

  const handleNameBlur = (event) => {
    const { name, value } = event.target;
    const normalized = normalizeName(value);

    setFormData((current) => ({
      ...current,
      [name]: normalized,
    }));

    setFieldErrors((current) => ({
      ...current,
      [name]:
        normalized && !isValidName(normalized)
          ? "Please enter a valid name using letters, spaces, apostrophes or hyphens."
          : "",
    }));
  };

  const handleEmailBlur = (event) => {
    const value = event.target.value.trim().toLowerCase();

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
    const phone = normalizePhone(formData.phone);

    setFormData((current) => ({
      ...current,
      phone,
    }));

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
    const email = formData.email.trim().toLowerCase();
    const phone = normalizePhone(formData.phone);
    const requests = formData.requests.trim();

    let guestCount = null;

    if (formData.guests === "more") {
      guestCount = Number(formData.customGuests);

      if (!formData.customGuests) {
        errors.customGuests =
          "Please enter the number of guests for your party.";
      } else if (
        !Number.isInteger(guestCount) ||
        guestCount < 11 ||
        guestCount > MAX_LARGE_PARTY_GUESTS
      ) {
        errors.customGuests =
          "Please enter a number between 11 and 50 guests.";
      }
    } else {
      guestCount = Number(formData.guests);

      if (
        !Number.isInteger(guestCount) ||
        guestCount < 1 ||
        guestCount > MAX_STANDARD_GUESTS
      ) {
        errors.guests = "Please select a valid number of guests.";
      }
    }

    if (!firstName) {
      errors.firstName = "Please enter your first name.";
    } else if (!isValidName(firstName)) {
      errors.firstName =
        "Please enter a valid first name using letters, spaces, apostrophes or hyphens.";
    }

    if (!lastName) {
      errors.lastName = "Please enter your last name.";
    } else if (!isValidName(lastName)) {
      errors.lastName =
        "Please enter a valid last name using letters, spaces, apostrophes or hyphens.";
    }

    if (!email) {
      errors.email = "Please enter your email address.";
    } else if (email.length > 254) {
      errors.email = "Please enter a valid email address.";
    } else if (!isValidEmail(email)) {
      errors.email =
        "Please enter a valid email address, for example: name@example.com";
    }

    if (!phone) {
      errors.phone =
        "Please enter your 10-digit Kenyan phone number.";
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

    if (
      formData.date &&
      formData.time &&
      formData.date >= today &&
      !isWithinMinimumLeadTime(
        formData.date,
        formData.time
      )
    ) {
      errors.time = `Please choose a time at least ${MIN_LEAD_TIME_MINUTES} minutes from now.`;
    }

    if (requests.length > 1000) {
      errors.requests =
        "Special requests must be 1000 characters or fewer.";
    }

    setFormData((current) => ({
      ...current,
      firstName,
      lastName,
      email,
      phone,
      requests,
    }));

    setFieldErrors(errors);

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      guestCount,
    };
  };

  const focusFirstInvalidField = (errors) => {
    const fieldOrder = [
      "date",
      "time",
      "guests",
      "customGuests",
      "firstName",
      "lastName",
      "email",
      "phone",
      "requests",
    ];

    const firstInvalidField = fieldOrder.find(
      (field) => errors[field]
    );

    if (!firstInvalidField) return;

    requestAnimationFrame(() => {
      const element = document.querySelector(
        `[name="${firstInvalidField}"]`
      );

      if (element) {
        element.focus();
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const { valid, errors, guestCount } =
        validateForm();

      if (!valid) {
        setSubmitError(
          "Please correct the highlighted fields before submitting your reservation."
        );

        focusFirstInvalidField(errors);
        return;
      }

      const cleanedFirstName = normalizeName(
        formData.firstName
      );

      const cleanedLastName = normalizeName(
        formData.lastName
      );

      const cleanedEmail = formData.email
        .trim()
        .toLowerCase();

      const cleanedPhone = normalizePhone(
        formData.phone
      );

      const cleanedRequests =
        formData.requests.trim();

      /*
       * Convert:
       * 0712345678 -> +254712345678
       * 0112345678 -> +254112345678
       */
      const internationalPhone = `+254${cleanedPhone.slice(
        1
      )}`;

      /*
       * The Edge Function receives the actual guest count.
       *
       * Normal party:
       * guests = 1–10
       *
       * Large party:
       * guests = custom number, 11–50
       */
      const reservationPayload = {
        firstName: cleanedFirstName,
        lastName: cleanedLastName,
        email: cleanedEmail,
        phone: internationalPhone,
        date: formData.date,
        time: formData.time,
        guests: guestCount,
        specialRequests: cleanedRequests,
      };

      const { data, error } =
        await supabase.functions.invoke(
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
          data?.error ||
            "Reservation could not be created."
        );
      }

      const reference =
        data?.reservation?.reference;

      setSubmitMessage(
        reference
          ? `Your reservation request has been received. Reference: ${reference}`
          : "Your reservation request has been received. Our team will review it and contact you by email."
      );

      setFormData({
        date: "",
        time: "",
        guests: "2",
        customGuests: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        requests: "",
      });

      setFieldErrors({});
    } catch (error) {
      console.error(
        "Reservation submission error:",
        error
      );

      const message =
        error?.context?.error ||
        error?.message ||
        "";

      const lowerMessage =
        message.toLowerCase();

      if (
        lowerMessage.includes("60") ||
        lowerMessage.includes("minute") ||
        lowerMessage.includes("already") ||
        lowerMessage.includes("duplicate") ||
        lowerMessage.includes("reservation")
      ) {
        setSubmitError(message);
      } else {
        setSubmitError(
          "We couldn't submit your reservation right now. Please check your details and try again."
        );
      }
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
                    aria-invalid={Boolean(
                      fieldErrors.date
                    )}
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
                    min={
                      formData.date === today
                        ? minimumReservationTime
                        : undefined
                    }
                    required
                    aria-invalid={Boolean(
                      fieldErrors.time
                    )}
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
                  required
                  aria-invalid={Boolean(
                    fieldErrors.guests
                  )}
                >
                  {Array.from(
                    {
                      length: MAX_STANDARD_GUESTS,
                    },
                    (_, index) => {
                      const guests = index + 1;

                      return (
                        <option
                          key={guests}
                          value={guests}
                        >
                          {guests}{" "}
                          {guests === 1
                            ? "guest"
                            : "guests"}
                        </option>
                      );
                    }
                  )}

                  <option value="more">
                    More than 10 guests
                  </option>
                </select>

                {fieldErrors.guests && (
                  <small className="reservation-field-error">
                    {fieldErrors.guests}
                  </small>
                )}
              </label>

              {isLargeParty && (
                <>
                  <label>
                    Number of guests

                    <input
                      type="number"
                      name="customGuests"
                      value={formData.customGuests}
                      onChange={handleChange}
                      min="11"
                      max="50"
                      step="1"
                      inputMode="numeric"
                      placeholder="Enter number of guests"
                      required
                      aria-invalid={Boolean(
                        fieldErrors.customGuests
                      )}
                      aria-describedby="large-party-help"
                    />

                    <small id="large-party-help">
                      Please enter the approximate number of guests, up to
                      50.
                    </small>

                    {fieldErrors.customGuests && (
                      <small className="reservation-field-error">
                        {fieldErrors.customGuests}
                      </small>
                    )}
                  </label>

                  <div
                    className="reservation-form__message reservation-form__message--success"
                    role="note"
                  >
                    Larger party requests are reviewed individually by our
                    team so we can make the appropriate arrangements for your
                    visit. We will contact you by email once your request has
                    been reviewed.
                  </div>
                </>
              )}

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
                    minLength="2"
                    maxLength="50"
                    placeholder="First name"
                    required
                    aria-invalid={Boolean(
                      fieldErrors.firstName
                    )}
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
                    minLength="2"
                    maxLength="50"
                    placeholder="Last name"
                    required
                    aria-invalid={Boolean(
                      fieldErrors.lastName
                    )}
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
                  aria-invalid={Boolean(
                    fieldErrors.email
                  )}
                  aria-describedby={
                    fieldErrors.email
                      ? "email-error"
                      : undefined
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
                  aria-invalid={Boolean(
                    fieldErrors.phone
                  )}
                  aria-describedby={
                    fieldErrors.phone
                      ? "phone-error"
                      : "phone-help"
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
                  aria-invalid={Boolean(
                    fieldErrors.requests
                  )}
                />

                {fieldErrors.requests && (
                  <small className="reservation-field-error">
                    {fieldErrors.requests}
                  </small>
                )}
              </label>

              {submitMessage && (
                <div
                  className="reservation-form__message reservation-form__message--success"
                  role="status"
                  aria-live="polite"
                >
                  {submitMessage}
                </div>
              )}

              {submitError && (
                <div
                  className="reservation-form__message reservation-form__message--error"
                  role="alert"
                  aria-live="assertive"
                >
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                className="reservation-submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
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