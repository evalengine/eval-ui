import api from "@/lib/api";

// must have postfix API to avoid name conflict for mutation
export default {
  async evaluateTweet(payload) {
    const response = await api.post(`/api/eval/evaluate-tweet`, payload);
    return response.data;
  },
};
