import nodemailer from 'nodemailer';

// Test SMTP connection with detailed debugging
async function testSMTPConnection() {
    console.log('🔍 Testing SMTP Connection...');
    console.log('Configuration:');
    console.log('- Host:', 'smtp.hostinger.com');
    console.log('- Port:', 587);
    console.log('- Secure:', false);
    console.log('- Username:', 'enquiries@gourdshades.com');
    console.log('- Password:', 'Capoeira_2019');
    console.log('');

    // Create transporter with debug enabled
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false, // TLS
        auth: {
            user: 'enquiries@gourdshades.com',
            pass: 'Capoeira_2019'
        },
        debug: true, // Enable debug output
        logger: true, // Log to console
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('📡 Attempting to verify connection...');
        const verification = await transporter.verify();
        console.log('✅ SMTP Connection successful!', verification);
        
        console.log('📧 Attempting to send test email...');
        const info = await transporter.sendMail({
            from: 'enquiries@gourdshades.com',
            to: 'enquiries@gourdshades.com', // Send to self for testing
            subject: 'SMTP Test Email',
            text: 'This is a test email to verify SMTP configuration.',
            html: '<p>This is a test email to verify SMTP configuration.</p>'
        });
        
        console.log('✅ Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        
    } catch (error) {
        console.log('❌ SMTP Error occurred:');
        console.log('Error Code:', error.code);
        console.log('Error Message:', error.message);
        console.log('Command:', error.command);
        console.log('Response:', error.response);
        console.log('ResponseCode:', error.responseCode);
        console.log('Full Error:', error);
    }
}

// Run the test
testSMTPConnection().then(() => {
    console.log('🏁 Test completed');
    process.exit(0);
}).catch((error) => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
});