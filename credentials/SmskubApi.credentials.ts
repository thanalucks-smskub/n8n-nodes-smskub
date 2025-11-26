import {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class SmskubApi implements ICredentialType {
	name = 'smskubApi';
	displayName = 'SMSKUB API';
	documentationUrl = 'https://documenter.getpostman.com/view/9887776/2sAYXCjyAF';

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
	 * ไม่ต้องเขียนฟังก์ชันเอง แค่บอกว่าจะให้ยิง request แบบไหน
	 */
	test: ICredentialTestRequest = {
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
