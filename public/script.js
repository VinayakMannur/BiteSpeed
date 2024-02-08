document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");
  const responseModalBody = document.getElementById("responseModalBody");

  submitButton.addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    try {
      const response = await fetch("https://app-55985b32-94aa-421a-9c14-d8db6e2a837c.cleverapps.io/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          phoneNumber: phoneNumber,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        document.getElementById("email").value = '';
        document.getElementById("phoneNumber").value = '';


        responseModalBody.innerHTML = `
                <p>Primary Contact ID: ${result.contact.primaryContatctId}</p>
                <p>Emails: ${result.contact.emails.join(", ")}</p>
                <p>Phone Numbers: ${result.contact.phoneNumbers.join(", ")}</p>
                <p>Secondary Contact IDs: ${result.contact.secondaryContactIds.join(
                  ", "
                )}</p>
                `;

        const responseModal = new bootstrap.Modal(
          document.getElementById("responseModal")
        );
        responseModal.show();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  });
});
