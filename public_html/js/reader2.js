(function() {
	
	// ---- MODELS & COLLECTIONS ----

	var Feed = Backbone.Model.extend({
		defaults : {
			image : "icon-blank",
			title : "Unknown",
			count : 0
		}
	});

	var Feeds = Backbone.Collection.extend({
		model : Feed,
		url : "feeds"
	});

	var Item = Backbone.Model.extend({
		defaults : {
			starred : false,
			title : "Unknown",
			feed : null,
			snippet : "",
			author : "",
			publishDate : "",
			content : "",
			tags : null
		}
	});

	var Items = Backbone.Collection.extend({
		feedId : null,
		model : Item,
		url : function() {
			return "items/" + this.feedId;
		}
	});
	
	// ---- VIEWS ----

	var FeedView = Backbone.View.extend({
		tagName : "li",
		template : _.template($("#feed-template").html()),
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			if(this.model.get("count") > 0) {
				this.$el.addClass("unread");
			}
			return this;
		}
	});

	var FeedListView = Backbone.View.extend({
		el : $(".feeds"),
		template : _.template($("#loading-template").html()),
		initialize : function() {
			this.collection.on("reset", this.onReset, this);
		},
		render : function() {
			this.$el.html(this.template({}));
			return this;
		},
		onReset : function() {
			this.$el.html("");
			this.collection.each(function(feed) {
				this.$el.append(new FeedView({
					model : feed
				}).render().el);
			}, this);
		}
	});

	var ItemView = Backbone.View.extend({
		tagName : "li",
		template : _.template($("#feed-item-template").html()),
		initialize : function() {
			this.model.on("change:starred",this.onStarred,this);
		},
		events : {
			"click" : "onItemClick",
			"click .collapse" : "onItemCollapse",
			"click .next-item" : "onNextItem",
			"click .star" : "onStar",
			"click .unstar" : "onUnstar"
		},
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		onItemClick : function() {
			this.template = _.template($("#full-feed-item-template").html());
			this.render();
		},
		onItemCollapse : function() {
			this.template = _.template($("#feed-item-template").html());
			this.render();
			return false; // prevent navigation
		},
		onNextItem : function() {
			this.template = _.template($("#feed-item-template").html());
			this.render();
			return false; // prevent navigation
		},
		onStar : function() {
			this.model.set("starred", true);
			return false;
		},
		onUnstar : function() {
			this.model.set("starred", false);
			return false;
		},
		onStarred : function() {
			this.$el.find(".item-star a").toggleClass("unstar").toggleClass("star");
			this.$el.find(".item-star i").toggleClass("icon-star-empty").toggleClass("icon-star");
		}
	});

	var ItemListView = Backbone.View.extend({
		el : $(".items"),
		template : _.template($("#loading-template").html()),
		initialize : function() {
			this.collection.on("reset", this.onReset, this);
		},
		render : function() {
			this.$el.html(this.template({}));
			return this;
		},
		onReset : function() {
			this.$el.html("");
			this.collection.each(function(item) {
				this.$el.append(new ItemView({
					model : item
				}).render().el);
			}, this);
		}
	});
	
	// ---- ROUTERS ----

	var FeedRouter = Backbone.Router.extend({
		currentView : null,
		routes : {
			"" : "showHome",
			"feeds/:id" : "showFeed"
		},
		showFeed : function(id) {
			var items = new Items;
			items.feedId = id;

			if (this.currentView) {
				this.currentView.$el.html("");
			}

			$("#items").removeClass("hidden");
			$("#feeds").addClass("hidden");
			this.currentView = new ItemListView({
				collection : items
			});
			this.currentView.render();

			items.fetch();
		},
		showHome : function() {

			var feeds = new Feeds;

			if (this.currentView) {
				this.currentView.$el.html("");
			}

			$("#items").addClass("hidden");
			$("#feeds").removeClass("hidden");
			this.currentView = new FeedListView({
				collection : feeds
			});
			this.currentView.render();

			feeds.fetch();
		}
	});
	
	// ---- INITIALISATION ----

	$(function() {

		new FeedRouter;

		Backbone.history.start();

	});

})();