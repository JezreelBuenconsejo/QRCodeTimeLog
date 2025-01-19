import React, { useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { Loader2 } from "lucide-react";

interface Log {
	name: string;
	employeeId: string;
	timeIn: string | null;
	timeOut: string | null;
}

const TestPage: React.FC = () => {
	const [logs, setLogs] = useState<Log[]>([]);
	const [status, setStatus] = useState<string>("");
	const [isReloading, setIsReloading] = useState<boolean>(false);

	const handleScan = (barcodes: IDetectedBarcode[]) => {
		if (barcodes.length > 0) {
			try {
				// Trigger reloading for 1 second
				setIsReloading(true);
				setTimeout(() => {
					setIsReloading(false);
				}, 1000);

				// Parse QR code data as JSON
				const parsedData = JSON.parse(barcodes[0].rawValue);
				const name = parsedData.Name || "Unknown";
				const employeeId = parsedData["Employee ID"] || "Unknown";
				const now = new Date().toISOString();

				setLogs(prevLogs => {
					const existingLogIndex = prevLogs.findIndex(
						log => log.employeeId === employeeId && log.timeOut === null
					);

					if (existingLogIndex >= 0) {
						// Update the existing log with Time Out
						const updatedLogs = [...prevLogs];
						updatedLogs[existingLogIndex].timeOut = now;
						setStatus(
							`Employee ${name} (ID: ${employeeId}) checked out at ${new Date(now).toLocaleTimeString()}`
						);
						return updatedLogs;
					} else {
						// Create a new log entry for Time In
						const newLog: Log = { name, employeeId, timeIn: now, timeOut: null };
						setStatus(
							`Employee ${name} (ID: ${employeeId}) checked in at ${new Date(now).toLocaleTimeString()}`
						);
						return [...prevLogs, newLog];
					}
				});
			} catch (error) {
				setStatus("Invalid QR code format. Please scan a valid JSON QR code.");
				console.error("QR Parsing Error:", error);
			}
		}
	};

	const handleError = (error: unknown) => {
		console.error("QR Reader Error: ", error);
		setStatus("Error scanning QR code. Please try again.");
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
			<div className="max-w-3xl w-full p-6 shadow-md bg-white">
				<h1 className="text-2xl font-bold text-center mb-6">QR Code Attendance</h1>

				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-2">Scan QR Code</h2>
					<div className="flex justify-center w-64 h-64">
						{isReloading ? (
							<div className="flex flex-col justify-center items-center w-64 h-64 border">
								<p>Reloading</p> <Loader2 className="w-5 h-5 animate-spin" />
							</div>
						) : (
							<Scanner
								onScan={barcodes => handleScan(barcodes)}
								onError={error => handleError(error)}
								allowMultiple
							/>
						)}
					</div>
					<p className="text-center text-gray-600 mt-4">{status}</p>
				</div>

				<div className="text-lg font-semibold mb-4">Attendance Logs</div>
				<table className="table-auto w-full">
					<thead className="bg-gray-200">
						<tr>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Employee ID</th>
							<th className="px-4 py-2">Time In</th>
							<th className="px-4 py-2">Time Out</th>
						</tr>
					</thead>
					<tbody>
						{logs.map((log, index) => (
							<tr key={index} className="odd:bg-white even:bg-gray-50">
								<td className="px-4 py-2">{log.name}</td>
								<td className="px-4 py-2">{log.employeeId}</td>
								<td className="px-4 py-2">
									{log.timeIn ? new Date(log.timeIn).toLocaleString() : "-"}
								</td>
								<td className="px-4 py-2">
									{log.timeOut ? new Date(log.timeOut).toLocaleString() : "-"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TestPage;
