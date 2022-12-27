import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";
import { toast } from "react-toastify";

const headerProps = {
  icon: "users",
  title: "Equipamentos",
  subtitle: "Cadastro de equipamentos: Incluir, Listar, Alterar e Excluir!",
};

const baseUrl = "http://localhost:3030/api/v1/equipments";
const baseUrlPlaces = "http://localhost:3030/api/v1/places";
const initialState = {
  equipment: {id: ''},
  code: '',
  name: "",
  mark: "",
  type_equipment: "",
  description: "",
  place_id: '',
  places: [],
  list: [],
	filterClearn: false,
  imageUpdate: null,
  msg: "",
  status: 0,
};

export default class EquipmentCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });

    axios(baseUrlPlaces).then((resp) => {
      this.setState({ places: resp.data });
    });
  }

  fetchPlaceFilter(place_id) {
    this.setState({ list: [] });
    axios(`${baseUrl}?place_filter=${place_id}`).then((resp) => {
      console.log(resp);
      this.setState({ list: resp.data });
    });
  }

	fetchNameFilter(event) {
    this.setState({ list: [] });
    axios(`${baseUrl}?name_filter=${event.target.value}`).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({  equipment: {id: ''},
    code: '',
    name: "",
    mark: "",
    type_equipment: "",
    description: "",
    place_id: null,});
  }

  save() {
    const equipment = this.state.equipment
    const formData = new FormData();
    formData.append('equipment[code]', this.state.code)
    formData.append('equipment[name]', this.state.name)
    formData.append('equipment[mark]', this.state.mark)
    if (this.state.imageUpdate) {
      formData.append('equipment[image]', this.state.imageUpdate)
    }
    formData.append('equipment[type_equipment]', this.state.type_equipment.toLowerCase())
    formData.append('equipment[description]', this.state.description)
    formData.append('equipment[place_id]', this.state.place_id === 0 ? null : this.state.place_id)

    console.log('sadf', this.state.place_id === '' ? '' : this.state.place_id);
    const method = equipment.id ? "put" : "post";
    const url = equipment.id ? `${baseUrl}/${equipment.id}` : baseUrl;
    axios[method](url, formData).then((resp) => {
      if (resp.data.equipment === undefined) {
        this.setState({ msg: resp.data.messenger, status: resp.data.status });
      } else {
        const list = this.getUpdatedList(resp.data.equipment);
        this.setState({
          equipment: initialState.equipment,
          list,
          msg: resp.data.messenger,
          status: resp.data.status,
        });
      this.clear()
      }
      this.showAlert();
    });
  }

  getUpdatedList(equipment, add = true) {
    const list = this.state.list.filter((u) => u.id !== equipment.id);
    if (add) list.unshift(equipment);
    return list;
  }

  showAlert() {
    console.log(this.state.status);
    if (this.state.status === 422) {
      toast.error(this.state.msg);
    } else {
      toast.success(this.state.msg);
      this.clear();
    }
  }

  onImageChange = event => { 
    this.setState({ imageUpdate: event.target.files[0] });
  };

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-3">
            <label>Imagem</label>
            <div className="form-group">
            <input type="file" accept="image/*" name="image" multiple={false} onChange={(e) => this.onImageChange(e)} />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Codígo</label>
              <input
                type="number"
                className="form-control"
                name="code"
                value={this.state.code}
                onChange={(e) => this.setState({code: e.target.value})}
                placeholder="Digite o codigo..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={(e) => this.setState({name: e.target.value})}
                placeholder="Digite o nome..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Marca</label>
              <input
                type="text"
                className="form-control"
                name="mark"
                value={this.state.mark}
                onChange={(e) => this.setState({mark: e.target.value})}
                placeholder="Digite uma marca..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="type_equipment">Tipo</label>
            <div className="form-group">
              <select
                className="form-select"
                id="type_equipment"
                name="type_equipment"
                onChange={(e) => this.setState({type_equipment: e.target.value})}
                value={this.state.type_equipment.toLowerCase()}
              >
                <option value="" selected>
                  Selecione um tipo de equipamento
                </option>
                <option value="ar_condicionado">Ar condicionado </option>
                <option value="cafeteira">Cafeteria</option>
                <option value="computador">Computador</option>
                <option value="monitor">Monitor</option>
                <option value="mouse">Mouse</option>
                <option value="teclado">Teclado</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="place_id">Local do equipamento</label>
            <div className="form-group">
              <select
                className="form-select"
                id="place_id"
                name="place_id"
                onChange={(e) => this.setState({place_id: e.target.value})}
                value={this.state.place_id}
              >
                <option value="0" selected>
                  Adiciona em um local
                </option>
                {this.state.places && this.state.places.length > 0 ? (
                  this.state.places.map((place) => (
                    <option value={place.id}>{place.name}</option>
                  ))
                ) : (
                  <option selected disabled>
                    Não foram encontrado locais (Cadastre um novo clicando)
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={(e) => this.setState({description: e.target.value})}
                value={this.state.description}
                placeholder="Digite uma descrição..."
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Busca por nome"
								onChange={(e) => this.fetchNameFilter(e)}
              />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="dropdown ml-2">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="/equipments#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Filtre por Local
              </a>
					
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
								<a className="dropdown-item" href="/equipments" >Limpar filtro</a>
								<hr />
                {this.state.places && this.state.places.length > 0 ? (
                  this.state.places.map((place) => (
                    <a
                      className="dropdown-item"
                      href="#filter_apply"
                      onClick={(e) => this.fetchPlaceFilter(place.id)}
                    >
                      {place.name}
                    </a>
                  ))
                ) : (
                  <option selected disabled>
                    Não foram encontrado locais (Cadastre um novo!)
                  </option>
                )}
              </div>
            </div>
            <button
              className="btn btn-primary  ml-2"
              onClick={(e) => this.save(e)}
            >
              Salvar
            </button>

            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(equipment) {
    console.log(equipment.place && equipment.place.id);
    this.setState({  
    equipment: {id: equipment.id},
    code: equipment.code,
    name: equipment.name,
    imageUpdate: equipment.image,
    mark: equipment.mark,
    type_equipment: equipment.type_equipment,
    description: equipment.description,
    place_id: equipment.place &&  ''});
  }

  remove(equipment) {
    axios.delete(`${baseUrl}/${equipment.id}`).then((resp) => {
      const list = this.getUpdatedList(equipment, false);
      this.setState({ list });
    });
    toast.success("Equipamento removido!");
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Code</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Local</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.length && this.state.list.map((equipment) => {
      return (
        <tr key={equipment.id}>
          <td>
            <figure className="figure">
              {
                equipment.image_url ?
                <img src={equipment.image_url } className="rounded mx-auto d-block" alt={equipment.name} width={100} height={100}/>
                  :
                <img src="https://cdn-icons-png.flaticon.com/512/3040/3040763.png" width={100} height={100} className="rounded mx-auto d-block" alt={equipment.name} />

              }
            </figure>
          </td>
          <td>{equipment.code}</td>
          <td>{equipment.name}</td>
          <td>{equipment.mark}</td>
          <td>{equipment.type_equipment}</td>
          <td>{equipment.description}</td>
          <td>{equipment.place?.name}</td>
          <td>
            <button
              className="btn btn-warning"
              onClick={() => this.load(equipment)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(equipment)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
