window.uetq = window.uetq || [];

(function() {
  try {
    document.addEventListener("DOMContentLoaded", function() {
      var checkoutData = null;

      // Buscar en todos los scripts JSON de la página
      var scripts = document.querySelectorAll('script[type="application/json"]');
      scripts.forEach(function(script) {
        if (checkoutData) return; // ya encontramos la orden
        try {
          var jsonData = JSON.parse(script.textContent);

          // Buscar recursivamente un objeto con orderId y baseAmount
          function findOrder(obj) {
            if (!obj || typeof obj !== "object") return null;
            if (obj.orderId && obj.baseAmount) return obj;
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                var result = findOrder(obj[key]);
                if (result) return result;
              }
            }
            return null;
          }

          checkoutData = findOrder(jsonData);

        } catch (e) {
          // Ignorar JSON inválido
        }
      });

      if (!checkoutData) {
        console.warn("UET: No order data found");
        return;
      }

      // Obtener datos de la orden
      var orderId = checkoutData.orderId || checkoutData.id || "";
      var amount = checkoutData.orderAmount || checkoutData.baseAmount || 0;
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


