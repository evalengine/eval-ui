import api from "@/lib/axios/eval";

// must have postfix API to avoid name conflict for mutation
export default {
  async evaluateTweet(payload:
    {
      input_tweet: string;
      output_tweet: string;
    }
  ) {
    const response = await api.post(`/api/eval/evaluate-tweet`, payload);
    return response.data;
  },
  async scores() {
    const response = await api.get(`/api/eval/scores`);
    return response.data;
  },
  async allScores() {
    const response = await api.post(`/api/eval/all-scores`, undefined, {
      baseURL: "/"
    });
    return response.data;
  },
  async getVirtual(payload) {
    const response = await api.post(`https://asia-southeast1-twitter-agent-1076f.cloudfunctions.net/api-getVirtual`, payload);
    return response.data;
  },
  async reactTwitter(payload) {
    const response = await api.post(`https://game-api.virtuals.io/api/react/twitter`, payload);
    return response.data;
  },
};
