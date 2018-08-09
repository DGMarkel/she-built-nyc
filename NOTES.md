mostly finished with back end stuff.

mostly finished with front end stuff

less urgent:
  figure out a better way to create comment threads.  how can i reply to replies?
  this looks like a good resource: https://www.codementor.io/ruby-on-rails/tutorial/threaded-comments-polymorphic-associations


to do later:
  add filters to proposals index:
    alphabetical
    most popular
    least popular
    newest
    oldest



New Monuments to Women's History is based on NYC's initiative to build more monuments to women around the city.  My site will list proposed monuments, accept new proposals from the public, allow the public to vote on existing proposals and display other public input.

Proposal
  has many users(votes), through user_proposal?
  attributes: :name, :description, :pitch, :image_url

  if a second proposal is made for the same figure, it will count as a vote for the initial proposal instead of creating a new proposal instance

User
  has_one proposal
  can make one proposal and can only vote once.
  must live in NYC (have to figure out how to validate this through zip code)  
  User's proposal will count as User's vote by default.
  User can change vote at any time.
  can edit proposal until the monument has more than one vote
  attributes: :name, :affiliation, :borough, :zip_code, :comments

User::Admin
  can't vote
  can remove comments
  can remove users
  can edit any proposal

Comments
will build out comment feature later

Root
  Basic description
  Top 3 proposals by vote
  link to proposal index
  login to vote or add a new proposal

Proposal Index
  can be filtered by popularity?
  displays image, name, mini description of each proposal

Proposal Show
  full description of proposal, option to vote for proposal (if logged in)
end
