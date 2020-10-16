class QuestionsController < ApplicationController
  # TODO: implement!!!
  skip_before_action :verify_authenticity_token

  def create
    puts '*'*10
    puts params
    puts '*'*10
    render :ok, json: {}
  end
end
