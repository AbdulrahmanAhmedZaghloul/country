import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "zaghloul10",   // Service ID
        "template_eyspmdq",  // Template ID
        e.target,
        "Z-7Zm8iLMACsIice0F0"    // Public Key
      )
      .then(
        () => {
          alert("✅ The message was sent successfully.");
          setLoading(false);
          e.target.reset();
        },
        () => {
          alert("❌ There was a problem during transmission.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-white p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Get in touch
        </h2>

        <form onSubmit={sendEmail} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="from_name"
              placeholder="your name"
              required
              className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="from_email"
              placeholder="your email"
              required
              className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            name="message"
            placeholder="subject"
            rows="5"
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending in progress" : "send"}
          </button>
        </form>
      </div>
    </div>
  );
}
