"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmskubApi = void 0;
class SmskubApi {
    constructor() {
        this.name = 'smskubApi';
        this.displayName = 'SMSKUB API';
        this.documentationUrl = 'https://documenter.getpostman.com/view/9887776/2sAYXCjyAF';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                description: 'Your SMSKUB API Key for authentication',
            },
        ];
        /**
         * n8n จะใช้ object `test` นี้เวลาเรากดปุ่ม "Test" ในหน้า Credentials
         * ไม่ต้องเขียนฟังก์ชันเอง แค่บอกว่าจะให้ยิง request แบบไหน
         */
        this.test = {
            request: {
                baseURL: 'https://console.sms-kub.com/api',
                url: '/senders/usable',
                method: 'GET',
                headers: {
                    // ดึงค่าจาก credentials โดยตรง
                    key: '={{$credentials.apiKey}}',
                },
                // json: true ไม่จำเป็นต้องใส่ที่นี่ก็ได้ เพราะ n8n handle ให้
            },
        };
    }
}
exports.SmskubApi = SmskubApi;
//# sourceMappingURL=SmskubApi.credentials.js.map