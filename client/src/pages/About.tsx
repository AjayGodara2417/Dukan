import React from "react";

const About: React.FC = () => {
  return (
    <div className="px-6 md:px-24 py-12 bg-amber-50 min-h-[70vh] text-gray-800">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">About Us</h1>
        <p className="text-lg text-gray-600">Your trusted partner in online shopping.</p>
      </header>

      <section className="space-y-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
        <p>
          Welcome to our eCommerce platform! We are committed to delivering an exceptional online shopping experience
          tailored to your needs.
        </p>
        <p>
          Our mission is to provide high-quality products at competitive prices while ensuring customer satisfaction at
          every step. We work tirelessly to bring you the latest trends and timeless essentials, all in one place.
        </p>
        <p>
          With a user-friendly interface and secure payment options, we strive to make your shopping journey seamless
          and enjoyable.
        </p>
      </section>
    </div>
  );
};

export default About;
