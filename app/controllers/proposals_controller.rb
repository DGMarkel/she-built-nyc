class ProposalsController < ApplicationController
  before_action :site_security, only: [:new, :create, :destroy]

  def index
    @proposals = Proposal.all
  end

  def show
    @proposal = Proposal.find_by(id: params[:id])
  end

  def new
    @proposal = Proposal.new
  end

  def create
    @proposal = Proposal.new(proposal_params)
    if @proposal.save
      current_user.update(proposal_id: @proposal.id)
      @proposal.update(user_id: current_user.id)
      @proposal.rankings.create(user_id: current_user.id, ranking: 5)
      redirect_to proposal_path(@proposal)
    else
      flash[:proposal_warning] = "All fields marked with an asterisk must be filled in."
      render new_proposal_path
    end
  end

  def edit
    @proposal = Proposal.find_by(id: params[:id])
  end

  def update
    @proposal = Proposal.find_by(id: params[:id])
    @proposal.update(proposal_params)
    redirect_to proposal_path(@proposal)
  end

  def destroy
    if current_user.admin
      @proposal = Proposal.find_by(id: params[:id])
      @proposal.destroy
      redirect_to proposals_path
    else
      render proposal_path(@proposal)
    end
  end

  private

    def proposal_params
      params.require(:proposal).permit(:name, :description, :pitch, :image_url)
    end

end
