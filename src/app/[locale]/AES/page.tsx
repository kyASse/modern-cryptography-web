'use client';

import React, { useState } from 'react'
import CryptoJS from 'crypto-js';
import { FC } from 'react';
import { useTranslations } from 'next-intl'
interface Props {
  locale: string
}

export default function AES() {
  const t = useTranslations('')
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  // const handleGenerateKey = () => {
  //   setIsGeneratingKey(true);
  //   // Generate RSA key here
  //   setTimeout(() => {
  //     setIsGeneratingKey(false);
  //     setKey('Generated Key');
  //   }, 2000);
  // };

  const handleEncrypt = () => {
    if (!inputText || !key) {
      setAlertMessage('Teks atau kunci tidak boleh kosong!');
      return;
    }

    try {
      // Enkripsi teks menggunakan kunci
      const ciphertext = CryptoJS.AES.encrypt(inputText, key).toString();
      setEncryptedText(ciphertext);
      setAlertMessage('Enkripsi berhasil!');
    } catch (error) {
      setAlertMessage('Terjadi kesalahan saat enkripsi.');
      console.error('Encryption Error:', error);
    }
  };

  const handleDecrypt = () => {
    if (!encryptedText || !key) {
      setAlertMessage('Teks terenkripsi atau kunci tidak boleh kosong!');
      return;
    }

    try {
      // Dekripsi teks menggunakan kunci
      const bytes = CryptoJS.AES.decrypt(encryptedText, key);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      if (!originalText) {
        setAlertMessage('Dekripsi gagal. Kunci mungkin salah.');
      } else {
        setDecryptedText(originalText);
        setAlertMessage('Dekripsi berhasil!');
      }
    } catch (error) {
      setAlertMessage('Terjadi kesalahan saat dekripsi.');
      console.error('Decryption Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary text-text-secondary p-6">
      <h1 className="text-center text-4xl font-bold mb-8 text-text-secondary">
        Algoritma AES (Advanced Encryption Standard)
      </h1>

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
          <input
            type="text"
            value={key}
            onChange={handleKeyChange}
            placeholder="Input kunci (AES)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {/*<button*/}
          {/*  onClick={handleGenerateKey}*/}
          {/*  disabled={isGeneratingKey}*/}
          {/*  className={`w-full py-2 rounded-lg text-white font-semibold ${*/}
          {/*    isGeneratingKey*/}
          {/*      ? "bg-gray-400 cursor-not-allowed"*/}
          {/*      : "bg-indigo-500 hover:bg-indigo-600"*/}
          {/*  }`}*/}
          {/*>*/}
          {/*  {isGeneratingKey ? "Generating..." : "Generate Key (RSA)"}*/}
          {/*</button>*/}
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
          <span
            className="font-semibold text-gray-600">Hasil teks/file terenkripsi:</span> {encryptedText || "Belum ada data"}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Hasil dekripsi:</span> {decryptedText || "Belum ada data"}
        </p>
      </section>

      {/* Notification Section */}
      <section className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Notifikasi/Alert</h2>
        <p
          className={`text-center py-2 rounded-lg ${
            alertMessage
              ? "bg-yellow-100 text-yellow-700 font-semibold"
              : "text-gray-500"
          }`}
        >
          {alertMessage || "Belum ada notifikasi"}
        </p>
      </section>
    </div>

  );
}
