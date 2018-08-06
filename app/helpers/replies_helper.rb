module RepliesHelper

  def user_name_linked_or_not
    if logged_in?
       link_to @found_user.name, user_path(@found_user)
    else
       @found_user.name
    end
  end
  
end
