import api from "./api";

/**
 * Created by erivelto on 28/10/20
 */
interface Repository {
  id: string;
  title: string;
  url: string;
  techs: string[];
  likes: number;
}

class RepositoryService {

  getAll(): Promise<Repository[]> {

    return api.get('repositories');
  }

  createRepository(repository: Repository) {

    return api.post('repositories', repository);
  }

  deleteRepository(id: string) {

    return api.delete(`repositories/${id}`)
  }
}

export default new RepositoryService();
