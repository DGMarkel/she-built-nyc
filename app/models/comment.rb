class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :proposal

  #def oldest_first
  #end

  #def newest_first
  #end 
end
