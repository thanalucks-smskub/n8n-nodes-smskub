import {
	INodeType,
	INodeTypeDescription,
	INodePropertyOptions,
	ILoadOptionsFunctions,
	NodeConnectionTypes,
	IDataObject,
} from 'n8n-workflow';

export class Smskub implements INodeType {

	methods = {
		loadOptions: {
			async getSenders(this: ILoadOptionsFunctions) {
				try {
					const creds = await this.getCredentials('SmskubApi');

					// loadOptions context requires manual credential handling
					// (authenticate method covers declarative routing requests only)
					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: 'https://console.sms-kub.com/api/senders/usable',
						json: true,
						headers: {
							key: creds.apiKey as string,
						},
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
					const errorMessage = (error as any).message || (error as any).toString();
					throw new Error(`Failed to load senders: ${errorMessage}`);
				}
			},
		},
	};

	description: INodeTypeDescription = {
		displayName: 'SMSKUB',
		name: 'Smskub',
		icon: 'file:smskub.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter.operation}}',
		description: 'Send SMS messages and manage OTP via SMSKUB API',
		defaults: {
			name: 'SMSKUB',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],

		credentials: [
			{
				name: 'SmskubApi',
				required: true,
			},
		],

		requestDefaults: {
			baseURL: 'https://console.sms-kub.com/api',
		},

		properties: [
			// ------------------------------
			// Resource
			// ------------------------------
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				default: 'sms',
				description: 'The resource to operate on',
				options: [
					{
						name: 'SMS',
						value: 'sms',
						description: 'Send SMS messages',
					},
					{
						name: 'OTP',
						value: 'otp',
						description: 'Request and verify OTP codes',
					},
				],
			},

			// ------------------------------
			// Operation (SMS)
			// ------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'send',
				description: 'The operation to perform',
				displayOptions: {
					show: {
						resource: ['sms'],
					},
				},
				options: [
					{
						name: 'Send Quick Message',
						value: 'send',
						description: 'Send a quick SMS message to a phone number',
						action: 'Send a quick SMS message',
					},
				],
			},

			// ------------------------------
			// Operation (OTP)
			// ------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'request',
				description: 'The operation to perform',
				displayOptions: {
					show: {
						resource: ['otp'],
					},
				},
				options: [
					{
						name: 'Request OTP',
						value: 'request',
						description: 'Send an OTP code to a phone number',
						action: 'Request an OTP',
					},
					{
						name: 'Verify OTP',
						value: 'verify',
						description: 'Verify an OTP code entered by the user',
						action: 'Verify an OTP',
					},
				],
			},

			// -------------------------------
			// Fields: SMS > Send
			// -------------------------------
			{
				displayName: 'Phone Number',
				name: 'msgPhone',
				type: 'string',
				required: true,
				default: '',
				description: 'The recipient phone number (e.g. 0812345678)',
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
			},
			{
				displayName: 'Sender Name',
				name: 'msgFrom',
				type: 'options',
				required: true,
				default: '',
				description: 'The sender name to display on the SMS. Choose from your approved senders.',
				typeOptions: {
					loadOptionsMethod: 'getSenders',
				},
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
			},
			{
				displayName: 'Message',
				name: 'msgText',
				type: 'string',
				required: true,
				default: '',
				description: 'The text content of the SMS message',
				typeOptions: { rows: 3 },
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
			},
			{
				displayName: 'Send SMS',
				name: 'sendSmsRouting',
				type: 'hidden',
				default: '',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
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
			// Fields: OTP > Request
			// -------------------------------
			{
				displayName: 'Phone Number',
				name: 'otpPhone',
				type: 'string',
				required: true,
				default: '',
				description: 'The phone number to send the OTP code to (e.g. 0812345678)',
				displayOptions: {
					show: {
						resource: ['otp'],
						operation: ['request'],
					},
				},
			},
			{
				displayName: 'Project ID',
				name: 'otpProject',
				type: 'string',
				required: true,
				default: '',
				description: 'The OTP project ID from your SMSKUB console',
				displayOptions: {
					show: {
						resource: ['otp'],
						operation: ['request'],
					},
				},
			},
			{
				displayName: 'OTP Message',
				name: 'otpMessage',
				type: 'string',
				default: '',
				description: 'Custom OTP message template (optional, uses default if empty)',
				displayOptions: {
					show: {
						resource: ['otp'],
						operation: ['request'],
					},
				},
			},
			{
				displayName: 'Request OTP',
				name: 'requestOtpRouting',
				type: 'hidden',
				default: '',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['otp'],
						operation: ['request'],
					},
				},
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
			// Fields: OTP > Verify
			// -------------------------------
			{
				displayName: 'OTP Code',
				name: 'verifyCode',
				type: 'string',
				required: true,
				default: '',
				description: 'The OTP code to verify',
				displayOptions: {
					show: {
						resource: ['otp'],
						operation: ['verify'],
					},
				},
			},
			{
				displayName: 'Project ID',
				name: 'verifyProject',
				type: 'string',
				required: true,
				default: '',
				description: 'The OTP project ID from your SMSKUB console',
				displayOptions: {
					show: {
						resource: ['otp'],
						operation: ['verify'],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'verifyPhone',
				type: 'string',
				required: true,
				default: '',
				description: 'The phone number that received the OTP code',
				displayOptions: {
					show: {
						resource: ['otp'],
						operation: ['verify'],
					},
				},
			},
			{
				displayName: 'Verify OTP',
				name: 'verifyOtpRouting',
				type: 'hidden',
				default: '',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['otp'],
						operation: ['verify'],
					},
				},
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
