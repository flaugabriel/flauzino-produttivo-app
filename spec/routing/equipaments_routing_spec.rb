require "rails_helper"

RSpec.describe EquipamentsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/equipaments").to route_to("equipaments#index")
    end

    it "routes to #show" do
      expect(get: "/equipaments/1").to route_to("equipaments#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/equipaments").to route_to("equipaments#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/equipaments/1").to route_to("equipaments#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/equipaments/1").to route_to("equipaments#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/equipaments/1").to route_to("equipaments#destroy", id: "1")
    end
  end
end
