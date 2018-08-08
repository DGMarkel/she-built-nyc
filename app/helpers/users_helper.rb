module UsersHelper

  def new_user_warning
    if flash[:warning]
      flash[:warning]
    end
  end

  def proposal_link
    if current_user.admin
      if @user.proposal_id
        link_to "#{@user.name}'s proposal", proposal_path(@user.proposal_id)
      else
        ""
      end
    elsif @user.proposal_id
      link_to "My Proposal", proposal_path(@user.proposal_id)
    else
      link_to "Submit a Proposal", new_proposal_path
    end
  end

end
