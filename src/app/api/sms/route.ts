import { NextResponse } from 'next/server';
import africastalking from 'africastalking';

const credentials = {
    apiKey: process.env.AT_API_KEY || 'sandbox_api_key_placeholder',
    username: process.env.AT_USERNAME || 'sandbox'
};
const AT = africastalking(credentials);

export async function POST(request: Request) {
  try {
    const { studentPhone, landlordPhone, propertyName } = await request.json();
    
    if (!studentPhone || !landlordPhone || !propertyName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const message = `New viewing request for ${propertyName} from ${studentPhone}. Please reply to connect.`;
    
    // Dispatch SMS via Africa's Talking SDK
    const result = await AT.SMS.send({
      to: [landlordPhone],
      message,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('SMS API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send SMS' }, { status: 500 });
  }
}
