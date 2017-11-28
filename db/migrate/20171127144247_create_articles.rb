class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :description
      t.text :body
      t.integer :views
      t.references :user, foreign_key: true
      t.integer :rate
      t.boolean :active

      t.timestamps
    end
  end
end
