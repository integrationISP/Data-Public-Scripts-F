window.uetq = window.uetq || [];

(function() {
  try {
    document.addEventListener("DOMContentLoaded", function() {
      var checkoutData = window.oInfo;

      if (!checkoutData) {
        console.warn("UET: No order data found");
        return;
      }

      var orderId = checkoutData.orderId || "";
      var amount = checkoutData.baseAmount || 0; // usar baseAmount porque orderAmount es 0
      var currency = checkoutData.currency?.code || "USD";

      if (!orderId || !amount) {
        console.warn("UET: Order data incomplete", { orderId, amount, currency });
        return;
      }

      // Enviar evento a Bing UET
      window.uetq.push('event', 'purchase', {
        revenue_value: amount,
        currency: currency,
        order_id: orderId.toString()
      });

      console.log("UET: Purchase event pushed ✅", { orderId, amount, currency });
    });
  } catch (err) {
    console.error("UET: Script error", err);
  }
})();
