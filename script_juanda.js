window.uetq = window.uetq || [];

(function () {
  try {
    var checkoutData = null;

    // 🔹 1. Revisar objetos globales comunes
    if (window.__stencilData?.page?.order) {
      checkoutData = window.__stencilData.page.order;
    } else if (window.__stencilData?.page?.checkout) {
      checkoutData = window.__stencilData.page.checkout;
    } else if (window.orderConfirmation) {
      checkoutData = window.orderConfirmation;
    }

    // 🔹 2. Buscar en scripts JSON en el DOM si no se encontró aún
    if (!checkoutData) {
      var scripts = document.querySelectorAll('script[type="application/json"]');
      scripts.forEach(function(script) {
        try {
          var jsonData = JSON.parse(script.textContent);
          if (jsonData && (jsonData.orderId || jsonData.baseAmount)) {
            checkoutData = jsonData;
          }
        } catch (e) {
          // Ignorar JSON inválido
        }
      });
    }

    if (!checkoutData) {
      console.warn("UET: No order data found");
      return;
    }

    // 🔹 Obtener datos de la orden
    var orderId = checkoutData.orderId || checkoutData.id || "";
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


