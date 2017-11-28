class AddDefaultToArticles < ActiveRecord::Migration[5.1]
  def change
  	change_column_default(
  		:articles,
  		:active,
  		false,
		)
		change_column_default(
  		:articles,
  		:rate,
  		0,
		)
		change_column_default(
  		:articles,
  		:views,
  		0,
		)
  end
end
