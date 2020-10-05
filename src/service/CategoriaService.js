import axios from "axios";

export default class CategoriaService {
  url = "http://localhost:8080/api/v1/categoria/";

  getAll() {
    return axios.get(this.url + "all");
  }

  save(categoria){
      return axios.post(this.url + "create", categoria);
  }

  edit(categoria){
      return axios.put(this.url + "edit", categoria);
  }

  delete(id_Categoria){
      return axios.delete(this.url + "delete/{id_Categoria}?id_Categoria="+id_Categoria);
  }
}
