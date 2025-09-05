window.uetq = window.uetq || [];

(function waitForUET() {
  // Esperar a que UET Tag esté disponible
  if (!window.uetq) {
    setTimeout(waitForUET, 100);
    return;
  }

  try {
    // Capturar los datos de la orden desde BigCommerce
    var checkoutData = window.oInfo; // Objeto identificado previamente
    if (!checkoutData) {
      console.warn("UET: No order data found");
      return;
    }

    // Obtener los datos necesarios
    var orderId = checkoutData.orderId?.toString() || "";
    var amount = checkoutData.baseAmount || 0;
    var currency = checkoutData.currency?.code || "USD";

    if (!orderId || !amount) {
      console.warn("UET: Order data incomplete", { orderId, amount, currency });
      return;
    }

    // Enviar evento custom a Bing UET
    window.uetq.push('event', 'purchase', {
      revenue_value: amount,
      currency: currency,
      order_id: orderId
    });

    console.log("UET: Purchase event pushed ✅", { orderId, amount, currency });

  } catch (err) {
    console.error("UET: Script error", err);
  }
})();



