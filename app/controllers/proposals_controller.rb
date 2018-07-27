class ProposalsController < ApplicationController

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
      current_user.proposal << @proposal
      redirect_to proposal_path(@proposal)
    else
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

  private

    def proposal_params
      params.require(:proposal).permit(:name, :description, :pitch, :image_url)
    end

end
