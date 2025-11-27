import {
	INodeType,
	INodeTypeDescription,
	INodePropertyOptions,
	ILoadOptionsFunctions,
	NodeApiError,
	IDataObject,
	JsonObject,
} from 'n8n-workflow';

export class Smskub implements INodeType {

	methods = {
		loadOptions: {
			async getSenders(this: ILoadOptionsFunctions) {
				try {
					const creds = await this.getCredentials('smskubApi');

					// 💡 แก้จาก request() → httpRequest()
					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: 'https://console.sms-kub.com/api/senders/usable',
						headers: {
							key: creds.apiKey as string,
						},
						json: true,
					});

					if (!response?.data || !Array.isArray(response.data)) {
						throw new Error('Invalid SMSKUB response');
					}

					const returnData: INodePropertyOptions[] = [];

					for (const item of response.data as IDataObject[]) {
						returnData.push({
							name: item.name as string,
							value: item.name as string,
						});
					}

					return returnData;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as unknown as JsonObject);
				}
			},
		},
	};

	description: INodeTypeDescription = {
		displayName: 'SMSKUB',
		name: 'smskub',
		icon: 'file:smskub.svg',
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
				name: 'smskubApi',
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

			// SEND MESSAGE -------------------------------------
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

			// REQUEST OTP ---------------------------------------
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

			// VERIFY OTP ----------------------------------------
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
