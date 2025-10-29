import nodemailer from 'nodemailer';

// Test different SMTP configurations
async function testAlternativeConfigs() {
    console.log('🔍 Testing Alternative SMTP Configurations...\n');

    const configs = [
        {
            name: 'Config 1: Port 587 with STARTTLS (Current)',
            config: {
                host: 'smtp.hostinger.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'enquiries@gourdshades.com',
                    pass: 'Capoeira_2019'
                },
                tls: {
                    rejectUnauthorized: false
                }
            }
        },
        {
            name: 'Config 2: Port 465 with SSL',
            config: {
                host: 'smtp.hostinger.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'enquiries@gourdshades.com',
                    pass: 'Capoeira_2019'
                },
                tls: {
                    rejectUnauthorized: false
                }
            }
        },
        {
            name: 'Config 3: Port 587 with explicit authMethod LOGIN',
            config: {
                host: 'smtp.hostinger.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'enquiries@gourdshades.com',
                    pass: 'Capoeira_2019'
                },
                authMethod: 'LOGIN',
                tls: {
                    rejectUnauthorized: false
                }
            }
        },
        {
            name: 'Config 4: Port 587 with requireTLS',
            config: {
                host: 'smtp.hostinger.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'enquiries@gourdshades.com',
                    pass: 'Capoeira_2019'
                },
                tls: {
                    rejectUnauthorized: false
                }
            }
        }
    ];

    for (const { name, config } of configs) {
        console.log(`\n📧 Testing: ${name}`);
        console.log('Configuration:', JSON.stringify(config, null, 2));
        
        try {
            const transporter = nodemailer.createTransport(config);
            
            console.log('📡 Verifying connection...');
            await transporter.verify();
            console.log('✅ SUCCESS: Connection verified!');
            
            // If verification succeeds, try sending a test email
            console.log('📤 Sending test email...');
            const info = await transporter.sendMail({
                from: 'enquiries@gourdshades.com',
                to: 'enquiries@gourdshades.com',
                subject: `Test Email - ${name}`,
                text: `Test email sent using ${name}`,
                html: `<p>Test email sent using <strong>${name}</strong></p>`
            });
            
            console.log('✅ SUCCESS: Email sent!');
            console.log('Message ID:', info.messageId);
            break; // Stop testing if one works
            
        } catch (error) {
            console.log('❌ FAILED:');
            console.log('Error Code:', error.code);
            console.log('Error Message:', error.message);
            console.log('Response Code:', error.responseCode);
            console.log('Response:', error.response);
        }
    }
}

// Run the tests
testAlternativeConfigs().then(() => {
    console.log('\n🏁 Alternative configuration testing completed');
    process.exit(0);
}).catch((error) => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
});