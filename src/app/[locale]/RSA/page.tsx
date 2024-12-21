'use client';

import React, { useState } from 'react';
import NodeRSA from 'node-rsa';
import { useTranslations } from 'next-intl'

export default function RSAComponent() {
  const t = useTranslations('')
  const [inputText, setInputText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const key = new NodeRSA({ b: 512 }); // Generate 512-bit key
  key.generateKeyPair();

  const handleGenerateKeys = () => {
    try {
      const generatedPublicKey = key.exportKey('public');
      const generatedPrivateKey = key.exportKey('private');
      setPublicKey(generatedPublicKey);
      setPrivateKey(generatedPrivateKey);
      setAlertMessage('Kunci RSA berhasil dibuat!');
    } catch (error) {
      setAlertMessage('Gagal membuat kunci RSA.');
      console.error('Key Generation Error:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleEncrypt = () => {
    if (!inputText || !publicKey) {
      setAlertMessage('Teks atau kunci publik tidak boleh kosong!');
      return;
    }

    try {
      const rsa = new NodeRSA(publicKey);
      const ciphertext = rsa.encrypt(inputText, 'base64');
      setEncryptedText(ciphertext);
      setAlertMessage('Enkripsi berhasil!');
    } catch (error) {
      setAlertMessage('Terjadi kesalahan saat enkripsi.');
      console.error('Encryption Error:', error);
    }
  };

  const handleDecrypt = () => {
    if (!encryptedText || !privateKey) {
      setAlertMessage('Teks terenkripsi atau kunci privat tidak boleh kosong!');
      return;
    }

    try {
      const rsa = new NodeRSA(privateKey);
      const originalText = rsa.decrypt(encryptedText, 'utf8');
      setDecryptedText(originalText);
      setAlertMessage('Dekripsi berhasil!');
    } catch (error) {
      setAlertMessage('Terjadi kesalahan saat dekripsi.');
      console.error('Decryption Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary text-text-secondary p-6">
      <h1 className="text-center text-4xl font-bold mb-8 text-text-secondary">
        Algoritma RSA (Rivest-Shamir-Adleman)
      </h1>

      {/* Generate Keys Section */}
      <section className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Generate RSA Keys</h2>
        <button
          onClick={handleGenerateKeys}
          className="w-full py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600"
        >
          Generate RSA Keys
        </button>
        <div className="mt-4">
          <h3 className="font-bold text-gray-700">Public Key:</h3>
          <textarea
            value={publicKey}
            readOnly
            className="w-full h-24 border border-gray-300 rounded-lg p-2 mt-2 text-sm bg-gray-100"
          ></textarea>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-gray-700">Private Key:</h3>
          <textarea
            value={privateKey}
            readOnly
            className="w-full h-24 border border-gray-300 rounded-lg p-2 mt-2 text-sm bg-gray-100"
          ></textarea>
        </div>
      </section>

      {/* Input Section */}
      <section className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Input Section</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Input teks"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </section>

      {/* Button Section */}
      <section className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tombol</h2>
        <div className="flex justify-between">
          <button
            onClick={handleEncrypt}
            className="w-[48%] bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
          >
            Encrypt
          </button>
          <button
            onClick={handleDecrypt}
            className="w-[48%] bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
          >
            Decrypt
          </button>
        </div>
      </section>

      {/* Output Section */}
      <section className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Output Section</h2>
        <p className="mb-2">
          <span className="font-semibold text-gray-600">Hasil teks terenkripsi:</span>{' '}
          {encryptedText || 'Belum ada data'}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Hasil dekripsi:</span> {decryptedText || 'Belum ada data'}
        </p>
      </section>

      {/* Notification Section */}
      <section className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Notifikasi/Alert</h2>
        <p
          className={`text-center py-2 rounded-lg ${
            alertMessage ? 'bg-yellow-100 text-yellow-700 font-semibold' : 'text-gray-500'
          }`}
        >
          {alertMessage || 'Belum ada notifikasi'}
        </p>
      </section>
    </div>
  );
}
