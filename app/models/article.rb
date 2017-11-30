class Article < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  
  def self.search_by_title(title)
  	names_array = title.split(' ')

  	if names_array.size == 1
  		where('title LIKE ? or description LIKE ?', "%#{names_array[0]}%", "%#{names_array[0]}%")
  	else
  		where('title LIKE ? or title LIKE ? or description LIKE ? or description LIKE ?', "%#{names_array[0]}%", "%#{names_array[1]}%", "%#{names_array[0]}%", "%#{names_array[1]}%")
  	end
  end
end
 #zalozenia: wpisuje imie lub imie i nazwisko w search i to mi znajduje w bazie danych