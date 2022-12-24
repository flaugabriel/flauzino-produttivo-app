import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import { toast } from 'react-toastify';

const headerProps = {
	icon: 'users',
	title: 'Equipamentos',
	subtitle: 'Cadastro de equipamentos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3030/api/v1/equipments'
const baseUrlPlaces = 'http://localhost:3030/api/v1/places'
const initialState = {
	equipment: { code: 0, name: '', mark: '', type_equipment: '', description: '', place_id: '' },
	places: [],
	list: [],
	msg: '',
	status: 0,
}



export default class EquipmentCrud extends Component {

	state = { ...initialState }

	componentWillMount() {
		axios(baseUrl,).then(resp => {
			this.setState({ list: resp.data })
		})
				
		axios(baseUrlPlaces,).then(resp => {
			console.log(resp);
			this.setState({ places: resp.data })
		})
	}

	clear() {
		this.setState({ equipment: initialState.equipment })
	}

	save() {
		const equipment = this.state.equipment
		const method = equipment.id ? 'put' : 'post'
		const url = equipment.id ? `${baseUrl}/${equipment.id}` : baseUrl
		axios[method](url, equipment)
			.then(resp => {
				if (resp.data.equipment === undefined) {
					this.setState({msg: resp.data.messenger, status: resp.data.status})
				}else {
					const list = this.getUpdatedList(resp.data.equipment)
					this.setState(JSON.stringify({ equipment: initialState.equipment, list }))
				}
				this.showAlert()
			})
	}

	getUpdatedList(equipment, add = true) {
		const list = this.state.list.filter(u => u.id !== equipment.id)
		if (add) list.unshift(equipment)
		return list
	}

	showAlert(){
		console.log(this.state.status);
		if (this.state.status === 422) {
			toast.error(this.state.msg)
		}else{
			toast.success(this.state.msg)
			this.clear() 
		}
	}


	updateField(event) {
		const equipment = { ...this.state.equipment }
		equipment[event.target.name] = event.target.value
		this.setState({ equipment })
	}

	renderForm() {
		return (
			<div className="form">
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Codígo</label>
							<input type="number" className="form-control"
								name="code"
								value={this.state.equipment.code}
								onChange={e => this.updateField(e)}
								placeholder="Digite o codigo..." />
						</div>
					</div>

					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Nome</label>
							<input type="text" className="form-control"
								name="name"
								value={this.state.equipment.name}
								onChange={e => this.updateField(e)}
								placeholder="Digite o nome..." />
						</div>
					</div>

					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Marca</label>
							<input type="text" className="form-control"
								name="mark"
								value={this.state.equipment.mark}
								onChange={e => this.updateField(e)}
								placeholder="Digite uma marca..." />
						</div>
					</div>

					<div className="col-12 col-md-6">
						<label htmlFor="type_equipment">Tipo</label>
						<div className="form-group">
							<select 
								className="form-select" 
								id="type_equipment" name="type_equipment" onChange={e => this.updateField(e)} value={this.state.equipment.type_equipment}>
									<option value="" selected>Selecione um tipo de equipamento</option>
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
								id="place_id" name="place_id" onChange={e => this.updateField(e)} value={this.state.equipment.place_id}> 
									<option value="" selected>Adiciona em um local</option>
									{this.state.places && this.state.places.length > 0 ?
								this.state.places.map((place) =>
								<option value={place.id}>{place.title}</option>
								) : <option selected disabled>Não foram encontrado locais (Cadastre um novo clicando)</option>
							}
						</select>
						</div>
					</div>

					<div className="col-12 col-md-12">
						<div className="form-group">
							<label>Descrição</label>
							<input type="text" className="form-control"
								name="description"
								value={this.state.equipment.description}
								onChange={e => this.updateField(e)}
								placeholder="Digite uma descrição..." />
						</div>
					</div>
				</div>

				<hr />
				<div className="row">
					<div className="col-12 d-flex justify-content-end">
						<button className="btn btn-primary"
							onClick={e => this.save(e)}>
							Salvar
						</button>

						<button className="btn btn-secondary ml-2"
							onClick={e => this.clear(e)}>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		)
	}

	load(equipment) {
		this.setState({ equipment })
	}

	remove(equipment) {
		axios.delete(`${baseUrl}/${equipment.id}`).then(resp => {
			const list = this.getUpdatedList(equipment, false)
			this.setState({ list })
		})
		toast.success('Equipamento removido!')
	}

	renderTable() {
		return (
			<table className="table mt-4">
				<thead>
					<tr>
						<th>Code</th>
						<th>Nome</th>
						<th>Marca</th>
						<th>Tipo</th>
						<th>Descrição</th>
						<th>Local</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{this.renderRows()}
				</tbody>
			</table>
		)
	}

	renderRows() {
		return this.state.list.map(equipment => {
			return (
				<tr key={equipment.id}>
					<td>{equipment.code}</td>
					<td>{equipment.name}</td>
					<td>{equipment.mark}</td>
					<td>{equipment.type_equipment}</td>
					<td>{equipment.description}</td>
					<td>{equipment.place.name}</td>
					<td>
						<button className="btn btn-warning"
							onClick={() => this.load(equipment)}>
							<i className="fa fa-pencil"></i>
						</button>
						<button className="btn btn-danger ml-2"
							onClick={() => this.remove(equipment)}>
							<i className="fa fa-trash"></i>
						</button>
					</td>
				</tr>
			)
		})
	}

	render() {
		return (
			<Main {...headerProps}>
				{this.renderForm()}
				{this.renderTable()}
			</Main>
		)
	}
}