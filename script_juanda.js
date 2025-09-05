window.uetq = window.uetq || [];
// Esperamos a que el DOM cargue
(function () {
  try {
    // BigCommerce expone variables globales en order confirmation:
    // window.__stencilData?.page?.checkout
    var checkoutData = window.__stencilData?.page?.checkout;

    if (!checkoutData || !checkoutData.order) {
      console.warn("UET: No order data found");
      return;
    }

    var orderId = checkoutData.order.orderId || "";
    var amount = checkoutData.order.orderAmount || 0;
    var currency = checkoutData.order.currency?.code || "USD";

    // 🚀 Enviar evento a Bing UET
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