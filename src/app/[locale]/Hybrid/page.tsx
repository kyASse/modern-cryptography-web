'use client';

import React, { useState } from 'react';
import NodeRSA from 'node-rsa';
import CryptoJS from 'crypto-js';

export default function HybridEncryptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [aesKey, setAesKey] = useState<string>('');
  const [encryptedFile, setEncryptedFile] = useState<string | null>(null);
  const [decryptedFile, setDecryptedFile] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [encryptedAesKey, setEncryptedAesKey] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const rsaKey = new NodeRSA({ b: 512 }); // Generate 512-bit key pair
  rsaKey.generateKeyPair();

  const handleGenerateKeys = () => {
    const generatedPublicKey = rsaKey.exportKey('public');
    const generatedPrivateKey = rsaKey.exportKey('private');
    setPublicKey(generatedPublicKey);
    setPrivateKey(generatedPrivateKey);
    setAlertMessage('Kunci RSA berhasil dibuat!');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleEncrypt = async () => {
    if (!file || !publicKey) {
      setAlertMessage('File dan kunci publik harus disediakan!');
      return;
    }

    try {
      // Generate AES key
      const generatedAesKey = CryptoJS.lib.WordArray.random(16).toString();
      setAesKey(generatedAesKey);

      // Read file as base64
      const fileData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Encrypt file using AES
      const encryptedFileData = CryptoJS.AES.encrypt(fileData, generatedAesKey).toString();
      setEncryptedFile(encryptedFileData);

      // Encrypt AES key using RSA
      const rsa = new NodeRSA(publicKey);
      const encryptedAesKeyData = rsa.encrypt(generatedAesKey, 'base64');
      setEncryptedAesKey(encryptedAesKeyData);

      setAlertMessage('File berhasil dienkripsi!');
    } catch (error) {
      setAlertMessage('Terjadi kesalahan saat enkripsi.');
      console.error('Encryption Error:', error);
    }
  };

  const handleDecrypt = () => {
    if (!encryptedFile || !encryptedAesKey || !privateKey) {
      setAlertMessage('File terenkripsi, kunci AES terenkripsi, dan kunci privat harus disediakan!');
      return;
    }

    try {
      // Decrypt AES key using RSA
      const rsa = new NodeRSA(privateKey);
      const decryptedAesKeyData = rsa.decrypt(encryptedAesKey, 'utf8');

      // Decrypt file using AES
      const bytes = CryptoJS.AES.decrypt(encryptedFile, decryptedAesKeyData);
      const originalFileData = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedFile(originalFileData);

      setAlertMessage('File berhasil didekripsi!');
    } catch (error) {
      setAlertMessage('Terjadi kesalahan saat dekripsi.');
      console.error('Decryption Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary text-text-secondary p-6">
      <h1 className="text-center text-4xl font-bold mb-8 text-text-secondary">
        Hybrid Cryptography (AES + RSA)
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

      {/* File Input Section */}
      <section className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Input File</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
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
        <p>
          <span className="font-semibold text-gray-600">AES Key (Encrypted):</span>{' '}
          {encryptedAesKey || 'Belum ada data'}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Decrypted File (Base64):</span>{' '}
          {decryptedFile || 'Belum ada data'}
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
