document.addEventListener("DOMContentLoaded", () => {
  // Auto-dismiss flash alerts after 5 seconds
  document.querySelectorAll(".alert").forEach((alertEl) => {
    setTimeout(() => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alertEl);
      bsAlert.close();
    }, 5000);
  });
});
