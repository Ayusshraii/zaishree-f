// import axios from "axios"; // TEMP: unused while the API call below is disabled

// ============================================================
// PRICE BREAKUP SERVICE
// ------------------------------------------------------------
// This is the contract between the storefront and whatever admin
// panel manages pricing. The frontend (PriceBreakupCard) renders
// whatever this returns — it doesn't calculate anything itself.
// That's what makes the breakup "editable from the backend": an
// admin changes a row's rate/weight/value in the database, and it
// shows up here with zero frontend changes.
//
// SUGGESTED BACKEND SHAPE (implement to match this):
//
//   GET  /api/products/:id/price-breakup        (storefront reads)
//   PUT  /api/admin/products/:id/price-breakup   (admin edits)
//
//   Response body:
//   {
//     "productName": "Anushka Sharma Gold Forever Knot Diamond Ring",
//     "components": [
//       {
//         "id": "gold",                 // stable id, used as React key
//         "label": "14K Gold",          // shown in "Component" column
//         "rate": "₹9,128 / g",         // free text — admin can format however
//         "weight": "1.880 g",
//         "weightNote": "Net gold weight used in this piece", // tooltip, optional
//         "value": 17161.74,            // number, required
//         "originalValue": null,        // number|null — set to show a strikethrough
//         "bold": false                 // optional, highlights the row (e.g. diamond value)
//       },
//       {
//         "id": "making",
//         "label": "Making Charges",
//         "rate": "-",
//         "weight": "-",
//         "value": null,                // null = fully waived, shows only strikethrough
//         "originalValue": 9596.16
//       }
//     ],
//     "total": {
//       "value": 28071.35,
//       "originalValue": 37956.88       // omit/null if there's no discount
//     }
//   }
//
// Admins add/remove/reorder rows freely — the card just maps over
// whatever `components` array it's given, so the row *count* and
// *order* are backend-controlled too, not just the numbers.
// ============================================================

// Temporary local fallback so the UI has something to render before
// the real endpoint exists. Delete this once the backend route is
// live — getPriceBreakup() below already prefers the real API and
// only falls back to this on a failed/missing request.
const MOCK_PRICE_BREAKUP = {
  productName: "Anushka Sharma Gold Forever Knot Diamond Ring",
  components: [
    {
      id: "gold",
      label: "14K Gold",
      rate: "₹9,128 / g",
      weight: "1.880 g",
      weightNote: "Net gold weight used in this piece",
      value: 17161.74,
    },
    {
      id: "diamond",
      label: "Total Diamond Value",
      rate: "-",
      weight: "0.155 ct",
      weightNote: "Total diamond carat weight",
      value: 9900.0,
      bold: true,
    },
    {
      id: "making",
      label: "Making Charges",
      rate: "-",
      weight: "-",
      value: null,
      originalValue: 9596.16,
    },
    {
      id: "gst",
      label: "GST",
      rate: "-",
      weight: "-",
      value: 817.61,
    },
  ],
  total: {
    value: 28071.35,
    originalValue: 37956.88,
  },
};

export async function getPriceBreakup(productId) {
  // TEMP: real API call disabled until the backend route exists.
  // Just hand back the mock data directly for now — remove this
  // early return (and uncomment the block below) once
  // GET /api/products/:id/price-breakup is live.
  return MOCK_PRICE_BREAKUP;

  /*
  try {
    const { data } = await axios.get(
      `/api/products/${productId}/price-breakup`
    );

    // A network success doesn't guarantee the right shape — a route
    // that exists but returns something like { success: true, data:
    // {...} } (a common wrapper pattern) would pass straight through
    // and crash PriceBreakupCard on .components.map. Validate the
    // shape here, where it's easy to see and log what actually came
    // back, instead of failing deep inside the UI.
    const isValidShape =
      data &&
      Array.isArray(data.components) &&
      data.total &&
      typeof data.total.value === "number";

    if (!isValidShape) {
      console.warn(
        "Price breakup API returned an unexpected shape, using mock data instead. Received:",
        data
      );
      return MOCK_PRICE_BREAKUP;
    }

    return data;
  } catch (err) {
    // Expected until the backend route exists — don't spam this as
    // an error, just fall back quietly.
    console.warn(
      "Price breakup API not available yet, using mock data:",
      err.message
    );
    return MOCK_PRICE_BREAKUP;
  }
  */
}