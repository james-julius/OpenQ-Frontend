import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GET_ORGANIZATION, GET_USER, GET_BOUNTY, GET_ALL_BOUNTIES, SUBSCRIBE_TO_BOUNTY, GET_ORGANIZATIONS } from './graphql/query';
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';

class OpenQSubgraphClient {
	constructor() { }

	httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_OPENQ_SUBGRAPH_HTTP_URL, fetch });

	client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_OPENQ_SUBGRAPH_URL,
		link: this.httpLink,
		cache: new InMemoryCache(),
	});

	async getAllBounties() {
		const promise = new Promise(async (resolve, reject) => {
			try {
				const result = await this.client.query({
					query: GET_ALL_BOUNTIES,
				});
				resolve(result.data.bounties);
			} catch (e) {
				reject(e);
			}
		});

		return promise;
	}

	async getBounty(id) {
		const promise = new Promise(async (resolve, reject) => {
			try {
				const result = await this.client.query({
					query: GET_BOUNTY,
					variables: { id }
				});
				resolve(result.data.bounty);
			} catch (e) {
				reject(e);
			}
		});

		return promise;
	}

	async getUser(id) {
		const promise = new Promise(async (resolve, reject) => {
			try {
				const result = await this.client.query({
					query: GET_USER,
					variables: { id }
				});
				resolve(result.data.user);
			} catch (e) {
				reject(e);
			}
		});

		return promise;
	}

	async getOrganizations() {
		const promise = new Promise(async (resolve, reject) => {
			try {
				const result = await this.client.query({
					query: GET_ORGANIZATIONS,
				});
				resolve(result.data.organizations);
			} catch (e) {
				reject(e);
			}
		});

		return promise;
	}

	async getOrganization(id) {
		const promise = new Promise(async (resolve, reject) => {
			try {
				const result = await this.client.query({
					query: GET_ORGANIZATION,
					variables: { id }
				});
				resolve(result.data.organization);
			} catch (e) {
				reject(e);
			}
		});

		return promise;
	}
}

export default OpenQSubgraphClient;