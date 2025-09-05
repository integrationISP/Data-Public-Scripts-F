window.uetq = window.uetq || [];

(function waitForCheckoutData() {
  if (!window.uetq) {
    setTimeout(waitForCheckoutData, 100);
    return;
  }

  // Esperar hasta que window.oInfo esté disponible
  if (!window.oInfo) {
    setTimeout(waitForCheckoutData, 100);
    return;
  }

  var checkoutData = window.oInfo;

  // Enviar evento custom purchase a Bing
  window.uetq.push('event', 'purchase', {
    revenue_value: checkoutData.baseAmount || 0,
    currency: checkoutData.currency?.code || "USD",
    order_id: checkoutData.orderId.toString()
  });

  console.log("UET: Purchase event pushed ✅", {
    orderId: checkoutData.orderId,
    amount: checkoutData.baseAmount,
    currency: checkoutData.currency?.code
  });
})();

