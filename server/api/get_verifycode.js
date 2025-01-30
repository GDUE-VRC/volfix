import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var svgCaptcha = require('svg-captcha');
import md5 from 'js-md5';
import { fileURLToPath } from 'node:url'; // 新增导入
import { dirname } from 'node:path'; // 新增导入

// 定义 __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

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
    const verifycode_url = md5(Buffer.from(svg.text.toLowerCase()).toString('base64'));
    const svgBase64 = 'data:image/svg+xml;base64,' + Buffer.from(svg.data).toString('base64');
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
