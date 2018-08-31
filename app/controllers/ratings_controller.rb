class RatingsController < ApplicationController
  def update
  	@article = Article.find(params[:article])
  	@rating = Rating.where(article_id: params[:article], user_id: current_user.id).first
  	
  	if @rating
  		if @rating.update_attributes(score: params[:score])
  			respond_to do |format|
  				format.js
  			end
  		end
  	else
  		@rating = Rating.create!(article_id: params[:article], user_id: current_user.id, score: params[:score])
  		respond_to do |format|
  			format.js
  		end
  	end
  end
end