import api from "@/lib/axios/benchmark";
import { Models, ModelMetrics, ModelComparison, ModelStats } from "@/api/benchmark/models";

// must have postfix API to avoid name conflict for mutation
export default {
  async models() {
    const response = await api.post(`/`, {
      url: `/models`,
    });
    return response.data as Models;
  },
  async model(payload: {
    model_name: string;
  }) {
    const { model_name } = payload;
    const response = await api.post(`/`, {
      url: `/models/${model_name}`,
    });
    return response.data as ModelMetrics;
  },
  async comparison() {
    const response = await api.post(`/`, {
      url: `/comparison`,
    });
    return response.data as ModelComparison;
  },
  async stats() {
    const response = await api.post(`/`, {
      url: `/stats`,
    });
    return response.data as ModelStats;
  },
};
