import { createClient, IClient, RawGtv } from "postchain-client";


export class PostchainClient {

    client!: IClient;

    constructor() {
    }

    async init() {
        this.client = await createClient({
            directoryNodeUrlPool: [
                "https://dapps0.chromaway.com:7740",
                "https://chromina-node.stablelab.xyz:7740",
                "https://chromia-mainnet.w3coins.io:7740",
                "https://mainnet-dapp1.sunube.net:7740",
                "https://chromia.01node.com:7740",
                "https://chromia-mainnet.caliber.build:443",
                "https://chromia.nocturnallabs.org:7740",
            ],
            blockchainRid: "9E7D8243FE78287588E112384F8DC5F3E1CD35D48FD3BE41E46D8F17DD0BED65",
        })
    }

    async getTweetScoresCount() {
        return this.client.query("tweet_scores_count", {});
    }

    async getAccountsCount() {
        return this.client.query("accounts_count", {});
    }

    async getEngineCount() {
        return this.client.query("engine_count", {});
    }

    async getEngines(total: RawGtv) {
        return this.client.query("get_engines", {
            n_engines: total,
            pointer: 0
        });
    }

    async getTweetScoresCountByUserAddress(userAddress: string) {
        return this.client.query("get_tweet_scores_count_by_user_address", {
            user_address: userAddress
        });
    }
    async getTweetScoresByUserAddress(
        userAddress: string,
        pointer: number,
        nScores: number,
        endTime: number,
        startTime: number = 0
    ) {
        return this.client.query("get_tweet_scores_by_user_address", {
            user_address: userAddress,
            pointer,
            n_scores: nScores,
            end_time: endTime,
            start_time: startTime
        });
    }
}