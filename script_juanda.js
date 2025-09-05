window.uetq = window.uetq || [];

(function () {
  try {
    // 🔹 Detectar el objeto que contiene los datos de la orden
    var checkoutData = window.__stencilData?.page?.order || window.orderConfirmation || null;

    if (!checkoutData) {
      console.warn("UET: No order data found");
      return;
    }

    // 🔹 Obtener datos de la orden
    var orderId = checkoutData.orderId || "";
    var amount = checkoutData.orderAmount || checkoutData.baseAmount || 0;
    var currency = checkoutData.currency?.code || "USD";

    if (!orderId || !amount) {
      console.warn("UET: Order data incomplete", { orderId, amount, currency });
      return;
    }

    // 🔹 Enviar evento a Bing UET
    window.uetq.push('event', 'purchase', {
      revenue_value: amount,
      currency: currency,
      order_id: orderId.toString()
    });

    console.log("UET: Purchase event pushed ✅", {
      orderId: orderId,
      amount: amount,
      currency: currency
    });

  } catch (err) {
    console.error("UET: Script error", err);
  }
})();
