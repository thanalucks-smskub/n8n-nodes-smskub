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
         * Used by n8n when user clicks "Test" inside Credentials page.
         * MUST use the built-in httpRequest test method — n8n will perform
         * the request automatically.
         */
        this.test = {
            request: {
                method: 'GET',
                baseURL: 'https://console.sms-kub.com/api',
                url: '/senders/usable',
                headers: {
                    key: '={{$credentials.apiKey}}',
                },
            },
        };
    }
}
exports.SmskubApi = SmskubApi;
//# sourceMappingURL=SmskubApi.credentials.js.map