import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";

interface QRData {
  id: string;
  firstName: string;
  lastName: string;
}

const QRGenerator: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [qrData, setQrData] = useState<QRData | null>(null);

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    const newQRData: QRData = {
      id: uuidv4(),
      firstName,
      lastName,
    };

    setQrData(newQRData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full p-6 shadow-md bg-white rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">QR Code Generator</h1>

        <form onSubmit={handleGenerateQR} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter last name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Generate QR Code
          </button>
        </form>

        {qrData && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold mb-4">Generated QR Code</h2>
            <QRCodeCanvas value={JSON.stringify(qrData)} size={200} />
            <div className="mt-4 text-left">
              <p><strong>ID:</strong> {qrData.id}</p>
              <p><strong>First Name:</strong> {qrData.firstName}</p>
              <p><strong>Last Name:</strong> {qrData.lastName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerator;
