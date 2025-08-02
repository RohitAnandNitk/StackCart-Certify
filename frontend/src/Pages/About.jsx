import React from 'react';

function About() {
  return (
    <div className="flex flex-col justify-center items-center max-w-5xl mx-auto px-6 py-16 text-gray-900 text-lg leading-relaxed min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center">About StackCart</h1>

      <p className="mb-6">
        <strong className="font-semibold">Overview:</strong>{' '}
        StackCart is a Delhi-based, government-registered technology and e-commerce company
        dedicated to building end-to-end digital solutions for modern businesses.
        Founded in 2024, StackCart operates under the unique vision of{' '}
        <em>“Code to Cart”</em> — transforming raw ideas into fully developed online platforms
        that enable seamless product discovery, purchase, and growth.
      </p>

      <ul className="list-disc pl-8 space-y-4 text-base">
        <li>
          <strong>Website:</strong>{' '}
          <a
            href="https://stack-cart-platforms.vercel.app/"
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://stack-cart-platforms.vercel.app/
          </a>
        </li>
        <li><strong>Industry:</strong> IT Services and IT Consulting</li>
        <li><strong>Company Size:</strong> 11–50 employees</li>
     {/* 
Shipping
Cancellation & Returns
FAQ
ADDRESS
A-21 The Greenview Apartment Sector-5, Rohini, New Delhi-110085.
Support Email: customercare.stackcart@gmail.com */}
        <li><strong>Headquarters:</strong> Delhi, 110085</li>
        <li><strong>Founded:</strong> 2024</li>
        <li><strong>Specialties:</strong> Code to Cart, Web Development, IT Services, Digital Marketing, and Corporate Gift</li>
        <li><strong>ADDRESS:</strong>A-21 The Greenview Apartment Sector-5, Rohini, New Delhi-110085.</li>
        <li><strong>Support Email:</strong> customercare.stackcart@gmail.com</li>
        <li><strong>Phone:</strong> 9289916169</li>
      </ul>
    </div>
  );
}

export default About;
