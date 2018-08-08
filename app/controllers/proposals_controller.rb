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
      if @proposal.errors[:description].any?
        flash[:description_warning] = "Description cannot exceed 75 characters"
      end
      flash[:warning] = "All fields marked with an asterisk must be filled in"
      render new_proposal_path
    end
  end

  def edit
    @proposal = Proposal.find_by(id: params[:id])
    if !logged_in? || (@proposal.user != current_user && !current_user.admin)
      redirect_to proposal_path(@proposal)
    end
  end

  def update
    @proposal = Proposal.find_by(id: params[:id])
    if @proposal.update(proposal_params)
      redirect_to proposal_path(@proposal)
    else
      if @proposal.errors[:description].any?
        if @proposal.description.empty?
          flash[:description_warning] = "This section must be filled out to proceed"
        else
          flash[:description_warning] = "Description cannot exceed 75 characters"
        end
      end
      if @proposal.errors[:name].any?
        if @proposal.name.empty?
        flash[:name_warning] = "Your proposal needs a name!"
        else
        flash[:name_warning] = "A proposal with that name already exists"
        end
      end
      if @proposal.errors[:pitch].any?
        flash[:pitch_warning] = "This section must be filled out to proceed"
      end
      redirect_to edit_proposal_path(@proposal)
    end
  end

  def destroy
    if current_user.admin
      @proposal = Proposal.find_by(id: params[:id])
      @rankings = Ranking.where(proposal_id: @proposal.id)
      @rankings.each {|ranking| ranking.destroy}
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
