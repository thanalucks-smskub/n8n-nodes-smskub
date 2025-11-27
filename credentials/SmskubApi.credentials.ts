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
	 * Used by n8n when user clicks "Test" inside Credentials page.
	 * MUST use the built-in httpRequest test method — n8n will perform
	 * the request automatically.
	 */
	test: ICredentialTestRequest = {
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
