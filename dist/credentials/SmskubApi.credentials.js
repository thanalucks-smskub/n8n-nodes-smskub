"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmskubApi = void 0;
class SmskubApi {
    constructor() {
        this.name = 'SmskubApi';
        this.displayName = 'SMSKUB API';
        this.documentationUrl = 'https://documenter.getpostman.com/view/9887776/2sAYXCjyAF';
        this.icon = 'file:smskub.svg';
        /**
         * n8n will automatically inject this header into every request.
         * No need to add the API key header in the node directly.
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
         * n8n uses this object when the user clicks the "Test" button in the Credentials page.
         * Since the authenticate method is defined, the key header is injected automatically.
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