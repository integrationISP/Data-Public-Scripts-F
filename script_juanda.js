window.uetq = window.uetq || [];

(function() {
  try {
    // Esperar a que el DOM cargue
    document.addEventListener("DOMContentLoaded", function() {

      var checkoutData = null;

      // 1️⃣ Revisar objetos globales comunes
      var possibleObjects = ["__stencilData", "orderConfirmation", "checkout"];
      for (var i = 0; i < possibleObjects.length; i++) {
        var objName = possibleObjects[i];
        if (window[objName]) {
          var obj = window[objName];
          // Buscar page.checkout o page.order si existe
          if (obj.page?.checkout) checkoutData = obj.page.checkout;
          else if (obj.page?.order) checkoutData = obj.page.order;
          else if (obj.orderId || obj.baseAmount) checkoutData = obj;
          if (checkoutData) break;
        }
      }

      // 2️⃣ Buscar en scripts JSON en el DOM si no se encontró aún
      if (!checkoutData) {
        var scripts = document.querySelectorAll('script[type="application/json"]');
        scripts.forEach(function(script) {
          try {
            var jsonData = JSON.parse(script.textContent);
            // Revisar cualquier objeto que contenga orderId o baseAmount
            if (!checkoutData && (jsonData.orderId || jsonData.baseAmount)) {
              checkoutData = jsonData;
            } else if (!checkoutData && jsonData.orderConfirmation) {
              checkoutData = jsonData.orderConfirmation;
            }
          } catch (e) {}
        });
      }

      // 3️⃣ Si no se encuentra, mostrar advertencia
      if (!checkoutData) {
        console.warn("UET: No order data found");
        return;
      }

      // 4️⃣ Obtener datos de la orden
      var orderId = checkoutData.orderId || checkoutData.id || "";
      var amount = checkoutData.orderAmount || checkoutData.baseAmount || 0;
      var currency = checkoutData.currency?.code || "USD";

      if (!orderId || !amount) {
        console.warn("UET: Order data incomplete", { orderId, amount, currency });
        return;
      }

      // 5️⃣ Enviar evento a Bing UET
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

