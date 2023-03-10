import axios, { AxiosResponse } from 'axios';

const apiHeader = (): Record<string, string> => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
};

class Service {
  async getRequest(api: string): Promise<any> {
    const response: AxiosResponse = await axios.get(api, {
      headers: apiHeader()
    });
    try {
      return response.data;
    } catch (error) {
      return error;
    }
  };
}

const ApiService = new Service();

export default ApiService;