class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:edit, :update, :new, :create]
  # GET /articles
  # GET /articles.json
  def index
    @articles = Article.where(active: true)
  end

  def search 
    @articles = Article.search_by_title(params[:search_name])
  end
  # GET /articles/1
  # GET /articles/1.json
  def show
    @article.views += 1
    @article.save

    @rating = Rating.where(article_id: @article.id, user_id: current_user.id).first if current_user
    @comments = @article.comments.order("created_at DESC")
  end

  # GET /articles/new
  def new
    @article = Article.new
  end

  # GET /articles/1/edit
  def edit
  end

  # POST /articles
  # POST /articles.json
  def create
    @user = current_user
    @article = @user.articles.new(article_params)

    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render :show, status: :created, location: @article }
      else
        format.html { render :new }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /articles/1
  # PATCH/PUT /articles/1.json
  def update
    if current_user == @article.user
      respond_to do |format|
        if @article.update(article_params)
          format.html { redirect_to @article, notice: 'Article was successfully updated.' }
          format.json { render :show, status: :ok, location: @article }
        else
          format.html { render :edit }
          format.json { render json: @article.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_to do |format|
        format.html { redirect_to articles_url, notice: 'You are not an owner of this article.' }
        format.json { head :no_content }
      end
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    if current_user == @article.user
      @article.destroy
      respond_to do |format|
        format.html { redirect_to articles_url, notice: 'Article was successfully destroyed.' }
        format.json { head :no_content }
      end
    else
      respond_to do |format|
        format.html { redirect_to articles_url, notice: 'You are not an owner of this article.' }
        format.json { head :no_content }
      end
    end
  end

  def sort 
    a = params[:sort_type]
    case a
    when '1' then
      @stories = Article.order("rate ASC")
    when '2' then
      @stories = Article.order("rate DESC")
    when '3' then
      @stories = Article.order("views ASC")
    when '4' then
      @stories = Article.order("views DESC")
    when '5' then
      @stories = Article.order("rate DESC")
    when '6' then
      @stories = Article.order("title ASC")
    when '7' then
      @stories = Article.order("created_at DESC")
    else
      respond_to do |format|
          format.html
      end
    end

    respond_to do |format|
      format.js 
    end
  end

  def favourite
    favourites = Favourite.where(user_id: current_user.id, article_id: params[:article_id])
    @article = Article.find(params[:article_id])

    if current_user && params[:article_id] && !favourites.any?
      fav = Favourite.create(user_id: current_user.id, article_id: params[:article_id])
      if fav.save
        respond_to do |format|
          format.js
        end
      else
        respond_to do |format|
          format.html { redirect_to article_path(@article), notice: 'Something went wrong...' }
        end
      end
    else
      respond_to do |format|
        format.html { redirect_to article_path(@article), notice: 'Something went wrong...' }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_params
      params.require(:article).permit(:title, :description, :body, :views, :user_id, :rate, :active, images: [])
    end
end
