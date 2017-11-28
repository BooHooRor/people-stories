json.extract! article, :id, :title, :description, :body, :views, :user_id, :rate, :active, :created_at, :updated_at
json.url article_url(article, format: :json)
