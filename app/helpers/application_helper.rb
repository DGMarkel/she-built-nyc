module ApplicationHelper

  def linked_or_not(instance)
    if logged_in?
       link_to instance.name, user_path(instance)
    else
       instance.name
    end
  end
end
