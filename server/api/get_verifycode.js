import svgCaptcha from 'svg-captcha';
import md5 from 'js-md5';

export default defineEventHandler(async (event) => {
  try {
    const svg = svgCaptcha.create({
      size: 4,
      noise: 2,
      color: false,
      fontSize: 110,
      background: '#EEEEEE',
      width: 180,
      height: 80,
    });
    const verifycode_url = md5(btoa(svg.text.toLowerCase()));
    const svgBase64 = 'data:image/svg+xml;base64,' + btoa(svg.data.toString());
    return {
      verifycode_url: verifycode_url,
      svgBase64: svgBase64,
    };
  } catch (error) {
    console.error('Error generating verification code:', error);
    return {
      statusCode: 500,
      body: {
        message: 'Failed to generate verification code',
        error: error.message,
      },
    };
  }
});
