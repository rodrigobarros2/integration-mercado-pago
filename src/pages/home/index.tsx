import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

// Inicializa o SDK com a chave pública
initMercadoPago("TEST-0ed77982-b1cd-4735-87d2-e1c6b1500542");

export function Home() {
  const initialization = {
    amount: 100, // Valor do pagamento
    preferenceId: "<PREFERENCE_ID>", // Substitua pelo ID da preferência
  };

  const customization = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    try {
      const response = await fetch("https://cc8d-2804-ad8-4551-6b00-b0a4-3374-78e4-2425.ngrok-free.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Pagamento processado com sucesso:", result);

      // Aqui você pode redirecionar o usuário ou exibir uma mensagem de sucesso.
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      // Aqui você pode exibir uma mensagem de erro para o usuário.
    }
  };

  const onError = async (error) => {
    console.error("Erro no Brick:", error);
    // Exibir mensagem de erro para o usuário.
  };

  const onReady = async () => {
    console.log("Brick carregado e pronto para uso.");
    // Aqui você pode ocultar qualquer loading.
  };

  return (
    <div>
      <h1>Pagamento</h1>
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
}
