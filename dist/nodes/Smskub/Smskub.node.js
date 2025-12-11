"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Smskub = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class Smskub {
    constructor() {
        this.methods = {
            loadOptions: {
                async getSenders() {
                    try {
                        const creds = await this.getCredentials('SmskubApi');
                        const response = await this.helpers.request({
                            method: 'GET',
                            url: '/senders/usable',
                            json: true,
                            headers: {
                                key: creds.apiKey,
                            },
                        });
                        if (!response?.data || !Array.isArray(response.data)) {
                            throw new Error('Invalid SMSKUB response');
                        }
                        const returnData = [];
                        for (const item of response.data) {
                            returnData.push({
                                name: item.name,
                                value: item.name,
                            });
                        }
                        return returnData;
                    }
                    catch (error) {
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                    }
                },
            },
        };
        this.description = {
            displayName: 'SMSKUB',
            name: 'Smskub',
            icon: 'file:Smskub/smskub.svg',
            group: ['transform'],
            version: 1,
            description: 'SMSKUB Messages & OTP API',
            defaults: {
                name: 'SMS-KUB',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'SmskubApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: 'https://console.sms-kub.com/api',
                headers: {
                    key: '={{$credentials.apiKey}}',
                },
            },
            properties: [
                // ------------------------------
                // Action
                // ------------------------------
                {
                    displayName: 'Action',
                    name: 'operation',
                    type: 'options',
                    default: 'sendMessage',
                    options: [
                        {
                            name: 'Send Quick Message',
                            value: 'sendMessage',
                        },
                        {
                            name: 'Request OTP',
                            value: 'requestOtp',
                        },
                        {
                            name: 'Verify OTP',
                            value: 'verifyOtp',
                        },
                    ],
                },
                // -------------------------------
                // 1) Send SMS
                // -------------------------------
                {
                    displayName: 'Phone Number',
                    name: 'msgPhone',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { operation: ['sendMessage'] } },
                },
                {
                    displayName: 'Sender Name',
                    name: 'msgFrom',
                    type: 'options',
                    required: true,
                    default: '',
                    typeOptions: {
                        loadOptionsMethod: 'getSenders',
                    },
                    displayOptions: { show: { operation: ['sendMessage'] } },
                },
                {
                    displayName: 'Message',
                    name: 'msgText',
                    type: 'string',
                    required: true,
                    default: '',
                    typeOptions: { rows: 3 },
                    displayOptions: { show: { operation: ['sendMessage'] } },
                },
                {
                    displayName: 'Send Message',
                    name: 'sendMessageRouting',
                    type: 'hidden',
                    default: '',
                    noDataExpression: true,
                    displayOptions: { show: { operation: ['sendMessage'] } },
                    routing: {
                        request: {
                            method: 'POST',
                            url: '/messages',
                            headers: { 'Content-Type': 'application/json' },
                            json: true,
                            body: {
                                to: '={{ [$parameter.msgPhone] }}',
                                from: '={{$parameter.msgFrom}}',
                                message: '={{$parameter.msgText}}',
                            },
                        },
                    },
                },
                // -------------------------------
                // 2) Request OTP
                // -------------------------------
                {
                    displayName: 'Phone Number',
                    name: 'otpPhone',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { operation: ['requestOtp'] } },
                },
                {
                    displayName: 'Project ID',
                    name: 'otpProject',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { operation: ['requestOtp'] } },
                },
                {
                    displayName: 'OTP Message (Optional)',
                    name: 'otpMessage',
                    type: 'string',
                    default: '',
                    displayOptions: { show: { operation: ['requestOtp'] } },
                },
                {
                    displayName: 'Request OTP',
                    name: 'requestOtpRouting',
                    type: 'hidden',
                    default: '',
                    noDataExpression: true,
                    displayOptions: { show: { operation: ['requestOtp'] } },
                    routing: {
                        request: {
                            method: 'POST',
                            url: '/v2/otp/request',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: {
                                phone: '={{$parameter.otpPhone}}',
                                project: '={{$parameter.otpProject}}',
                                message: '={{$parameter.otpMessage}}',
                            },
                        },
                    },
                },
                // -------------------------------
                // 3) Verify OTP
                // -------------------------------
                {
                    displayName: 'OTP Code',
                    name: 'verifyCode',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { operation: ['verifyOtp'] } },
                },
                {
                    displayName: 'Project ID',
                    name: 'verifyProject',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { operation: ['verifyOtp'] } },
                },
                {
                    displayName: 'Phone Number',
                    name: 'verifyPhone',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { operation: ['verifyOtp'] } },
                },
                {
                    displayName: 'Verify OTP',
                    name: 'verifyOtpRouting',
                    type: 'hidden',
                    default: '',
                    noDataExpression: true,
                    displayOptions: { show: { operation: ['verifyOtp'] } },
                    routing: {
                        request: {
                            method: 'POST',
                            url: '/v2/otp/verify',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: {
                                otp: '={{$parameter.verifyCode}}',
                                project: '={{$parameter.verifyProject}}',
                                phone: '={{$parameter.verifyPhone}}',
                            },
                        },
                    },
                },
            ], // END properties
        };
    }
}
exports.Smskub = Smskub;
//# sourceMappingURL=Smskub.node.js.map