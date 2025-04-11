import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Update state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save to localStorage on submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Save to localStorage (append if already exists)
    const existing = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const updated = [...existing, formData];
    localStorage.setItem('contactMessages', JSON.stringify(updated));

    // Optional: clear form after submit
    setFormData({ name: '', email: '', message: '' });

    alert('Thank you! Your message has been saved.');
  };

  return (
    <div className="min-h-[80vh] px-6 md:px-24 py-12 bg-white text-gray-800">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-900">Contact Us</h1>
      <p className="text-center text-lg text-gray-600 mb-10">
        If you have any questions, feel free to reach out to us. We're here to help!
      </p>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Information</h2>
          <ul className="space-y-3 text-lg">
            <li>
              <strong>Email:</strong> <span className="text-blue-600">support@dukan.com</span>
            </li>
            <li>
              <strong>Phone:</strong> +1-800-123-4567
            </li>
            <li>
              <strong>Address:</strong> 123 Dukan Street, E-commerce City, Pin: 12345
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
