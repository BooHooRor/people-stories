# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Article.destroy_all

100.times do 
	a = Article.create(title: Faker::Pokemon.name, description: Faker::Friends.quote, body: Faker::Lorem.sentence, user_id: 2, active: true)
end

puts "seeds done"