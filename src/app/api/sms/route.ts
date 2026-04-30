// src/app/api/sms/route.ts
import { NextResponse } from 'next/server';
import AfricasTalking from 'africastalking';

// Initialize the SDK specifically for Sandbox
const credentials = {
    apiKey: process.env.AT_API_KEY as string,
    username: 'sandbox', // MUST be 'sandbox' for the simulator to work
};

const africastalking = AfricasTalking(credentials);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studentName, studentPhone, landlordPhone, message, propertyName } = body;

        // Strict validation matching the frontend payload
        if (!studentPhone || !landlordPhone || !message) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const sms = africastalking.SMS;
        
        // Construct the final message that the landlord will see
        const formattedMessage = `QEJAYETU ALERT: New viewing request for ${propertyName}.\nFrom: ${studentName} (${studentPhone}).\nMessage: "${message}"`;

        // Send the SMS
        const result = await sms.send({
            to: [landlordPhone], 
            message: formattedMessage,
        } as any);

        console.log("AT API Response:", result); 
        return NextResponse.json({ success: true, data: result });

    } catch (error: unknown) {
        console.error('SMS API Error:', error);
        return NextResponse.json({ success: false, error: (error as Error).message || 'Failed to send SMS' }, { status: 500 });
    }
}