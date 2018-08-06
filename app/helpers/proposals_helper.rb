module ProposalsHelper

  def user_name_linked_or_not
    if logged_in?
       link_to @proposal.user.name, user_path(@proposal.user)
    else
       @proposal.user.name
    end
  end

end
