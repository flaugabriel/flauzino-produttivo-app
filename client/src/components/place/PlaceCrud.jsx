import React, { Component, Fragment } from "react";
import axios from "axios";
import Main from "../template/Main";
import { toast } from "react-toastify";
import TreeList from "react-treelist";
import "react-treelist/build/css/index.css";

const headerProps = {
  title: "Locais",
  subtitle: "Cadastro de locais: Incluir, Listar, Alterar e Excluir!",
};

const baseUrl = "http://localhost:3030/api/v1/places";
const initialState = {
  place: { name: "" },
  list: [],
  edit: true,
  delete: false,
  msg: "",
  status: 0,
};
const COLUMNS = [
  {
    title: "Locais",
    field: "name",
    type: "string",
    expand: true,
  },
  {
    title: "Equipamentos",
    field: "equipments",
    type: "string",
    expand: true,
  },
];

const OPTIONS = {
  minimumColWidth: 100,
  expandAll: true,
  canSelect: true,
};

export default class PlaceCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      console.log(resp);
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ place: initialState.place });
    this.setState({ edit: true, delete: false });
  }

  save() {
    const place = this.state.place;
    const method = place.id ? "put" : "post";
    const url = place.id ? `${baseUrl}/${place.id}` : baseUrl;
    axios[method](url, place).then((resp) => {
      if (resp.data.place === undefined) {
        this.setState({ msg: resp.data.messenger, status: resp.data.status });
      } else {
        const list = this.getUpdatedList(resp.data.place);
        this.setState({
          place: initialState.place,
          list,
          msg: resp.data.messenger,
        });
      }
      this.showAlert();
    });
  }

  getUpdatedList(place, add = true) {
    const list = this.state.list.filter((u) => u.id !== place.id);
    if (add) list.unshift(place);
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

  updateField(event) {
    const place = { ...this.state.place };
    place[event.target.name] = event.target.value;
    this.setState({ place });
  }

  updateFieldSelect(event) {
    const place = { ...this.state.place };
    place[event.target.name] = event.target.value;
    this.setState({ place, edit: false, delete: true });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
					<label htmlFor="id">Busque um local para edição ou remoção ?</label>
            <div className="form-group">
              <select
                className="form-select"
                id="id"
                name="id"
                onChange={(e) => this.updateFieldSelect(e)}
                value={this.state.place.id}
              >
                <option value="" selected>
                  Selecione...
                </option>
                {this.state.list && this.state.list.length > 0 ? (
                  this.state.list.map((place) => (
                    <option value={place.id}>{place.name}</option>
                  ))
                ) : (
                  <option selected disabled>
                    Não foram encontrado locais (Cadastre um novo clicando)
                  </option>
                )}
              </select>
            </div>

            <label>{!this.state.edit ? "Atualize o nome no campo abaixo" : "Nome"}</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.place.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            {this.state.delete && (
              <button
                className="btn btn-danger ml-2"
                onClick={(e) => this.remove(this.state.place)}
              >
                Remover
              </button>
            )}
            <button
              className="btn btn-success ml-2"
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

  remove(place) {
    axios.delete(`${baseUrl}/${place.id}`).then((resp) => {
			if(resp.data.status === 422){
				toast.error(resp.data.messenger)
			}else{
	      const list = this.getUpdatedList(place, true);
  	    this.setState({ list });
			toast.success("Local removido!");
			}
    });
    this.setState({ edit: true, delete: false });
  }

  renderTable() {
    return (
      <div>
        <br />
        <TreeList
          data={this.state.list}
          columns={COLUMNS}
          options={OPTIONS}
          id={"id"}
          parentId={"ancestry"}
        >
          {" "}
        </TreeList>
      </div>
    );
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
