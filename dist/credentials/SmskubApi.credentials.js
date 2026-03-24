"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmskubApi = void 0;
class SmskubApi {
    constructor() {
        this.name = 'SmskubApi';
        this.displayName = 'SMSKUB API';
        this.documentationUrl = 'https://documenter.getpostman.com/view/9887776/2sAYXCjyAF';
        /**
         * n8n จะ inject header นี้ให้อัตโนมัติในทุก request
         * ไม่ต้องระบุ key header ใน node โดยตรงอีกต่อไป
         */
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    key: '={{$credentials.apiKey}}',
                },
            },
        };
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
         * เนื่องจากมี authenticate method แล้ว ไม่ต้องใส่ key header ที่นี่อีก
         */
        this.test = {
            request: {
                baseURL: 'https://console.sms-kub.com/api',
                url: '/senders/usable',
                method: 'GET',
            },
        };
    }
}
exports.SmskubApi = SmskubApi;
//# sourceMappingURL=SmskubApi.credentials.js.map