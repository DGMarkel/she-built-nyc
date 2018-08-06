class Reply < ApplicationRecord
  belongs_to :comment
  belongs_to :user
  validates :contents, presence: true
end
