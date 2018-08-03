module UsersHelper

  def proposal_link
    if @user.proposal_id
      link_to "My Proposal", proposal_path(@user.proposal_id)
    else
      link_to "Submit a Proposal", new_proposal_path 
    end
  end

end
