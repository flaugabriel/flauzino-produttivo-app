import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:3030/api/v1/equipments";
const baseUrlPlaces = "http://localhost:3030/api/v1/places";
const baseUrlPlacesToPlace = "http://localhost:3030/api/v1/places/build_ancestry";

const initialState = {
  equipment: {
    id: "",
    place_id: "",
  },
  new_place: { name: "" },
  place_id: '',
  places: [],
  equipments: [],
  msg: "",
  status: 0,
};

export default class Home extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ equipments: resp.data });
    });

    axios(baseUrlPlaces).then((resp) => {
      this.setState({ places: resp.data });
    });
  }

  saveEquipmentToPlace() {
    const equipment = this.state.equipment;
    const method = equipment.id ? "put" : "post";
    const url = equipment.id ? `${baseUrl}/${equipment.id}` : baseUrl;
    axios[method](url, equipment).then((resp) => {
      console.log('resp', resp);
      if (resp.data.equipment === undefined) {
        this.setState({ msg: resp.data.messenger, status: resp.data.status });
      } else {
        this.setState({
          equipment: initialState.equipment,
          msg: resp.data.messenger,
          status: resp.data.status,
        });
      }
      this.showAlert();
    });
  }

  updateFieldEquipment(event) {
    const equipment = { ...this.state.equipment };
    equipment[event.target.name] = event.target.value;
    this.setState({ equipment });
  }

  setCurrentPlaceId(event){
    this.setState({ place_id:  event.target.value });
  }

  updateFieldPlace(event) {
    const new_place = { ...this.state.new_place };
    new_place[event.target.name] = event.target.value;
    this.setState({ new_place });
  }

  savePlaceToPlace() {
    const place = this.state.new_place;
    const url = `${baseUrlPlacesToPlace}/${this.state.place_id}`
    axios.put(url, place).then((resp) => {
      console.log('resp', resp);
      if (resp.data.place === undefined) {
        this.setState({ msg: resp.data.messenger, status: resp.data.status });
      } else {
        this.setState({
          place: initialState.place,
          msg: resp.data.messenger,
          status: resp.data.status,
        });
      }
      this.showAlert();
    });
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

  render() {
    return (
      <Main icon="home" title="Início">
        <div className="display-4">Bem Vindo!</div>
        <hr />
        <p className="mb-0">
          Sistema para realizar um inventário e catalogar equipamentos
        </p>

        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#subplace"
          data-whatever="@fat"
        >
          Adicione sub locais
        </button>
        <button
          type="button"
          class="btn btn-primary ml-2"
          data-toggle="modal"
          data-target="#exampleModal"
          data-whatever="@fat"
        >
          Vincule equipamentos em locais.
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Vincular equipamentos em locais
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Equipamentos:
                    </label>
                    <div className="form-group">
                      <select
                        className="form-select"
                        id="id"
                        name="id"
                        onChange={(e) => this.updateFieldEquipment(e)}
                        value={this.state.equipment.id}
                      >
                        <option value="" selected>
                          Selecione...
                        </option>
                        {this.state.equipments && this.state.equipments.length > 0 ? (
                          this.state.equipments.map((equipment) => (
                            <option value={equipment.id}>{equipment.name}</option>
                          ))
                        ) : (
                          <option selected disabled>
                            Não foram encontrado equipamentos
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">
                      Locais:
                    </label>
                    <div className="form-group">
                      <select
                        className="form-select"
                        id="place_id"
                        name="place_id"
                        onChange={(e) => this.updateFieldEquipment(e)}
                        value={this.state.equipment.place_id}
                      >
                        <option value="" selected>
                          Adiciona em um local
                        </option>
                        {this.state.places && this.state.places.length > 0 ? (
                          this.state.places.map((place) => (
                            <option value={place.id}>{place.name}</option>
                          ))
                        ) : (
                          <option selected disabled>
                            Não foram encontrado locais (Cadastre um novo
                            clicando)
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Fecha
                </button>
                <button
                  className="btn btn-success  ml-2"
                  onClick={(e) => this.saveEquipmentToPlace(e)}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="subplace"
          tabindex="-1"
          role="dialog"
          aria-labelledby="subplaceModal"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="subplaceModal">
                  Adicionar setores ou salas em outros locais
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <label for="recipient-name" class="col-form-label">
                    Equipamentos:
                  </label>
                  <div class="form-group">

                    <select
                      className="form-select"
                      id="id"
                      name="id"
                      onChange={(e) => this.setCurrentPlaceId(e)}
                    >
                      <option value="" selected>
                        Selecione...
                      </option>
                      {this.state.places && this.state.places.length > 0 ? (
                        this.state.places.map((place) => (
                          <option value={place.id}>{place.name}</option>
                        ))
                      ) : (
                        <option selected disabled>
                          Não foram encontrado locais (Cadastre um novo!)
                        </option>
                      )}
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">
                      Local
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={this.state.new_place.name}
                      onChange={(e) => this.updateFieldPlace(e)}
                      placeholder="Digite o nome..."
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Fechar
                </button>
                <button
                  className="btn btn-success  ml-2"
                  onClick={(e) => this.savePlaceToPlace(e)}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}
