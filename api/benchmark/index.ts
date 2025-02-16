import api from "@/lib/axios/benchmark";

// must have postfix API to avoid name conflict for mutation
export default {
  async models() {
    const response = await api.get(`/models`);
    return response.data;
  },
  async model(payload: {
    model_name: string;
  }) {
    const { model_name } = payload;
    const response = await api.get(`/models/${model_name}`);
    return response.data;
  },
  async comparison() {
    const response = await api.get(`/comparison`);
    return response.data;
  },
  async stats() {
    const response = await api.get(`/stats`);
    return response.data;
  },
};
