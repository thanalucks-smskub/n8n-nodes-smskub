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
	icon = 'file:smskub.svg' as const;

	/**
	 * n8n will automatically inject this header into every request.
	 * No need to add the API key header in the node directly.
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
	 * n8n uses this object when the user clicks the "Test" button in the Credentials page.
	 * Since the authenticate method is defined, the key header is injected automatically.
	 */
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://console.sms-kub.com/api',
			url: '/senders/usable',
			method: 'GET',
		},
	};
}
