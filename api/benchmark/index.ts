import api from "@/lib/axios/benchmark";
import { Models, ModelMetrics, ModelComparison, ModelStats } from "@/api/benchmark/models";

// must have postfix API to avoid name conflict for mutation
export default {
  async models() {
    const response = await api.post(`/`, {
      url: `/api/v1/models`,
    });
    return response.data as Models;
  },
  // SAK = Solana Agent Kit
  async sakModels() {
    const response = await api.post(`/`, {
      url: `/api/v1/models/solana-agent-kit`,
    });
    return response.data as Models;
  },
};
