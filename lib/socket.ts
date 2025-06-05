import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer("ws://localhost:3000/cable");

consumer.subscriptions.create("NotificationChannel", {
  received(data) {
    console.log("Notificação recebida:", data);
    window.alert(data.text); // Exibe a notificação no frontend
  }
});
