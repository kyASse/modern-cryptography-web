'use client';

import React from 'react';

interface Section {
  id: string;
  title: string;
  content: string;
}

const sections: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    content:
      'This documentation provides an overview of Hybrid Cryptography using AES and RSA. Hybrid cryptography combines the speed of symmetric encryption (AES) and the security of asymmetric encryption (RSA).',
  },
  {
    id: 'aes-overview',
    title: 'AES Overview',
    content:
      'AES (Advanced Encryption Standard) is a symmetric encryption algorithm known for its speed and efficiency in encrypting large amounts of data.',
  },
  {
    id: 'rsa-overview',
    title: 'RSA Overview',
    content:
      'RSA is an asymmetric encryption algorithm used to securely share keys. It encrypts the AES key to ensure secure transmission.',
  },
  {
    id: 'implementation',
    title: 'Implementation Details',
    content:
      'The implementation involves using AES to encrypt files and RSA to encrypt the AES key. For decryption, RSA retrieves the AES key, which is then used to decrypt the file.',
  },
  {
    id: 'conclusion',
    title: 'Conclusion',
    content:
      'Hybrid Cryptography is a robust method for securing data. Combining AES and RSA ensures both speed and security in modern cryptographic systems.',
  },
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold">Hybrid Cryptography Documentation</h1>
          <p className="mt-2 text-indigo-200">Learn about AES, RSA, and how they work together.</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <nav className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Table of Contents</h2>
          <ul className="space-y-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Documentation Content */}
        <main className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6">
          {sections.map((section) => (
            <section id={section.id} key={section.id} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
              <p className="text-gray-600">{section.content}</p>
            </section>
          ))}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hybrid Cryptography. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
