class AddImagesToArticles < ActiveRecord::Migration[5.1]
  def change
    add_column :articles, :images, :string
  end
end
