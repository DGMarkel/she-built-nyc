module ProposalsHelper

  def user_name_linked_or_not
    if current_user
       link_to @proposal.user.name, user_path(@proposal.user)
    else
       @proposal.user.name
    end
  end
  
end
