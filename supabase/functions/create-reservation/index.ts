import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MIN_LEAD_TIME_MINUTES = 60;
const MIN_GUESTS = 1;
const MAX_GUESTS = 50;

const NAIROBI_TIME_ZONE = "Africa/Nairobi";

// ------------------------------------------
// RESPONSE HELPER
// ------------------------------------------

const jsonResponse = (
  body: Record<string, unknown>,
  status = 200
) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
};

// ------------------------------------------
// NORMALIZATION HELPERS
// ------------------------------------------

const normalizeName = (value: unknown) => {
  if (typeof value !== "string") return "";

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

const normalizeEmail = (value: unknown) => {
  if (typeof value !== "string") return "";

  return value.trim().toLowerCase();
};

const normalizePhone = (value: unknown) => {
  if (typeof value !== "string") return "";

  return value.trim().replace(/\s+/g, "");
};

// ------------------------------------------
// VALIDATION HELPERS
// ------------------------------------------

const isValidName = (value: string) => {
  return (
    value.length >= 2 &&
    value.length <= 50 &&
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(
      value
    )
  );
};

const isValidEmail = (email: string) => {
  return (
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  );
};

const isValidPhone = (phone: string) => {
  return /^\+254[17]\d{8}$/.test(phone);
};

const isValidDate = (date: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const parsed = new Date(`${date}T00:00:00+03:00`);

  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  return (
    new Intl.DateTimeFormat("en-CA", {
      timeZone: NAIROBI_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(parsed) === date
  );
};

// ------------------------------------------
// GET TODAY IN KENYA
// ------------------------------------------

const getToday = () => {
  const now = new Date();

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: NAIROBI_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
};

const isValidTime = (time: string) => {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
};

const isValidGuestCount = (value: unknown) => {
  const guestCount = Number(value);

  return (
    Number.isInteger(guestCount) &&
    guestCount >= MIN_GUESTS &&
    guestCount <= MAX_GUESTS
  );
};

// ------------------------------------------
// LEAD-TIME VALIDATION
// ------------------------------------------
// Ember & Oak operates on Kenya time (EAT / UTC+3).
//
// The +03:00 converts the selected Kenya wall-clock
// time into an absolute instant.
//
// Supabase Edge Functions run in UTC, so this explicit
// offset prevents timezone-related reservation errors.

const isWithinMinimumLeadTime = (
  date: string,
  time: string
) => {
  const reservationDateTime = new Date(
    `${date}T${time}:00+03:00`
  );

  if (Number.isNaN(reservationDateTime.getTime())) {
    return false;
  }

  const minimumAllowedDateTime = new Date(
    Date.now() +
      MIN_LEAD_TIME_MINUTES * 60 * 1000
  );

  return reservationDateTime >= minimumAllowedDateTime;
};

// ------------------------------------------
// RESERVATION EMAIL — BREVO
// ------------------------------------------

const sendReservationReceivedEmail = async ({
  email,
  firstName,
  reference,
  date,
  time,
  guestCount,
  specialRequests,
}: {
  email: string;
  firstName: string;
  reference: string;
  date: string;
  time: string;
  guestCount: number;
  specialRequests: string;
}) => {
  const brevoApiKey = Deno.env.get("BREVO_API_KEY");

  const senderEmail =
    Deno.env.get("BREVO_SENDER_EMAIL");

  const senderName =
    Deno.env.get("BREVO_SENDER_NAME") ||
    "Ember & Oak";

  if (!brevoApiKey) {
    console.error(
      "BREVO_API_KEY is not configured."
    );

    return {
      success: false,
      error: "Email service is not configured.",
    };
  }

  if (!senderEmail) {
    console.error(
      "BREVO_SENDER_EMAIL is not configured."
    );

    return {
      success: false,
      error: "Email sender is not configured.",
    };
  }

  // ----------------------------------------
  // FORMAT DATE IN KENYA TIME
  // ----------------------------------------

  const formattedDate = new Intl.DateTimeFormat(
    "en-KE",
    {
      timeZone: NAIROBI_TIME_ZONE,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(
    new Date(`${date}T00:00:00+03:00`)
  );

  // ----------------------------------------
  // FORMAT TIME
  // ----------------------------------------
  // The reservation time is already a Kenya
  // wall-clock time.
  //
  // Do NOT convert it through Africa/Nairobi
  // again because that could shift the displayed
  // time by +3 hours.

  const [hours, minutes] = time
    .split(":")
    .map(Number);

  const formattedTime = new Date(
    1970,
    0,
    1,
    hours,
    minutes
  ).toLocaleTimeString("en-KE", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // ----------------------------------------
  // ESCAPE SPECIAL REQUESTS FOR HTML
  // ----------------------------------------

  const safeRequests = specialRequests
    ? specialRequests
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    : "";

  const requestsSection = specialRequests
    ? `
      <div style="
        margin-top: 24px;
        padding: 20px;
        background: #f7f4ee;
        border: 1px solid #e6dfd2;
        border-radius: 10px;
      ">
        <div style="
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #9b7a3f;
          font-weight: 700;
          margin-bottom: 8px;
        ">
          Special requests
        </div>

        <div style="
          font-size: 14px;
          line-height: 1.7;
          color: #4b463e;
        ">
          ${safeRequests}
        </div>
      </div>
    `
    : "";

  // ----------------------------------------
  // EMAIL HTML
  // ----------------------------------------

  const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Ember & Oak Reservation Request</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background: #f1eee8;
  font-family: Arial, Helvetica, sans-serif;
  color: #292722;
">

  <div style="
    width: 100%;
    padding: 40px 16px;
    box-sizing: border-box;
  ">

    <div style="
      max-width: 620px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 35px rgba(0,0,0,0.08);
    ">

      <!-- HEADER -->

      <div style="
        background: #171512;
        padding: 38px 30px;
        text-align: center;
      ">

        <div style="
          color: #d0aa62;
          font-size: 13px;
          letter-spacing: 4px;
          font-weight: 700;
          margin-bottom: 12px;
        ">
          EMBER &amp; OAK
        </div>

        <div style="
          color: #ffffff;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
        ">
          Fire. Flavor. Experience.
        </div>

      </div>

      <!-- MAIN CONTENT -->

      <div style="
        padding: 38px 30px;
      ">

        <div style="
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #9b7a3f;
          font-weight: 700;
          margin-bottom: 12px;
        ">
          Reservation request
        </div>

        <h1 style="
          margin: 0 0 16px;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 30px;
          line-height: 1.25;
          font-weight: 500;
          color: #201d18;
        ">
          Thank you, ${firstName}.
        </h1>

        <p style="
          margin: 0 0 28px;
          font-size: 15px;
          line-height: 1.75;
          color: #68635b;
        ">
          We've received your reservation request and
          our team is currently reviewing the details.
        </p>

        <!-- STATUS -->

        <div style="
          padding: 16px 18px;
          background: #faf7f0;
          border: 1px solid #e8dcc6;
          border-radius: 10px;
          margin-bottom: 28px;
        ">

          <div style="
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #8c806d;
            margin-bottom: 8px;
          ">
            Current status
          </div>

          <div style="
            display: inline-block;
            padding: 7px 12px;
            border-radius: 999px;
            background: #eadfca;
            color: #765b2b;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
          ">
            PENDING REVIEW
          </div>

        </div>

        <!-- RESERVATION DETAILS -->

        <div style="
          border: 1px solid #e7e3dc;
          border-radius: 12px;
          overflow: hidden;
        ">

          <div style="
            padding: 17px 20px;
            background: #faf9f7;
            border-bottom: 1px solid #e7e3dc;
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 18px;
            color: #2a2722;
          ">
            Your request
          </div>

          <div style="
            padding: 20px;
          ">

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
            >

              <tr>

                <td style="
                  padding: 0 0 18px;
                  color: #8a857d;
                  font-size: 11px;
                  text-transform: uppercase;
                  letter-spacing: 1.3px;
                ">
                  Date
                </td>

                <td style="
                  padding: 0 0 18px;
                  text-align: right;
                  color: #292722;
                  font-size: 14px;
                  font-weight: 600;
                ">
                  ${formattedDate}
                </td>

              </tr>

              <tr>

                <td style="
                  padding: 0 0 18px;
                  color: #8a857d;
                  font-size: 11px;
                  text-transform: uppercase;
                  letter-spacing: 1.3px;
                ">
                  Time
                </td>

                <td style="
                  padding: 0 0 18px;
                  text-align: right;
                  color: #292722;
                  font-size: 14px;
                  font-weight: 600;
                ">
                  ${formattedTime}
                </td>

              </tr>

              <tr>

                <td style="
                  padding: 0 0 18px;
                  color: #8a857d;
                  font-size: 11px;
                  text-transform: uppercase;
                  letter-spacing: 1.3px;
                ">
                  Guests
                </td>

                <td style="
                  padding: 0 0 18px;
                  text-align: right;
                  color: #292722;
                  font-size: 14px;
                  font-weight: 600;
                ">
                  ${guestCount}
                  ${guestCount === 1 ? "guest" : "guests"}
                </td>

              </tr>

              <tr>

                <td style="
                  padding: 0;
                  color: #8a857d;
                  font-size: 11px;
                  text-transform: uppercase;
                  letter-spacing: 1.3px;
                ">
                  Reference
                </td>

                <td style="
                  padding: 0;
                  text-align: right;
                  color: #9b7a3f;
                  font-size: 14px;
                  font-weight: 700;
                  letter-spacing: 0.5px;
                ">
                  ${reference}
                </td>

              </tr>

            </table>

          </div>

        </div>

        ${requestsSection}

        <!-- IMPORTANT NOTICE -->

        <div style="
          margin-top: 28px;
          padding: 22px;
          background: #292722;
          border-radius: 10px;
        ">

          <div style="
            color: #d0aa62;
            font-size: 11px;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 10px;
          ">
            Please note
          </div>

          <p style="
            margin: 0;
            color: #eeeae2;
            font-size: 14px;
            line-height: 1.7;
          ">
            Your requested table is
            <strong>not yet confirmed</strong>.
            Our team will review availability and
            contact you by email once your reservation
            has been confirmed.
          </p>

        </div>

        <!-- NEXT STEPS -->

        <div style="
          margin-top: 30px;
        ">

          <div style="
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #9b7a3f;
            font-weight: 700;
            margin-bottom: 10px;
          ">
            What happens next
          </div>

          <p style="
            margin: 0;
            font-size: 14px;
            line-height: 1.75;
            color: #68635b;
          ">
            There's nothing else you need to do for now.
            We'll review your request and get back to
            you as soon as possible.
          </p>

        </div>

        <p style="
          margin: 32px 0 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 18px;
          line-height: 1.5;
          color: #292722;
        ">
          We look forward to welcoming you to
          Ember &amp; Oak.
        </p>

      </div>

      <!-- FOOTER -->

      <div style="
        padding: 28px 30px;
        background: #f7f5f1;
        border-top: 1px solid #e7e3dc;
        text-align: center;
      ">

        <div style="
          color: #292722;
          font-size: 12px;
          letter-spacing: 3px;
          font-weight: 700;
          margin-bottom: 9px;
        ">
          EMBER &amp; OAK
        </div>

        <div style="
          color: #8b857b;
          font-size: 11px;
          line-height: 1.6;
        ">
          Exceptional food. Warm hospitality.
          Unforgettable evenings.
        </div>

      </div>

    </div>

  </div>

</body>
</html>
`;

  // ----------------------------------------
  // SEND EMAIL WITH BREVO
  // ----------------------------------------

  try {
    const emailResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          accept: "application/json",
          "api-key": brevoApiKey,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          sender: {
            name: senderName,
            email: senderEmail,
          },

          to: [
            {
              email,
              name: `${firstName}`,
            },
          ],

          subject:
            "Ember & Oak — We've Received Your Reservation Request",

          htmlContent: html,

          tags: [
            "ember-oak",
            "reservation-request",
          ],
        }),
      }
    );

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error(
        "Brevo email failed:",
        emailData
      );

      return {
        success: false,
        error:
          emailData?.message ||
          emailData?.code ||
          "Could not send reservation email.",
      };
    }

    console.log(
      "Reservation email sent successfully:",
      emailData?.messageId
    );

    return {
      success: true,
      data: emailData,
    };
  } catch (error) {
    console.error(
      "Brevo request failed:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    return {
      success: false,
      error: "Email service request failed.",
    };
  }
};

// ------------------------------------------
// MAIN FUNCTION
// ------------------------------------------

Deno.serve(async (request) => {
  // ----------------------------------------
  // CORS
  // ----------------------------------------

  if (request.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  // ----------------------------------------
  // METHOD CHECK
  // ----------------------------------------

  if (request.method !== "POST") {
    return jsonResponse(
      {
        success: false,
        error: "Method not allowed.",
      },
      405
    );
  }

  try {
    // --------------------------------------
    // READ REQUEST BODY
    // --------------------------------------

    const body = await request.json();

    const firstName = normalizeName(body.firstName);
    const lastName = normalizeName(body.lastName);
    const email = normalizeEmail(body.email);
    const phone = normalizePhone(body.phone);

    const date =
      typeof body.date === "string"
        ? body.date.trim()
        : "";

    const time =
      typeof body.time === "string"
        ? body.time.trim()
        : "";

    const guestCount = Number(body.guests);

    /*
     * IMPORTANT:
     *
     * The frontend sends "specialRequests".
     * Previously this function expected "requests",
     * which could cause special requests to disappear.
     */
    const requests =
      typeof body.specialRequests === "string"
        ? body.specialRequests.trim()
        : "";

    // --------------------------------------
    // REQUIRED FIELDS
    // --------------------------------------

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !date ||
      !time
    ) {
      return jsonResponse(
        {
          success: false,
          error:
            "Missing required reservation information.",
        },
        400
      );
    }

    // --------------------------------------
    // NAME VALIDATION
    // --------------------------------------

    if (!isValidName(firstName)) {
      return jsonResponse(
        {
          success: false,
          error:
            "First name must contain only letters, spaces, apostrophes or hyphens.",
        },
        400
      );
    }

    if (!isValidName(lastName)) {
      return jsonResponse(
        {
          success: false,
          error:
            "Last name must contain only letters, spaces, apostrophes or hyphens.",
        },
        400
      );
    }

    // --------------------------------------
    // EMAIL VALIDATION
    // --------------------------------------

    if (!isValidEmail(email)) {
      return jsonResponse(
        {
          success: false,
          error:
            "Please provide a valid email address.",
        },
        400
      );
    }

    // --------------------------------------
    // PHONE VALIDATION
    // --------------------------------------

    if (!isValidPhone(phone)) {
      return jsonResponse(
        {
          success: false,
          error:
            "Phone number must be +254 followed by 9 digits starting with 1 or 7.",
        },
        400
      );
    }

    // --------------------------------------
    // DATE VALIDATION
    // --------------------------------------

    if (!isValidDate(date)) {
      return jsonResponse(
        {
          success: false,
          error:
            "Please provide a valid reservation date.",
        },
        400
      );
    }

    // --------------------------------------
    // PREVENT PAST DATES
    // --------------------------------------

    if (date < getToday()) {
      return jsonResponse(
        {
          success: false,
          error:
            "Reservation date cannot be in the past.",
        },
        400
      );
    }

    // --------------------------------------
    // TIME VALIDATION
    // --------------------------------------

    if (!isValidTime(time)) {
      return jsonResponse(
        {
          success: false,
          error:
            "Please provide a valid reservation time.",
        },
        400
      );
    }

    // --------------------------------------
    // MINIMUM LEAD TIME
    // --------------------------------------

    if (!isWithinMinimumLeadTime(date, time)) {
      console.warn(
        "Reservation rejected: minimum lead time not met.",
        {
          reservationDate: date,
          reservationTime: time,
          minimumLeadTimeMinutes:
            MIN_LEAD_TIME_MINUTES,
        }
      );

      return jsonResponse(
        {
          success: false,
          error:
            "Reservations must be made at least 1 hour in advance. Please choose a later time.",
        },
        400
      );
    }

    // --------------------------------------
    // GUEST COUNT VALIDATION
    // --------------------------------------

    if (!isValidGuestCount(guestCount)) {
      return jsonResponse(
        {
          success: false,
          error:
            "Number of guests must be between 1 and 50.",
        },
        400
      );
    }

    // --------------------------------------
    // SPECIAL REQUEST VALIDATION
    // --------------------------------------

    if (requests.length > 1000) {
      return jsonResponse(
        {
          success: false,
          error:
            "Special requests cannot exceed 1000 characters.",
        },
        400
      );
    }

    // --------------------------------------
    // SUPABASE ADMIN CLIENT
    // --------------------------------------

    const supabaseUrl =
      Deno.env.get("SUPABASE_URL");

    const serviceRoleKey =
      Deno.env.get(
        "SUPABASE_SERVICE_ROLE_KEY"
      );

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Missing Supabase environment variables."
      );

      return jsonResponse(
        {
          success: false,
          error:
            "Reservation service is not configured correctly.",
        },
        500
      );
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // --------------------------------------
    // FIND EXISTING CUSTOMER
    // --------------------------------------

    const {
      data: existingCustomers,
      error: customerLookupError,
    } = await supabaseAdmin
      .from("customers")
      .select(
        "id, first_name, last_name, email, phone"
      )
      .or(
        `email.eq.${email},phone.eq.${phone}`
      )
      .limit(1);

    if (customerLookupError) {
      console.error(
        "Customer lookup error:",
        customerLookupError
      );

      return jsonResponse(
        {
          success: false,
          error:
            "Could not verify customer information.",
        },
        500
      );
    }

    let customerId: string;

    // --------------------------------------
    // REUSE EXISTING CUSTOMER
    // --------------------------------------

    if (
      existingCustomers &&
      existingCustomers.length > 0
    ) {
      customerId = existingCustomers[0].id;
    } else {
      // ------------------------------------
      // CREATE NEW CUSTOMER
      // ------------------------------------

      const {
        data: newCustomer,
        error: customerInsertError,
      } = await supabaseAdmin
        .from("customers")
        .insert({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
        })
        .select("id")
        .single();

      if (customerInsertError) {
        console.error(
          "Customer insert error:",
          customerInsertError
        );

        return jsonResponse(
          {
            success: false,
            error:
              "Could not create customer information.",
          },
          500
        );
      }

      customerId = newCustomer.id;
    }

    // --------------------------------------
    // CHECK DUPLICATE RESERVATION
    // --------------------------------------

    const {
      data: existingReservations,
      error: reservationLookupError,
    } = await supabaseAdmin
      .from("reservations")
      .select(
        "id, reference, status, reservation_date, reservation_time, guest_count"
      )
      .eq("customer_id", customerId)
      .eq("reservation_date", date)
      .eq("reservation_time", time)
      .in("status", ["pending", "confirmed"])
      .limit(1);

    if (reservationLookupError) {
      console.error(
        "Reservation lookup error:",
        reservationLookupError
      );

      return jsonResponse(
        {
          success: false,
          error:
            "Could not check for an existing reservation.",
        },
        500
      );
    }

    // --------------------------------------
    // DUPLICATE FOUND
    // --------------------------------------

    if (
      existingReservations &&
      existingReservations.length > 0
    ) {
      return jsonResponse(
        {
          success: false,
          error:
            `You already have a reservation request for this date and time. Reference: ${existingReservations[0].reference}`,
          duplicate: true,
          reservation:
            existingReservations[0],
        },
        409
      );
    }

    // --------------------------------------
    // CREATE RESERVATION
    // --------------------------------------

    const {
      data: reservation,
      error: reservationError,
    } = await supabaseAdmin
      .from("reservations")
      .insert({
        customer_id: customerId,
        reservation_date: date,
        reservation_time: time,
        guest_count: guestCount,
        special_requests:
          requests || null,
        status: "pending",
      })
      .select(
        "id, reference, status, reservation_date, reservation_time, guest_count"
      )
      .single();

    if (reservationError) {
      console.error(
        "Reservation insert error:",
        reservationError
      );

      return jsonResponse(
        {
          success: false,
          error:
            "Could not create the reservation.",
        },
        500
      );
    }

    // --------------------------------------
    // SEND CUSTOMER EMAIL
    // --------------------------------------

    const emailResult =
      await sendReservationReceivedEmail({
        email,
        firstName,
        reference: reservation.reference,
        date: reservation.reservation_date,
        time: reservation.reservation_time,
        guestCount: reservation.guest_count,
        specialRequests: requests,
      });

    // --------------------------------------
    // EMAIL FAILURE DOES NOT CANCEL
    // RESERVATION
    // --------------------------------------

    if (!emailResult.success) {
      console.error(
        "Reservation email could not be sent.",
        {
          reference: reservation.reference,
          error: emailResult.error,
        }
      );
    }

    // --------------------------------------
    // SUCCESS
    // --------------------------------------

    return jsonResponse({
      success: true,
      reservation,
      emailSent: emailResult.success,
    });

  } catch (error) {
    console.error(
      "create-reservation error:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    return jsonResponse(
      {
        success: false,
        error:
          "An unexpected error occurred while processing your reservation.",
      },
      500
    );
  }
});