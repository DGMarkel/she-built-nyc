module ProposalsHelper

  def user_name_linked_or_not(instance)
    if logged_in?
       link_to instance.user.name, user_path(instance.user)
    else
       @proposal.user.name
    end
  end

end
