import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SmskubApi implements ICredentialType {
	name = 'SmskubApi';
	displayName = 'SMSKUB API';
	documentationUrl = 'https://documenter.getpostman.com/view/9887776/2sAYXCjyAF';

	/**
	 * n8n จะ inject header นี้ให้อัตโนมัติในทุก request
	 * ไม่ต้องระบุ key header ใน node โดยตรงอีกต่อไป
	 */
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				key: '={{$credentials.apiKey}}',
			},
		},
	};

	properties: INodeProperties[] = [
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
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://console.sms-kub.com/api',
			url: '/senders/usable',
			method: 'GET',
		},
	};
}
