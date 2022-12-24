import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const baseUrl = "http://localhost:3030/api/v1/equipments";
const baseUrlPlaces = "http://localhost:3030/api/v1/places";

const initialState = {
  equipment: {
    id: "",
    place_id: "",
  },
  place: { name: "" },
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
      }
      this.showAlert();
    });
  }

	updateFieldEquipment(event) {
    const equipment = { ...this.state.equipment };
    equipment[event.target.name] = event.target.value;
    this.setState({ equipment });
  }

	updateFieldPlace(event) {
    const place = { ...this.state.place };
    place[event.target.name] = event.target.value;
    this.setState({ place });
  }

	savePlaceToPlace() {
    const equipment = this.state.equipment;
    const method = equipment.id ? "put" : "post";
    const url = equipment.id ? `${baseUrl}/${equipment.id}` : baseUrl;
    axios[method](url, equipment).then((resp) => {
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
      }
      this.showAlert();
    });
  }

  render() {
    return (
      <Main icon="home" title="Início">
        <div className="display-4">Bem Vindo!</div>
        <hr />
        <p className="mb-0">
          Sistema para realizar um inventário e catalogar todos esses
          equipamentos
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
                      value={this.state.place.id}
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
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Send message
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
                  Adicionar locais
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
                      Recipient:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">
                      Message:
                    </label>
                    <textarea class="form-control" id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}
