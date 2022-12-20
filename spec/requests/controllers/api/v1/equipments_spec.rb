require 'rails_helper'

RSpec.describe "/api/v1/equipaments", type: :request do
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  let(:valid_headers) {
    {}
  }

  describe "GET /api/v1/equipaments" do
    it "renders a successful response" do
      Equipament.create! valid_attributes
      get equipaments_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      equipament = Equipament.create! valid_attributes
      get equipament_url(equipament), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /api/v1/equipaments" do
    context "with valid parameters" do
      it "creates a new Equipament" do
        expect {
          post equipaments_url,
               params: { equipament: valid_attributes }, headers: valid_headers, as: :json
        }.to change(Equipament, :count).by(1)
      end

      it "renders a JSON response with the new equipament" do
        post equipaments_url,
             params: { equipament: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Equipament" do
        expect {
          post equipaments_url,
               params: { equipament: invalid_attributes }, as: :json
        }.to change(Equipament, :count).by(0)
      end

      it "renders a JSON response with errors for the new equipament" do
        post equipaments_url,
             params: { equipament: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "PATCH /api/v1/equipaments " do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested equipament" do
        equipament = Equipament.create! valid_attributes
        patch equipament_url(equipament),
              params: { equipament: new_attributes }, headers: valid_headers, as: :json
        equipament.reload
        skip("Add assertions for updated state")
      end

      it "renders a JSON response with the equipament" do
        equipament = Equipament.create! valid_attributes
        patch equipament_url(equipament),
              params: { equipament: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the equipament" do
        equipament = Equipament.create! valid_attributes
        patch equipament_url(equipament),
              params: { equipament: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /api/v1/equipament/:id" do
    it "destroys the requested equipament" do
      equipament = Equipament.create! valid_attributes
      expect {
        delete equipament_url(equipament), headers: valid_headers, as: :json
      }.to change(Equipament, :count).by(-1)
    end
  end
end
